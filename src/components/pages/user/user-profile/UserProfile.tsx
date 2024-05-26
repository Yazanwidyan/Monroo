import { useContext, useState } from 'react';
import { Box, Heading, Text, VStack, Divider, Image, Container, Button } from '@chakra-ui/react';
import { UserContext } from '../../../../contexts/UserContext';
import EditProfileModal from './EditProfileModal';
import { FaPencilAlt } from 'react-icons/fa';

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
        <Container maxW={'6xl'}>
            <Box mt={10} bg="white" borderRadius="xl">
                <Button leftIcon={<FaPencilAlt />} color={'black'} bg={'white'} onClick={openEditModal}>
                    <Text fontSize={'sm'}>Edit my profile</Text>
                </Button>
                <VStack align="start" spacing="4">
                    <Box>
                        <Image borderRadius="2xl" boxSize="100px" src={user.profilePic} alt={user.name} />
                        <Heading as="h2" mt={4} fontSize="3xl" fontWeight="bold">
                            {user.name}
                        </Heading>
                    </Box>

                    <Divider />

                    <VStack align="start" spacing="4" w="100%">
                        <Box>
                            <Heading as="h3" fontSize="xl" mb={2}>
                                Personal Information
                            </Heading>
                            <Divider />
                            <VStack align="start" spacing="2" mt={4}>
                                <Text>
                                    <strong>Email:</strong> {user.email}
                                </Text>
                                <Text>
                                    <strong>Phone:</strong> {user.phone}
                                </Text>
                                <Text>
                                    <strong>Company Name:</strong> {user.companyName}
                                </Text>
                                <Text>
                                    <strong>Country:</strong> {user.country}
                                </Text>
                                <Text>
                                    <strong>About:</strong> {user.about}
                                </Text>
                            </VStack>
                        </Box>
                    </VStack>
                </VStack>
            </Box>
            <EditProfileModal isOpen={isEditModalOpen} onClose={closeEditModal} />
        </Container>
    );
};

export default UserProfile;
