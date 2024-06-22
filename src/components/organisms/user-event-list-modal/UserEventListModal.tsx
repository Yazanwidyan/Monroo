import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, VStack, Text, Flex, Box, Divider, HStack } from '@chakra-ui/react';
import userServices from '../../../services/userServices';
import useCustomToast from '../../../hooks/useCustomToast';

const EventCard = ({ event, requestPrivateEvent }) => {
    const formatTimestamp = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleDateString();
    };

    return (
        <Box borderWidth="1px" borderRadius="lg" p={4} overflow="hidden" position="relative">
            <VStack spacing={2} align="start">
                <Flex justify="space-between" align="center" width="100%">
                    <Text fontWeight="bold" fontSize="large">
                        {event.title}
                    </Text>
                    <Button colorScheme="primary" fontWeight="bold" fontSize="sm" cursor="pointer" onClick={() => requestPrivateEvent(event)}>
                        Request Event
                    </Button>
                </Flex>
                <Text color="gray.500" fontSize="sm">
                    {event.desc}
                </Text>
                <Divider />
                <HStack spacing={4}>
                    <Text>
                        <strong>Average Cost:</strong> ${event.averageCost}
                    </Text>
                    <Text>
                        <strong>Duration:</strong> {event.duration} hrs
                    </Text>
                    <Text>
                        <strong>Country:</strong> {event.country}
                    </Text>
                </HStack>
                <HStack spacing={4}>
                    <Text>
                        <strong>Start Date:</strong> {formatTimestamp(event.eventDate)}
                    </Text>
                    <Text>
                        <strong>End Date:</strong> {formatTimestamp(event.eventEndDate)}
                    </Text>
                </HStack>
                <HStack spacing={4}>
                    <Text>
                        <strong>Languages:</strong> {event.languages}
                    </Text>
                    <Text>
                        <strong>Location:</strong> {event.location}
                    </Text>
                </HStack>
                <Text>
                    <strong>Created Date:</strong> {formatTimestamp(event.createdDate)}
                </Text>
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
            showToast('Event requested successfully', {
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
                    <Button colorScheme="primary" onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default UserEventListModal;
