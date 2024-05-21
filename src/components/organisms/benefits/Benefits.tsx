import { Box, Text, Button, VStack, Flex, Container, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function Benefits() {
    const navigate = useNavigate();

    return (
        <Box bg="primary.50" p={8} borderRadius="lg" boxShadow="md" textAlign="center">
            <Container maxW={'6xl'}>
                <Text fontSize="lg" fontWeight="bold" mb={8}>
                    We connect you with clients near you or internationally!
                </Text>
                <VStack spacing={10} flexDirection="row" alignItems="flex-start">
                    <Flex flex={1} alignItems="center" flexDirection="column" lineHeight={1.4}>
                        <Image src={'/assets/images/leadership.png'} alt={'cc'} boxSize="120px" borderRadius="md" mb={4} />

                        <Text fontSize="lg" fontWeight="bold" mb={2}>
                            Be Your Own Boss
                        </Text>
                        <Text fontSize="md" textAlign="center">
                            Set Your Rates, Keep Your Earnings with Monroe.
                        </Text>
                    </Flex>

                    <Flex flex={1} alignItems="center" flexDirection="column" lineHeight={1.4}>
                        <Image src={'/assets/images/opportunity.png'} alt={'cc'} boxSize="120px" borderRadius="md" mb={4} />
                        <Text fontSize="lg" fontWeight="bold" mb={2}>
                            No Limits{' '}
                        </Text>
                        <Text fontSize="md" textAlign="center">
                            More Opportunities{' '}
                        </Text>
                    </Flex>
                </VStack>
                <Button onClick={() => navigate('register')} colorScheme="primary" size="lg" mt={10}>
                    Start Now!
                </Button>
            </Container>
        </Box>
    );
}

export default Benefits;
