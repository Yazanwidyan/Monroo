import { Box, Text, Button, Flex, Container, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function Benefits() {
    const navigate = useNavigate();

    return (
        <Box p={8} borderRadius="lg" boxShadow="lg" textAlign="center">
            <Container maxW={'6xl'}>
                <Text fontSize="3xl" fontWeight="bold" mb={8}>
                    We connect you with clients near you or internationally!
                </Text>
                <Flex flexWrap="wrap" justifyContent="space-around" mb={8}>
                    <Box
                        flex={1}
                        alignItems="center"
                        flexDirection="column"
                        lineHeight={1.4}
                        display={'flex'}
                        maxW="250px"
                        p={4}
                        m={2}
                        bg="white"
                        borderRadius="md"
                        transition="transform 0.2s"
                        _hover={{ transform: 'scale(1.05)' }}
                    >
                        <Image src={'/assets/images/leadership.png'} alt={'Be Your Own Boss'} boxSize="100px" borderRadius="md" mb={4} />
                        <Text fontSize="lg" fontWeight="bold" mb={2}>
                            Be Your Own Boss
                        </Text>
                        <Text fontSize="md" textAlign="center">
                            Set Your Rates, Keep Your Earnings.
                        </Text>
                    </Box>

                    <Box
                        flex={1}
                        display={'flex'}
                        alignItems="center"
                        flexDirection="column"
                        lineHeight={1.4}
                        maxW="250px"
                        p={4}
                        m={2}
                        bg="white"
                        borderRadius="md"
                        transition="transform 0.2s"
                        _hover={{ transform: 'scale(1.05)' }}
                    >
                        <Image src={'/assets/images/review.png'} alt={'Transparent Feedback and Review System'} boxSize="90px" borderRadius="md" mb={4} />
                        <Text fontSize="lg" fontWeight="bold" mb={2}>
                            Transparent Feedback and Review System
                        </Text>
                    </Box>

                    <Box
                        flex={1}
                        display={'flex'}
                        alignItems="center"
                        flexDirection="column"
                        lineHeight={1.4}
                        maxW="250px"
                        p={4}
                        m={2}
                        bg="white"
                        borderRadius="md"
                        transition="transform 0.2s"
                        _hover={{ transform: 'scale(1.05)' }}
                    >
                        <Image src={'/assets/images/credit-card.png'} alt={'Secure Transactions'} boxSize="100px" borderRadius="md" mb={4} />
                        <Text fontSize="lg" fontWeight="bold" mb={2}>
                            Secure Transactions
                        </Text>
                    </Box>

                    <Box
                        flex={1}
                        display={'flex'}
                        alignItems="center"
                        flexDirection="column"
                        lineHeight={1.4}
                        maxW="250px"
                        p={4}
                        m={2}
                        bg="white"
                        borderRadius="md"
                        transition="transform 0.2s"
                        _hover={{ transform: 'scale(1.05)' }}
                    >
                        <Image src={'/assets/images/opportunity.png'} alt={'Unlimited Opportunities'} boxSize="100px" borderRadius="md" mb={4} />
                        <Text fontSize="lg" fontWeight="bold" mb={2}>
                            No Limits
                        </Text>
                        <Text fontSize="md" textAlign="center">
                            Unlimited opportunities
                        </Text>
                    </Box>
                </Flex>
                <Button onClick={() => navigate('register')} colorScheme="primary" size="lg" mt={10} borderRadius="full">
                    Start Now!
                </Button>
            </Container>
        </Box>
    );
}

export default Benefits;
