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
import { UserContext } from "../../../contexts/UserContext";
import useCustomToast from "../../../hooks/useCustomToast";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(UserContext);
  const { showToast } = useCustomToast();

  const [isHovered, setIsHovered] = useState(false);

  const [userEvents, setUserEvents] = useState<any>([]);

  const handleRequestPrivateEvent = () => {
    openModal();
  };
  const handleMouseEnter = () => {
    console.log("ddd");

    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleShowProfile = () => {};

  const openModal = async () => {
    setIsModalOpen(true);
    const payload = {
      userID: user.id,
    };
    try {
      const res = await userServices.getUserEvents(payload);
      setUserEvents(res.data);
    } catch (error) {
      showToast(error, { status: "error" });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box maxW="md" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box
        position="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          position="relative"
          src={
            image
              ? image
              : "https://www.zica.co.zm/wp-content/uploads/2021/02/dummy-profile-image.png"
          }
          alt={name}
        />
        {isHovered && (
          <Button
            colorScheme="primary"
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            onClick={handleShowProfile}
          >
            Show Profile
          </Button>
        )}
      </Box>

      <Box p="4">
        <Badge borderRadius="full" px="2" colorScheme="primary" mb="2">
          {title}
        </Badge>

        <Heading size="md" fontWeight="semibold" mb="2">
          {name}
        </Heading>

        <Text color="gray.600" mb="4">
          {description}
        </Text>
        <Button
          colorScheme="primary"
          mb="2"
          onClick={handleRequestPrivateEvent}
        >
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
