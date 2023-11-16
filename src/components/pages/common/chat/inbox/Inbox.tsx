import { useEffect, useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
// import firebase from "firebase/app";
// import "firebase/firestore"; // Import Firestore (or Realtime Database) from firebase/app

const Inbox = () => {
  const [rooms, setRooms] = useState([]);

  const handleRoomClick = (id) => {
    console.log(id);
  };

  useEffect(() => {
    // const unsubscribe = firebase
    //   .firestore()
    //   .collection("rooms")
    //   .onSnapshot((snapshot) => {
    //     const roomsData = snapshot.docs.map((doc) => ({
    //       id: doc.id,
    //       ...doc.data(),
    //     }));
    //     setRooms(roomsData);
    //   });
    // return () => unsubscribe();
  }, []);

  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Inbox
      </Text>
      {rooms.map((room) => (
        <Button
          key={room.id}
          variant="outline"
          onClick={() => handleRoomClick(room.id)}
        >
          {room.name}
        </Button>
      ))}
    </Box>
  );
};

export default Inbox;
