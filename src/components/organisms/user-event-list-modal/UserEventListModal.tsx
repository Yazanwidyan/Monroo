import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, VStack, Text, Flex, Box, Image } from '@chakra-ui/react';
import userServices from '../../../services/userServices';
import useCustomToast from '../../../hooks/useCustomToast';

const EventCard = ({ event, requestPrivateEvent }) => {
    return (
        <Box borderWidth="1px" borderRadius="lg" p={0} overflow="hidden" position="relative">
            <Box p={2}>
                <Flex justify="space-between" align="center" mb={2}>
                    <Box>
                        <Text fontWeight="bold" fontSize="medium">
                            {event.title}
                        </Text>
                        <Text color="gray.500" fontSize={'sm'}>
                            {event.desc}
                        </Text>
                    </Box>
                    <Box textAlign="right" alignSelf={'end'}>
                        <Button colorScheme={'primary'} fontWeight="bold" fontSize={'sm'} cursor="pointer" onClick={() => requestPrivateEvent(event)}>
                            Request Event
                        </Button>
                    </Box>
                </Flex>
            </Box>
        </Box>
    );
};

const UserEventListModal = ({ isOpen, onClose, events, providerID }) => {
    const { showToast } = useCustomToast();

    const requestPrivateEvent = async (event) => {
        const payload = {
            userID: event.userID,
            providerID: providerID,
            eventID: event.id,
        };
        try {
            const res = await userServices.requestPrivateEvent(payload);
            console.log(res);

            onClose();
            showToast('event requested successfuly', {
                title: '',
                status: 'success',
            });
        } catch (error) {
            showToast(error, { status: 'error' });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>User Event List</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={4} align="stretch">
                        {events.map((event, index) => (
                            <EventCard key={index} event={event} requestPrivateEvent={requestPrivateEvent} />
                        ))}
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="primary.500" onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default UserEventListModal;
