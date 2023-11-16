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
  Flex,
  Box,
} from "@chakra-ui/react";

const UserEventListModal = ({ isOpen, onClose, events }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>User Event List</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            {events.map((event, index) => (
              <Box
                key={index}
                borderWidth="1px"
                borderRadius="lg"
                p={4}
                boxShadow="base"
              >
                <Flex justify="space-between" align="center">
                  <Text fontWeight="bold">{event.title}</Text>
                  <Text color="gray.500">{event.date}</Text>
                </Flex>
                <Text mt={2}>{event.description}</Text>
              </Box>
            ))}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserEventListModal;
