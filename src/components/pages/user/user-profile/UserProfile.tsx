import { useContext, useState } from 'react';
import { Box, Heading, Text, VStack, Divider, Image, Container, Button, Flex } from '@chakra-ui/react';
import { UserContext } from '../../../../contexts/UserContext';
import EditProfileModal from './EditProfileModal';
import { FaPencilAlt } from 'react-icons/fa';

const headerHeight = 70; // Height of the header in pixels
const footerHeight = 160; // Height of the footer in pixels

const minHeight = `calc(100vh - ${headerHeight}px - ${footerHeight}px)`;

const UserProfile = () => {
    const { user } = useContext(UserContext);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to manage modal open/close

    const openEditModal = () => {
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    return (
        <Box bg="primary.50" minHeight={minHeight}>
            <Container maxW="6xl" py={5}>
                <Box borderRadius="xl" pt={6}>
                    <Flex justify="space-between" align="center" mb={2}>
                        <Flex align="center">
                            <Image borderRadius="full" boxSize="120px" src={user.profilePic || '/assets/images/userprofile.jpg'} alt={user.name} />
                            <Box ml={6}>
                                <Heading as="h2" size="lg" fontWeight="bold">
                                    {user.name}
                                </Heading>
                                <Text color="gray.500">{user.companyName}</Text>
                            </Box>
                        </Flex>
                        <Button leftIcon={<FaPencilAlt />} colorScheme="primary" onClick={openEditModal}>
                            <Text fontSize="sm">Edit Profile</Text>
                        </Button>
                    </Flex>
                    <Divider mb={2} />
                    <VStack align="start" spacing={4}>
                        <Box w="full">
                            <Heading as="h3" size="md" mb={2}>
                                Personal Information
                            </Heading>
                            <Divider mb={4} />
                            <VStack align="start" spacing={2}>
                                <Text>
                                    <strong>Email:</strong> {user.email}
                                </Text>
                                <Text>
                                    <strong>Phone:</strong> {user.phone}
                                </Text>
                                {user.companyName && (
                                    <Text>
                                        <strong>Company Name:</strong> {user.companyName}
                                    </Text>
                                )}
                                {user.country && (
                                    <Text>
                                        <strong>Country:</strong> {user.country}
                                    </Text>
                                )}
                                {user.about && (
                                    <Text>
                                        <strong>About:</strong> {user.about}
                                    </Text>
                                )}
                            </VStack>
                        </Box>
                    </VStack>
                </Box>
                <EditProfileModal title={'edit_profile'} isOpen={isEditModalOpen} onClose={closeEditModal} />
            </Container>
        </Box>
    );
};

export default UserProfile;
