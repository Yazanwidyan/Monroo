import { Box, Text, VStack, Grid, GridItem, Container, Image } from '@chakra-ui/react';

function ShowCategories() {
    const categories = [
        { label: 'Hospitality', imgSrc: '/assets/images/Hospitality.jpg', description: 'Find top talent for the hospitality industry.' },
        { label: 'Entertainment', imgSrc: '/assets/images/Entertainment.jpg', description: 'Hire entertainers to make your events memorable.' },
        { label: 'Marketing', imgSrc: '/assets/images/Influencer.jpg', description: 'Connect with influencers and marketers.' },
        { label: 'Glamour', imgSrc: '/assets/images/Glamour.jpg', description: 'Discover models and artists for glamour projects.' },
        { label: 'Casting', imgSrc: '/assets/images/Casting.jpg', description: 'Find casting professionals for your next production.' },
    ];

    return (
        <Box bg="primary.50" p={8} borderRadius="lg" boxShadow="md" textAlign="center">
            <Container maxW={'6xl'}>
                <VStack spacing={10} alignItems="center">
                    <Text fontSize="2xl" fontWeight="bold" mb={6}>
                        Explore Our Categories
                    </Text>
                    <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)', lg: 'repeat(5, 1fr)' }} gap={6} w="100%">
                        {categories.map((category, index) => (
                            <GridItem key={index} borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md" p={4} textAlign="center" bg="white">
                                <Image src={category.imgSrc} alt={category.label} boxSize="180px" objectFit="cover" borderRadius="full" mb={4} mx="auto" />
                                <Text fontSize="xl" fontWeight="bold" mb={2}>
                                    {category.label}
                                </Text>
                                <Text fontSize="md" color="gray.600">
                                    {category.description}
                                </Text>
                            </GridItem>
                        ))}
                    </Grid>
                </VStack>
            </Container>
        </Box>
    );
}

export default ShowCategories;
