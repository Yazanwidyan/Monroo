import {
  Box,
  Text,
  Button,
  Flex,
  Divider,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  ModalFooter,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import UserEventListModal from "../user-event-list-modal/UserEventListModal";
import userServices from "../../../services/userServices";
import { UserContext } from "../../../contexts/UserContext";
import useCustomToast from "../../../hooks/useCustomToast";
import { useNavigate } from "react-router-dom";
import EditProfileModal from "../../pages/user/user-profile/EditProfileModal";
import CreateEventPage from "../../pages/user/create-event/CreateEvent";

const ServiceProviderCard = ({
  experience,
  nationality,
  gender,
  bio,
  image,
  name,
  providerID,
}: any) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateEventModalOpen, setIsCreateEventOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to manage modal open/close
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { user } = useContext(UserContext);
  const { showToast } = useCustomToast();

  const [userEvents, setUserEvents] = useState<any>([]);

  const handleRequestPrivateEvent = async () => {
    if (user && user?.isMainUser) {
      const payload = {
        userID: user.id,
      };
      try {
        const res = await userServices.getUserEvents(payload);
        setUserEvents(res.data);
        if (res.data.length) {
          openModal();
        } else {
          openCreateEventModal();
        }
      } catch (error) {
        showToast(error, { status: "error" });
      }
    } else {
      navigate("/register");
    }
  };
  const openDialog = () => {
    if (user?.country) {
      setIsDialogOpen(true);
      setIsCreateEventOpen(false);
    } else {
      setIsEditModalOpen(true);
    }
  };
  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleShowProfile = () => {
    navigate(`/service-provider-profile-view/${providerID}`);
  };

  const openModal = async () => {
    if (user?.country) {
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
    } else {
      setIsEditModalOpen(true);
    }
  };

  const openCreateEventModal = () => {
    setIsCreateEventOpen(true);
  };
  const closeCreateEventModal = () => {
    setIsCreateEventOpen(false);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box
      borderColor="#CBD5E0"
      borderWidth="2px"
      borderRadius={"md"}
      maxW="md"
      overflow="hidden"
    >
      <Box height={"300"}>
        <Image
          objectFit={"cover"}
          src={image || "/assets/images/userprofile.jpg"}
          alt={name}
          style={{ cursor: "pointer" }}
          boxSize={"100%"}
          onClick={handleShowProfile}
        />
      </Box>
      <Box p={3}>
        <Text fontSize="md">{name}</Text>

        <Box fontSize="sm" color="gray.500">
          <Flex align="center" gap={2}>
            <Text fontSize={"xs"} fontWeight="bold">
              experience:
            </Text>
            <Text> {experience ? experience : "N/A"}</Text>
          </Flex>
          <Flex align="center" gap={2}>
            <Text fontSize={"xs"} fontWeight="bold">
              Nationality:
            </Text>
            <Text> {nationality ? nationality : "N/A"}</Text>
          </Flex>
          <Flex align="center" gap={2}>
            <Text fontSize={"xs"} fontWeight="bold">
              Gender:
            </Text>
            <Text>
              {" "}
              {gender == 1 ? "Male" : gender == 2 ? "Female" : "N/A"}
            </Text>
          </Flex>
        </Box>
        <Divider my={2} />
        <Text minH="2rem" fontSize="xs" color="gray.600">
          {bio?.length > 66 ? bio?.substring(0, 70) + "..." : bio}
        </Text>
        <Divider my={2} />
        <Box>
          <Button
            width={"100%"}
            variant={"outline"}
            textTransform={"uppercase"}
            fontSize="x-small"
            colorScheme="primary"
            mb="0"
            onClick={handleRequestPrivateEvent}
          >
            Message
          </Button>
          <EditProfileModal
            title={"complete_profile"}
            isOpen={isEditModalOpen}
            onClose={closeEditModal}
          />
          <UserEventListModal
            providerID={providerID}
            isOpen={isModalOpen}
            onClose={closeModal}
            events={userEvents}
          />
          <Modal
            isOpen={isCreateEventModalOpen}
            onClose={closeCreateEventModal}
            size="sm"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Event listing required</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack spacing={4} align="stretch">
                  <Box>
                    To message a star to apply for an event, you first need to
                    creat an event
                  </Box>
                </VStack>
              </ModalBody>
              <ModalFooter justifyContent={"initial"} gap={2}>
                <Button colorScheme="primary" onClick={openDialog}>
                  Create an Event
                </Button>
                <Button
                  colorScheme="outline"
                  variant={"outline"}
                  onClick={closeCreateEventModal}
                >
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <CreateEventPage isOpen={isDialogOpen} onClose={closeDialog} />
        </Box>
      </Box>
    </Box>
  );
};

export default ServiceProviderCard;
