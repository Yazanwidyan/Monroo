import React, { useState } from "react";
import { useParams } from "react-router-dom";
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

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([
        ...messages,
        {
          text: newMessage,
          senderId: "user",
          type: "detail",
          details: {
            title: "hello",
            description: "desc",
          },
        },
      ]);
      setNewMessage("");
    }
  };

  const renderMessage = (message, index) => {
    if (message.type === "text") {
      return (
        <Flex
          key={index}
          justifyContent={
            message.senderId === "user" ? "flex-end" : "flex-start"
          }
        >
          <Box
            maxW="70%"
            p={3}
            borderRadius="lg"
            bg={message.senderId === "user" ? "blue.200" : "gray.200"}
            color={message.senderId === "user" ? "white" : "black"}
          >
            <Text>{message.text}</Text>
          </Box>
        </Flex>
      );
    } else if (message.type === "detail") {
      // Render a card with details
      return (
        <Flex
          key={index}
          justifyContent={
            message.senderId === "user" ? "flex-end" : "flex-start"
          }
        >
          <Box
            maxW="70%"
            p={3}
            borderRadius="lg"
            bg={message.senderId === "user" ? "blue.200" : "gray.200"}
            color={message.senderId === "user" ? "white" : "black"}
          >
            {/* Example of a card with details */}
            <Box borderWidth="1px" p={3}>
              <Heading as="h4" size="sm" mb={2}>
                {message.details.title}
              </Heading>
              <Text>{message.details.description}</Text>
              {/* Add more details here */}
            </Box>
          </Box>
        </Flex>
      );
    }
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
        </Box>
        <Flex>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            flex="1"
            mr={2}
          />
          <Button colorScheme="blue" onClick={sendMessage}>
            Send
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
};

export default Messaging;
