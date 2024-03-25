import { Box, Text, Flex, Divider, Button, Avatar, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import { useState } from 'react';

const EventTimelineCard = ({ image, title, userName, duration, posted, description, country, eventDate, averageCost, status, onMessage }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleShowEvent = () => {
        openModal();
    };

    const openModal = async () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000); // Multiply by 1000 to convert from seconds to milliseconds
        const day = date?.getDate()?.toString()?.padStart(2, '0');
        const month = (date?.getMonth() + 1)?.toString()?.padStart(2, '0'); // Month is zero-based
        const year = date?.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <Box borderWidth={1} p={4} borderRadius={8}>
            <Flex gap={4}>
                <Box textAlign="center">
                    <Avatar name={userName} src={image || '/assets/images/userprofile.jpg'} />
                    <Text fontSize="xs" mb={2}>
                        {userName}
                    </Text>
                </Box>
                <Box>
                    <Text fontSize="lg" fontWeight="semibold" mb={2}>
                        {title}
                    </Text>
                    <Text minH="3rem" fontSize="sm" color="gray.600" mb={2}>
                        {description?.length > 60 ? description?.substring(0, 60) + '...' : description}
                    </Text>
                </Box>
            </Flex>
            <Divider my={2} />

            <Flex align="center" justify="space-between">
                <Text fontSize="xs" color="gray.500">
                    Posted
                    <Box as="br" />
                    {formatDate(posted)}
                </Text>
                <Text fontSize="xs" color="gray.500">
                    Event
                    <Box as="br" />
                    {formatDate(eventDate)}
                </Text>
                <Text fontSize="xs" color="gray.500">
                    Duration
                    <Box as="br" />
                    {duration} hrs
                </Text>
            </Flex>

            <Flex mt={3} justify="space-between">
                <Button size="sm" colorScheme="primary" onClick={handleShowEvent}>
                    View event
                </Button>
            </Flex>
            <Modal isOpen={isModalOpen} onClose={closeModal} size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Event Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box textAlign="center">
                            <Avatar name={userName} src={image || '/assets/images/userprofile.jpg'} />
                            <Text fontSize="xs" mb={2}>
                                {userName}
                            </Text>
                        </Box>
                        <Box mb={4}>
                            <Text fontSize="md" fontWeight="semibold" mb={2}>
                                Title:
                            </Text>
                            <Text fontSize="sm" color="gray.600" mb={4}>
                                {title}
                            </Text>
                        </Box>
                        <Divider my={2} />
                        <Box mb={4}>
                            <Text fontSize="md" fontWeight="semibold" mb={2}>
                                Description:
                            </Text>
                            <Text fontSize="sm" color="gray.600" mb={4}>
                                {description}
                            </Text>
                        </Box>
                        <Divider my={2} />
                        <Box mb={4}>
                            <Text fontSize="md" fontWeight="semibold" mb={2}>
                                Event Location:
                            </Text>
                            <Text fontSize="sm" color="gray.600" mb={4}>
                                {country}
                            </Text>
                        </Box>
                        <Divider my={2} />
                        <Box mb={4}>
                            <Text fontSize="md" fontWeight="semibold" mb={2}>
                                Event Date:
                            </Text>
                            <Text fontSize="sm" color="gray.600" mb={4}>
                                {formatDate(eventDate)}
                            </Text>
                        </Box>
                        <Divider my={2} />
                        <Box mb={4}>
                            <Text fontSize="md" fontWeight="semibold" mb={2}>
                                Duration:
                            </Text>
                            <Text fontSize="sm" color="gray.600" mb={4}>
                                {duration} hrs
                            </Text>
                        </Box>
                        <Box mb={4}>
                            <Text fontSize="md" fontWeight="semibold" mb={2}>
                                Average cost (USD):
                            </Text>
                            <Text fontSize="sm" color="gray.600" mb={4}>
                                {averageCost}
                            </Text>
                        </Box>
                        <Box mb={4}>
                            <Text fontSize="md" fontWeight="semibold" mb={2}>
                                Status:
                            </Text>
                            <Text fontSize="sm" color="gray.600" mb={4}>
                                {status}
                            </Text>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button size="sm" colorScheme="primary" onClick={onMessage}>
                            Request Contact
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default EventTimelineCard;
