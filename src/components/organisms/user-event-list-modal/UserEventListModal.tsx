import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  Text,
  Box,
  Divider,
  HStack,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import userServices from "../../../services/userServices";
import useCustomToast from "../../../hooks/useCustomToast";

const EventCard = ({ event, requestPrivateEvent }) => {
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      shadow="md"
      bg="white"
      width="100%"
    >
      <VStack spacing={3} align="start">
        <Text fontSize="xl" fontWeight="bold" color="primary">
          {event.title}
        </Text>
        <Text fontSize="md" color="gray.600">
          {event.desc}
        </Text>
        <Divider />
        <HStack spacing={6} justify="space-between" width="100%">
          <Text>
            <strong>Average Cost:</strong> ${event.averageCost}
          </Text>

          <Text>
            <strong>Country:</strong> {event.country}
          </Text>
        </HStack>
        <HStack spacing={6} justify="space-between" width="100%">
          <Text>
            <strong>Start Date:</strong> {formatTimestamp(event.eventDate)}
          </Text>
          <Text>
            <strong>End Date:</strong> {formatTimestamp(event.eventEndDate)}
          </Text>
        </HStack>
        <HStack spacing={6} justify="space-between" width="100%">
          <Text>
            <strong>Languages:</strong> {event.languages}
          </Text>
          <Text>
            <strong>Location:</strong> {event.location}
          </Text>
        </HStack>
        <HStack spacing={6} justify="space-between" width="100%">
          <Text>
            <strong>Created Date:</strong> {formatTimestamp(event.createdDate)}
          </Text>
          <Text>
            <strong>Duration:</strong> {event.duration} hrs
          </Text>
        </HStack>
        <HStack justifyContent={"flex-end"} w={"100%"}>
          <Button
            variant={"outline"}
            colorScheme="primary"
            size="sm"
            mt={2}
            onClick={() => requestPrivateEvent(event)}
          >
            Request Event
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

const UserEventListModal = ({ isOpen, onClose, events, providerID }) => {
  const { showToast } = useCustomToast();

  const requestPrivateEvent = async (event) => {
    const payload = {
      providerID: providerID,
      eventID: event.id,
    };
    try {
      const res = await userServices.requestPrivateEvent(payload);
      console.log(res);

      onClose();
      showToast("Event requested successfully", {
        title: "",
        status: "success",
      });
    } catch (error) {
      showToast(error.message || "Failed to request event", {
        status: "error",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">User Event List</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid templateColumns="repeat(auto-fill, minmax(350px, 1fr))" gap={6}>
            {events.map((event, index) => (
              <GridItem key={index}>
                <EventCard
                  event={event}
                  requestPrivateEvent={requestPrivateEvent}
                />
              </GridItem>
            ))}
          </Grid>
        </ModalBody>
        <ModalFooter justifyContent="center">
          {/* <Button colorScheme="primary" onClick={onClose}>
            Close
          </Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserEventListModal;
