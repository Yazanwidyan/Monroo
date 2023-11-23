import {
  Box,
  Image,
  Badge,
  Text,
  Heading,
  VStack,
  Button,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import UserEventListModal from "../user-event-list-modal/UserEventListModal";
import userServices from "../../../services/userServices";
import { useSnackBar } from "../../../contexts/SnackbarContext";
import { UserContext } from "../../../contexts/UserContext";

const ServiceProviderCard = ({
  image,
  title,
  name,
  description,
  experience,
  nationality,
  gender,
  providerID,
}) => {
  const { openSnackBar } = useSnackBar();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(UserContext);

  const [userEvents, setUserEvents] = useState<any>([]);

  const handleRequestPrivateEvent = () => {
    openModal();
  };

  const openModal = async () => {
    setIsModalOpen(true);
    const payload = {
      userID: user.id,
    };
    try {
      const res = await userServices.getUserEvents(payload);
      console.log(res);
      setUserEvents(res);
    } catch (error) {
      openSnackBar(error, "error");
    }
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
      <Image
        src={
          image
            ? image
            : "https://www.zica.co.zm/wp-content/uploads/2021/02/dummy-profile-image.png"
        }
        alt={name}
      />

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
            <strong>Gender:</strong> {gender === 0 ? "Male" : "Femail"}
          </Text>
        </VStack>

        <Button colorScheme="teal" onClick={handleRequestPrivateEvent}>
          Request Private Event
        </Button>

        <UserEventListModal
          providerID={providerID}
          isOpen={isModalOpen}
          onClose={closeModal}
          events={userEvents}
        />
      </Box>
    </Box>
  );
};

export default ServiceProviderCard;
