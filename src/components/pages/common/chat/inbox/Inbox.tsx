import { useEffect, useState } from "react";
import { Box, Button, Text, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Inbox = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  const handleRoomClick = (id) => {
    navigate(`/inbox/messaging/${id}`);
  };

  useEffect(() => {
    // Simulated rooms data
    const simulatedRooms = [
      { id: "1", name: "Room 1" },
      { id: "2", name: "Room 2" },
      { id: "3", name: "Room 3" },
    ];

    setRooms(simulatedRooms);
  }, []);

  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Inbox
      </Text>
      <Stack spacing={4}>
        {rooms.map((room) => (
          <Button
            key={room.id}
            variant="outline"
            onClick={() => handleRoomClick(room.id)}
          >
            {room.name}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default Inbox;
