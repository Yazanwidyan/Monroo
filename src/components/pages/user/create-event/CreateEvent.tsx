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
import userServices from "../../../../services/userServices";
import { useSnackBar } from "../../../../contexts/SnackbarContext";

export default function CreateEventPage({ isOpen, onClose }) {
  const { openSnackBar } = useSnackBar();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Event</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CreateEventForm
            onSubmit={async (createEvent: CreateEvent) => {
              const { selectedCategory, selectedSubCategories, ...rest } =
                createEvent;

              const payload = {
                ...rest,
                catID: createEvent.selectedCategory.value,
                subCatID: createEvent.selectedSubCategories[0].value,
              };
              try {
                const res = await userServices.createEvent(payload);
                openSnackBar("event created successfully", "success");
                onClose();
              } catch (error) {
                openSnackBar(error, "error");
              }
            }}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
