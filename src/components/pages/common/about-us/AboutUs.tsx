import { Box, Heading, Container, Text, Image, VStack, Center, Divider } from '@chakra-ui/react';

const AboutUs = () => {
    return (
        <Box py={10}>
            <Container maxW={'7xl'}>
                <Box p={4}>
                    <Heading as="h2" size="xl" mb={6} textAlign="center">
                        About Us
                    </Heading>
                    <VStack spacing={8}>
                        <Center>
                            <Image src="/about-image.jpg" alt="About Us" borderRadius="full" boxSize="200px" objectFit="cover" />
                        </Center>
                        <Text fontSize="lg" textAlign="center">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae mauris augue. Sed sed turpis nec tortor rutrum gravida. Nulla facilisi. Phasellus vestibulum, arcu et
                            aliquet iaculis, sem ipsum vestibulum nulla, non finibus tortor justo et est.
                        </Text>
                        <Divider />
                        <Text fontSize="lg" textAlign="center">
                            Sed eu erat vel ex iaculis sodales a sit amet lacus. Quisque auctor odio sit amet lorem maximus feugiat. Suspendisse potenti. Nam viverra libero vel eros varius, sed mattis
                            justo efficitur.
                        </Text>
                    </VStack>
                </Box>
            </Container>
        </Box>
    );
};

export default AboutUs;
