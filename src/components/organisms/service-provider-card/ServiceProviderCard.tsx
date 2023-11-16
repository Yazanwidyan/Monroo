import {
  Box,
  Image,
  Badge,
  Text,
  Heading,
  VStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { useState } from "react";
import UserEventListModal from "../user-event-list-modal/UserEventListModal";

const ServiceProviderCard = ({
  image,
  title,
  name,
  description,
  experience,
  nationality,
  gender,
}) => {
  const handleRequestPrivateEvent = () => {
    console.log(`Requesting private event for ${name}`);
    openModal();
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userEvents, setUserEvents] = useState([
    { title: "test event", date: "11/11/2023", description: "lorem ipsum" },
  ]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box
      maxW="md"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
    >
      <Image src={image} alt={name} />

      <Box p="4">
        <Badge borderRadius="full" px="2" colorScheme="teal" mb="2">
          {title}
        </Badge>

        <Heading size="md" fontWeight="semibold" mb="2">
          {name}
        </Heading>

        <Text color="gray.600" mb="4">
          {description}
        </Text>

        <VStack spacing="1" align="flex-start" mb="4">
          <Text>
            <strong>Experience:</strong> {experience}
          </Text>
          <Text>
            <strong>Nationality:</strong> {nationality}
          </Text>
          <Text>
            <strong>Gender:</strong> {gender}
          </Text>
        </VStack>

        <Button colorScheme="teal" onClick={handleRequestPrivateEvent}>
          Request Private Event
        </Button>

        <UserEventListModal
          isOpen={isModalOpen}
          onClose={closeModal}
          events={userEvents}
        />
      </Box>
    </Box>
  );
};

export default ServiceProviderCard;
