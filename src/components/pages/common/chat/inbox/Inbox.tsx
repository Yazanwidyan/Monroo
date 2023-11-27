import { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Text,
  Stack,
  Flex,
  Avatar,
  VStack,
  Container,
  Input,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import userServices from "../../../../../services/userServices";
import { UserContext } from "../../../../../contexts/UserContext";
import providerServices from "../../../../../services/providerServices";
import useCustomToast from "../../../../../hooks/useCustomToast";
import Messaging from "../messaging/Messaging";

const InboxItem = ({ name, onClick, profileImg }) => {
  return (
    <Flex
      onClick={onClick}
      align="center"
      p={4}
      borderBottom="1px solid #E2E8F0"
    >
      <Avatar src={profileImg} size="md" />
      <Box ml={4}>
        <Text fontWeight="bold">{name}</Text>
      </Box>
    </Flex>
  );
};

const Inbox = () => {
  const [rooms, setRooms] = useState([]);
  const { user } = useContext(UserContext);
  const { showToast } = useCustomToast();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
  };

  const filteredRooms = rooms.filter((room) =>
    room.senderName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  const fetchData = async () => {
    try {
      let res;
      if (user.isMainUser) {
        res = await userServices.getUserMessages();
      } else {
        res = await providerServices.getUserMessages();
      }
      setRooms(res.data);
    } catch (error) {
      showToast(error, { status: "error" });
    }
  };

  return (
    <Container maxW="8xl" style={{ display: "flex" }}>
      <Box flex={2}>
        <Box w="100%" maxW="600px" mx="auto" mt={8}>
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search rooms"
            mb={4}
          />
          <VStack spacing={4} w="100%" align="stretch">
            {filteredRooms.map((room) => (
              <Box
                key={room.messageID}
                onClick={() => handleRoomClick(room)}
                cursor="pointer"
                w="100%"
                p={4}
                borderWidth="1px"
                borderRadius="md"
                display="flex"
                alignItems="center"
                bg={selectedRoom === room ? "gray.100" : "inherit"}
                _hover={{ bg: "gray.100" }}
              >
                <Avatar src={room.profileImg} />
                <Text ml={3}>{room.senderName}</Text>
              </Box>
            ))}
          </VStack>
        </Box>
      </Box>
      <Box flex={6}>
        <Messaging selectedRoom={selectedRoom} />
      </Box>
    </Container>
  );
};

export default Inbox;
