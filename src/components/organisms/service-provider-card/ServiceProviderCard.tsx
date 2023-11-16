import {
  Box,
  Image,
  Badge,
  Text,
  Heading,
  VStack,
  Button,
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
        <Box alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            {title}
          </Badge>
        </Box>

        <Box mt="2">
          <Heading size="md" fontWeight="semibold">
            {name}
          </Heading>
          <Text mt="2" color="gray.600">
            {description}
          </Text>
        </Box>

        <VStack mt="3" alignItems="flex-start" spacing="1">
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
        <Button mt="3" colorScheme="blue" onClick={handleRequestPrivateEvent}>
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
