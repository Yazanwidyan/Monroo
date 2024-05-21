import { useContext } from 'react';
import { Box, Heading, Text, VStack, Divider, Image, Container } from '@chakra-ui/react';
import { UserContext } from '../../../../contexts/UserContext';

const UserProfile = () => {
    const { user } = useContext(UserContext);

    return (
        <Container maxW={'6xl'}>
            <Box mt={10} bg="white" borderRadius="xl">
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
        </Container>
    );
};

export default UserProfile;
