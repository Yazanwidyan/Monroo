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
      });

      setNewMessage("");
    }
  };

  const renderMessage = (message, index) => {
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
    //  else if (message.type === "detail") {
    //   // Render a card with details
    //   return (
    //     <Flex
    //       key={index}
    //       justifyContent={
    //         message.senderId === "user" ? "flex-end" : "flex-start"
    //       }
    //     >
    //       <Box
    //         maxW="70%"
    //         p={3}
    //         borderRadius="lg"
    //         bg={message.senderId === "user" ? "primary.500" : "gray.200"}
    //         color={message.senderId === "user" ? "white" : "black"}
    //       >
    //         {/* Example of a card with details */}
    //         <Box borderWidth="1px" p={3}>
    //           <Heading as="h4" size="sm" mb={2}>
    //             {message.details.title}
    //           </Heading>
    //           <Text>{message.details.description}</Text>
    //           {/* Add more details here */}
    //         </Box>
    //       </Box>
    //     </Flex>
    //   );
    // }
    return null;
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
