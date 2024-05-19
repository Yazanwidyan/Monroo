import { Flex, Box, Image, Text, Button, VStack, Container } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons'; // Make sure to import the CheckIcon from Chakra UI
import { useNavigate } from 'react-router-dom';

const BigCard = ({ image, title, points, buttonText }) => {
    const navigate = useNavigate();

    return (
        <Box display={'flex'} flexDirection={'column'} justifyContent={'flex-start'} flex={1} overflow="hidden" textAlign="center" bg={'white'} borderRadius="md" boxShadow="lg">
            <Box h="300px" overflow="hidden">
                <Image src={image} alt={title} objectFit="cover" w="100%" h="100%" />
            </Box>
            <Box p="6">
                <Text fontWeight={'600'} fontSize="2xl" mb="6">
                    {title}
                </Text>
                <VStack align="start" spacing="4" mb={8}>
                    {points.map((point, index) => (
                        <Flex key={index} textAlign={'start'} fontSize={'md'} align="center">
                            <CheckIcon color="primary.500" mr="2" />
                            <Text>{point}</Text>
                        </Flex>
                    ))}
                </VStack>
                <Button onClick={() => navigate('register')} variant={'outline'} colorScheme="primary" mt="4" mx="auto">
                    {buttonText}
                </Button>
            </Box>
        </Box>
    );
};

const ApplyBanner = () => {
    const cardData = [
        {
            image: '/assets/images/startcareer.jpg', // Updated image URL for Card 1
            title: 'Embark on an exciting career as a service provider',
            points: [
                'Apply conveniently online and promptly receive feedback from our team',
                'Explore numerous rewarding job opportunities',
                'Effortlessly manage your online profile and showcase your services',
            ],
            buttonText: 'Join as a Service Provider',
        },
        {
            image: '/assets/images/findtealent.jpg', // Updated image URL for Card 2
            title: 'Find the right service provider for your needs',
            points: [
                'Easily register and find skilled service providers online',
                'Book services directly through our platform',
                'Access a diverse range of service providers to meet your requirements',
            ],
            buttonText: 'Find Service Providers Now',
        },
    ];

    return (
        <Box bg="primary.50" pt="8" pb="8">
            <Container maxW={'7xl'}>
                <Flex p={8} gap={'4rem'} justifyContent={'space-between'} flexWrap="wrap">
                    {cardData.map((card, index) => (
                        <BigCard key={index} {...card} />
                    ))}
                </Flex>
            </Container>
        </Box>
    );
};

export default ApplyBanner;
