import { useContext, useEffect, useState } from "react";
import { Box, Button, Text, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import userServices from "../../../../../services/userServices";
import { useSnackBar } from "../../../../../contexts/SnackbarContext";
import { UserContext } from "../../../../../contexts/UserContext";
import providerServices from "../../../../../services/providerServices";

const Inbox = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const { openSnackBar } = useSnackBar();
  const { user } = useContext(UserContext);

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
      openSnackBar(error, "error");
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
