import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  VStack,
  Input,
  Button,
  Text,
  Flex,
  Avatar,
  Icon,
} from "@chakra-ui/react";
import { UserContext } from "../../../../../contexts/UserContext";
import providerServices from "../../../../../services/providerServices";
import userServices from "../../../../../services/userServices";
import useCustomToast from "../../../../../hooks/useCustomToast";
import { FaPaperPlane } from "react-icons/fa";

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

const Messaging = ({ selectedRoom }) => {
  const { showToast } = useCustomToast();

  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [newMessage]);

  useEffect(() => {
    fetchData();
    return () => {};
  }, [selectedRoom]);

  const fetchData = async () => {
    let payload;
    if (user.isMainUser) {
      payload = {
        providerID: selectedRoom.senderID,
      };
    } else {
      payload = {
        userID: selectedRoom.senderID,
      };
    }
    try {
      let res;
      if (user.isMainUser) {
        res = await userServices.getDetailedMessages(payload);
      } else {
        res = await providerServices.getDetailedMessages(payload);
      }
      setMessages(res.data);
    } catch (error) {
      showToast(error, { status: "error" });
    }
  };

  const sendMessage = async (e, message) => {
    e.preventDefault();
    let payload;
    if (newMessage.trim() !== "") {
      if (user.isMainUser) {
        payload = {
          msg: newMessage,
          userID: user.id,
          providerID: message.providerID,
          senderID: user.id,
          type: 2,
        };
      } else {
        payload = {
          msg: newMessage,
          userID: message.userID,
          providerID: user.id,
          senderID: user.id,
          type: 2,
        };
      }
      try {
        let res;
        if (user.isMainUser) {
          res = await userServices.sendMessage(payload);
        } else {
          res = await providerServices.sendMessage(payload);
        }
        setNewMessage("");
        await fetchData();
        console.log("res from message", res.data);
      } catch (error) {
        showToast(error, { status: "error" });
      }
    }
  };

  const renderMessage = (message, index) => {
    if (message.type === 1 && message.providerID !== user.id) {
      return (
        <Flex
          key={index}
          justifyContent={
            message.senderID === user.id ? "flex-end" : "flex-start"
          }
        >
          <Box
            maxW="70%"
            p={3}
            m={3}
            borderRadius="lg"
            bg={message.senderID === user.id ? "primary.600" : "gray.200"}
            color={message.senderID === user.id ? "white" : "black"}
          >
            <Box borderRadius="lg" p="4" m="4">
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
    } else if (message.type === 1) {
      return (
        <Flex
          key={index}
          justifyContent={
            message.senderID === user.id ? "flex-end" : "flex-start"
          }
        >
          <Box
            maxW="70%"
            p={3}
            m={3}
            borderRadius="lg"
            bg={message.senderID === user.id ? "primary.600" : "gray.200"}
            color={message.senderID === user.id ? "white" : "black"}
          >
            <Box borderRadius="lg" p="4" m="4">
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
              <Button>approve request</Button>
              <Button>cancel request</Button>
            </Box>
          </Box>
        </Flex>
      );
    } else {
      return (
        <Flex
          key={index}
          justifyContent={
            message.senderID === user.id ? "flex-end" : "flex-start"
          }
        >
          <Box
            maxW="70%"
            p={3}
            m={3}
            borderRadius="lg"
            bg={message.senderID === user.id ? "primary.600" : "gray.200"}
            color={message.senderID === user.id ? "white" : "black"}
          >
            <Text>{message.msg}</Text>
          </Box>
        </Flex>
      );
    }
  };

  return selectedRoom ? (
    <Box p={4}>
      <VStack spacing={4} mb={4} align="stretch">
        <Box h="calc(100vh - 200px)" overflowY="scroll">
          {messages.map((message, index) => renderMessage(message, index))}
          <div ref={messagesEndRef} />
        </Box>
        <form onSubmit={(e) => sendMessage(e, messages[0])}>
          <Flex>
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              flex="1"
              mr={2}
              borderRadius="full"
              p={2}
            />
            <Button
              px={0}
              type="submit"
              colorScheme="primary.500"
              variant="ghost"
              borderRadius="full"
            >
              <Icon as={FaPaperPlane} />
            </Button>
          </Flex>
        </form>
      </VStack>
    </Box>
  ) : (
    <Box mt={9} textAlign="center" fontSize="xl">
      Choose a room to start messaging
    </Box>
  );
};

export default Messaging;
