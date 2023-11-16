import { useNavigate } from "react-router-dom";
import { CreateEvent } from "../../../../models/CreateEvent";

import CreateEventForm from "../../../organisms/create-event-form/CreateEventForm";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

export default function CreateEventPage({ isOpen, onClose }) {
  const navigate = useNavigate();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Event</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CreateEventForm
            onSubmit={async (createEvent: CreateEvent) => {
              console.log({ createEvent });
              navigate("/login", { replace: true });
            }}
            onBackClick={() => navigate("/register")}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
