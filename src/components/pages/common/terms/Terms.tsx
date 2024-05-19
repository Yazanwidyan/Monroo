import { Box, Heading, Container, Text, VStack } from '@chakra-ui/react';

const TermsOfUse = () => {
    return (
        <Box py={10}>
            <Container maxW={'7xl'}>
                <Box p={4}>
                    <Heading as="h2" size="xl" mb={6}>
                        Terms of Service
                    </Heading>
                    <Text fontSize="lg" mb={5}>
                        Last Updated: May 15, 2024
                    </Text>
                    <VStack spacing={6}>
                        <Text fontSize="lg">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae mauris augue. Sed sed turpis nec tortor rutrum gravida. Nulla facilisi. Phasellus vestibulum, arcu et
                            aliquet iaculis, sem ipsum vestibulum nulla, non finibus tortor justo et est.
                        </Text>
                        <Text fontSize="lg">
                            Sed eu erat vel ex iaculis sodales a sit amet lacus. Quisque auctor odio sit amet lorem maximus feugiat. Suspendisse potenti. Nam viverra libero vel eros varius, sed mattis
                            justo efficitur.
                        </Text>
                        <Text fontSize="lg">
                            Duis ut arcu in ex pharetra efficitur nec eget libero. Curabitur tincidunt velit vitae purus dictum, a convallis magna posuere. Sed ac metus auctor, molestie enim in,
                            dapibus velit. Duis vulputate, leo id viverra pellentesque, felis eros efficitur nisi, sit amet eleifend leo sapien in turpis.
                        </Text>
                        <Text fontSize="lg">
                            Duis ut arcu in ex pharetra efficitur nec eget libero. Curabitur tincidunt velit vitae purus dictum, a convallis magna posuere. Sed ac metus auctor, molestie enim in,
                            dapibus velit. Duis vulputate, leo id viverra pellentesque, felis eros efficitur nisi, sit amet eleifend leo sapien in turpis.
                        </Text>
                        <Text fontSize="lg">
                            Duis ut arcu in ex pharetra efficitur nec eget libero. Curabitur tincidunt velit vitae purus dictum, a convallis magna posuere. Sed ac metus auctor, molestie enim in,
                            dapibus velit. Duis vulputate, leo id viverra pellentesque, felis eros efficitur nisi, sit amet eleifend leo sapien in turpis.
                        </Text>
                    </VStack>
                </Box>
            </Container>
        </Box>
    );
};

export default TermsOfUse;
