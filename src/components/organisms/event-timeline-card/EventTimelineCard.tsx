import { Box, Text, Flex, Divider, Button, Avatar, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Grid, TagLabel, Tag } from '@chakra-ui/react';
import { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';

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

    const formatTimestamp = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleDateString();
    };
    return (
        <Box onClick={handleShowEvent} cursor={'pointer'} borderColor={'gray.300'} borderWidth={1} px={6} py={5} borderRadius={14}>
            <Flex pb={4} align="center" flexWrap={'wrap'} gap={2} justify="flex-start" fontSize="sm" color="gray.500">
                <Flex direction="column" align="center">
                    <Text fontSize={'xs'} fontWeight="bold"></Text>
                    <Tag size="sm" variant="subtle" colorScheme="blue" color={'white'} bg={'black'} borderRadius={20}>
                        <TagLabel fontSize={'xs'} fontWeight="bold">
                            Posted {formatTimestamp(posted)}
                        </TagLabel>
                    </Tag>
                </Flex>
                <Flex direction="column" align="center">
                    <Tag size="sm" variant="subtle" colorScheme="primary" borderRadius={20}>
                        <TagLabel fontSize={'xs'} fontWeight="bold">
                            Date {formatTimestamp(eventDate)}
                        </TagLabel>
                    </Tag>
                </Flex>
                <Flex direction="column" align="center">
                    <Tag size="sm" variant="subtle" colorScheme="primary" borderRadius={20}>
                        <TagLabel fontSize={'xs'} fontWeight="bold">
                            Duration {duration} hrs
                        </TagLabel>
                    </Tag>
                </Flex>
            </Flex>

            <Flex gap={4} borderTopColor={'gray.300'} borderTopWidth={0} paddingTop={3}>
                <Box textAlign="center">
                    <Avatar mb={2} name={userName} src={image || '/assets/images/userprofile.jpg'} />
                    <Text fontSize="xs" mb={2}>
                        {userName}
                    </Text>
                </Box>
                <Box>
                    <Text fontSize="xl" fontWeight="semibold" mb={2}>
                        {title}
                    </Text>
                    <Text fontSize="sm" color="gray.600" mb={2}>
                        {description?.length > 60 ? description?.substring(0, 60) + '...' : description}
                    </Text>
                </Box>
            </Flex>
            <Button mt={8} variant={'link'} colorScheme={'blue'}>
                <Text mx={2}>View and apply</Text> <FaChevronRight size={'14'} />
            </Button>

            {/* <Flex mt={3} justify="space-between">
                <Button size="sm" colorScheme="primary" onClick={handleShowEvent}>
                    View event
                </Button>
            </Flex> */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ModalOverlay />
                <ModalContent minW={800}>
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
                                        {formatTimestamp(eventDate)}
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
                            Apply
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default EventTimelineCard;
