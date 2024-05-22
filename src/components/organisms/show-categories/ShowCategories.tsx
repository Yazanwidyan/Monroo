import { Box, Text, VStack, Flex, Container, Image } from '@chakra-ui/react';

function ShowCategories() {
    const categories = [
        { label: 'Hospitality', imgSrc: '/assets/images/charity.png' },
        { label: 'Entertainment', imgSrc: '/assets/images/cinema.png' },
        { label: 'Marketing', imgSrc: '/assets/images/marketing.png' },
        { label: 'Glamour', imgSrc: '/assets/images/diamond.png' },
        { label: 'Casting', imgSrc: '/assets/images/casting.png' },
    ];

    return (
        <Box bg="primary.50" p={8} borderRadius="lg" boxShadow="md" textAlign="center">
            <Container maxW={'6xl'}>
                <VStack spacing={10} alignItems="center">
                    <Flex flexDirection="row" justifyContent="space-around" flexWrap="wrap" w="100%">
                        {categories.map((category, index) => (
                            <Flex key={index} flexDirection="column" alignItems="center" m={4} maxW="200px">
                                <Image src={category.imgSrc} alt={category.label} boxSize="100px" borderRadius="md" mb={4} />
                                <Text fontSize="xl" fontWeight="bold" mb={2}>
                                    {category.label}
                                </Text>
                            </Flex>
                        ))}
                    </Flex>
                </VStack>
            </Container>
        </Box>
    );
}

export default ShowCategories;
