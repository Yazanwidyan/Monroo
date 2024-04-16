import { Box, Text, Flex, Divider, Button, Avatar, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Grid } from '@chakra-ui/react';
import { useState } from 'react';

const EventTimelineCard = ({ image, title, userName, duration, posted, description, country, eventDate, averageCost, onMessage }) => {
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

    const requestConnection = () => {
        onMessage();
        closeModal();
    };

    const formatDate = (timestamp) => {
        console.log('timestamp', timestamp);

        let date;
        if (/^\d+$/.test(timestamp)) {
            // If the timestamp contains only digits, assume it's a Unix timestamp
            date = parseInt(timestamp) * 1000;
        } else {
            // Otherwise, assume it's in ISO format and use it directly
            date = new Date(timestamp).getTime();
        }

        const dateObj = new Date(date); // No need to multiply by 1000 here, as it's already in milliseconds
        const day = dateObj?.getDate()?.toString()?.padStart(2, '0');
        const month = (dateObj?.getMonth() + 1)?.toString()?.padStart(2, '0'); // Month is zero-based
        const year = dateObj?.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <Box onClick={handleShowEvent} cursor={'pointer'} borderColor={'gray.300'} borderWidth={1} p={4} borderRadius={8}>
            <Flex gap={4}>
                <Box textAlign="center">
                    <Avatar mb={2} name={userName} src={image || '/assets/images/userprofile.jpg'} />
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
            <Flex align="center" borderTopColor={'gray.300'} borderTopWidth={2} paddingTop={3} justify="space-between" fontSize="sm" color="gray.500">
                <Flex direction="column" align="center">
                    <Text fontSize={'xs'} fontWeight="bold">
                        Posted
                    </Text>
                    <Text>{formatDate(posted)}</Text>
                </Flex>
                <Flex direction="column" align="center">
                    <Text fontSize={'xs'} fontWeight="bold">
                        Event Date
                    </Text>
                    <Text>{formatDate(eventDate)}</Text>
                </Flex>
                <Flex direction="column" align="center">
                    <Text fontSize={'xs'} fontWeight="bold">
                        Duration
                    </Text>
                    <Text>{duration} hrs</Text>
                </Flex>
            </Flex>

            {/* <Flex mt={3} justify="space-between">
                <Button size="sm" colorScheme="primary" onClick={handleShowEvent}>
                    View event
                </Button>
            </Flex> */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ModalOverlay />
                <ModalContent minW={1200}>
                    <ModalHeader>Event Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                            <Box>
                                <Box mb={4}>
                                    <Flex align="center">
                                        <Avatar name={userName} src={image || '/assets/images/userprofile.jpg'} />
                                        <Text fontSize="sm" color="gray.600" ml={2}>
                                            {userName}
                                        </Text>
                                    </Flex>
                                </Box>
                                <Divider />
                                <Box mt={4}>
                                    <Text fontSize="md" fontWeight="semibold" mb={2}>
                                        Title:
                                    </Text>
                                    <Text fontSize="sm" color="gray.600" mb={4}>
                                        {title}
                                    </Text>
                                </Box>
                                <Divider />
                            </Box>
                            <Box>
                                <Box mb={4}>
                                    <Text fontSize="md" fontWeight="semibold" mb={2}>
                                        Event Date:
                                    </Text>
                                    <Text fontSize="sm" color="gray.600" mb={4}>
                                        {formatDate(eventDate)}
                                    </Text>
                                </Box>
                                <Box>
                                    <Box mt={4}>
                                        <Text fontSize="md" fontWeight="semibold" mb={2}>
                                            Event Location:
                                        </Text>
                                        <Text fontSize="sm" color="gray.600" mb={4}>
                                            {country}
                                        </Text>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                            <Box mt={4}>
                                <Text fontSize="md" fontWeight="semibold" mb={2}>
                                    Description:
                                </Text>
                                <Text fontSize="sm" color="gray.600" mb={4}>
                                    {description}
                                </Text>
                            </Box>
                            <Box>
                                <Box mt={4}>
                                    <Text fontSize="md" fontWeight="semibold" mb={2}>
                                        Duration:
                                    </Text>
                                    <Text fontSize="sm" color="gray.600" mb={4}>
                                        {duration} hrs
                                    </Text>
                                </Box>
                                <Box mt={4}>
                                    <Text fontSize="md" fontWeight="semibold" mb={2}>
                                        Average cost:
                                    </Text>
                                    <Text fontSize="sm" color="gray.600" mb={4}>
                                        {averageCost}
                                    </Text>
                                </Box>
                            </Box>
                        </Grid>
                    </ModalBody>

                    <ModalFooter>
                        <Button size="sm" colorScheme="primary" onClick={requestConnection}>
                            Request Contact
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default EventTimelineCard;
