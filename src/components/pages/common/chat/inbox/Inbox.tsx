import { useContext, useEffect, useState } from "react";
import { Box, Button, Text, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import userServices from "../../../../../services/userServices";
import { UserContext } from "../../../../../contexts/UserContext";
import providerServices from "../../../../../services/providerServices";
import useCustomToast from "../../../../../hooks/useCustomToast";

const Inbox = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { showToast } = useCustomToast();

  const handleRoomClick = (room) => {
    localStorage.setItem("userIDMessage", room.senderID);
    navigate(`/inbox/messaging/${room.messageID}`);
  };

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
      console.log("res from messages inbox", res.data);
    } catch (error) {
      showToast(error, { status: "error" });
    }
  };

  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Inbox
      </Text>
      <Stack spacing={4}>
        {rooms.map((room) => (
          <Button
            key={room.messageID}
            variant="outline"
            onClick={() => handleRoomClick(room)}
          >
            {room.senderName}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default Inbox;
