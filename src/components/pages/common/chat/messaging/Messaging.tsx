import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../../../../firebase-config";
import {
  Box,
  Heading,
  VStack,
  Input,
  Button,
  Text,
  Flex,
} from "@chakra-ui/react";

const getStatusText = (status) => {
  switch (status) {
    case 0:
      return "Pending";
    case 1:
      return "Booked";
    case 2:
      return "Done";
    case 3:
      return "Purchased";
    default:
      return "Unknown";
  }
};

const Messaging = () => {
  const { roomid } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null); // Ref to the end of messages container

  const messagesRef = collection(db, "messages");

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", roomid),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      console.log(messages);
      setMessages(messages);
    });

    return () => unsuscribe();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (newMessage.trim() !== "") {
      await addDoc(messagesRef, {
        text: newMessage,
        user: "provider",
        userId: 2,
        createdAt: serverTimestamp(),
        room: roomid,
        type: "normal",
        eventObj: {
          title: "Guitar Lessons",
          desc: "Learn to play the guitar with expert instructors!",
          createdDate: "2023-11-19",
          eventDate: "2023-12-05",
          userID: "user123",
          providerID: "provider456",
          catID: "music123",
          subCatID: "guitar789",
          duration: "1 hour/session",
          averageCost: "$50/session",
          country: "USA",
          dealCost: "$40/session",
          status: 1,
        },
      });

      setNewMessage("");
    }
  };

  const renderMessage = (message, index) => {
    if (message.type === "requestEvent") {
      return (
        <Flex
          key={index}
          justifyContent={message.userId === 2 ? "flex-end" : "flex-start"}
        >
          <Box
            maxW="70%"
            p={3}
            m={3}
            borderRadius="lg"
            bg={message.userId === 2 ? "primary.500" : "gray.200"}
            color={message.userId === 2 ? "white" : "black"}
          >
            <Box borderWidth="1px" borderRadius="lg" p="4" m="4">
              <Text fontSize="xl" fontWeight="bold">
                {message.eventObj.title}
              </Text>
              <Text fontSize="md" mt="2">
                {message.eventObj.desc}
              </Text>
              <Text fontSize="sm" mt="2">
                Created Date: {message.eventObj.createdDate}
              </Text>
              <Text fontSize="sm">
                Event Date: {message.eventObj.eventDate}
              </Text>
              <Text fontSize="sm">User ID: {message.eventObj.userID}</Text>
              <Text fontSize="sm" mt="2">
                Status: {getStatusText(message.eventObj.status)}
              </Text>
            </Box>
          </Box>
        </Flex>
      );
    } else if (message.type === "approveEvent") {
      return (
        <Flex
          key={index}
          justifyContent={message.userId === 2 ? "flex-end" : "flex-start"}
        >
          <Box
            maxW="70%"
            p={3}
            m={3}
            borderRadius="lg"
            bg={message.userId === 2 ? "primary.500" : "gray.200"}
            color={message.userId === 2 ? "white" : "black"}
          >
            <Box borderWidth="1px" borderRadius="lg" p="4" m="4">
              <Text fontSize="xl" fontWeight="bold">
                {message.eventObj.title}
              </Text>
              <Text fontSize="md" mt="2">
                {message.eventObj.desc}
              </Text>
              <Text fontSize="sm" mt="2">
                Created Date: {message.eventObj.createdDate}
              </Text>
              <Text fontSize="sm">
                Event Date: {message.eventObj.eventDate}
              </Text>
              <Text fontSize="sm">User ID: {message.eventObj.userID}</Text>
              <Text fontSize="sm" mt="2">
                Status: {getStatusText(message.eventObj.status)}
              </Text>
              <Button>cancel request</Button>
            </Box>
          </Box>
        </Flex>
      );
    } else {
      return (
        <Flex
          key={index}
          justifyContent={message.userId === 2 ? "flex-end" : "flex-start"}
        >
          <Box
            maxW="70%"
            p={3}
            m={3}
            borderRadius="lg"
            bg={message.userId === 2 ? "primary.500" : "gray.200"}
            color={message.userId === 2 ? "white" : "black"}
          >
            <Text>{message.text}</Text>
          </Box>
        </Flex>
      );
    }
  };

  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>
        Messaging - Room ID: {roomid}
      </Heading>
      <VStack spacing={4} mb={4} align="stretch">
        <Box h="400px" overflowY="scroll">
          {messages.map((message, index) => renderMessage(message, index))}
          <div ref={messagesEndRef} />
        </Box>
        <form onSubmit={sendMessage}>
          <Flex>
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              flex="1"
              mr={2}
            />
            <Button colorScheme="primary" type="submit">
              Send
            </Button>
          </Flex>
        </form>
      </VStack>
    </Box>
  );
};

export default Messaging;
