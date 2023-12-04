import { Box, Text, Button, VStack, Flex, Container } from "@chakra-ui/react";

function Benefits() {
  return (
    <Box
      bg="gray.100"
      p={8}
      borderRadius="lg"
      boxShadow="md"
      textAlign="center"
    >
      <Container maxW={"6xl"}>
        <Text fontSize="xl" fontWeight="bold" mb={8}>
          We connect you with clients near you or internationally!
        </Text>

        <Text fontWeight="bold" mb={4}>
          3 of your benefits
        </Text>
        <VStack spacing={10} flexDirection="row" alignItems="flex-start">
          <Flex
            flex={1}
            alignItems="center"
            flexDirection="column"
            lineHeight={1.4}
          >
            <Text fontSize="7xl" fontWeight="bold" mb={4}>
              1.
            </Text>
            <Text fontSize="xl" fontWeight="bold" mb={2}>
              Get Exciting Jobs
            </Text>
            <Text fontSize="md" textAlign="center">
              Have you ever wanted to be shown in catalogs, magazines, or
              commercials as a service provider?
            </Text>
          </Flex>

          <Flex
            flex={1}
            alignItems="center"
            flexDirection="column"
            lineHeight={1.4}
          >
            <Text fontSize="7xl" fontWeight="bold" mb={4}>
              2.
            </Text>
            <Text fontSize="xl" fontWeight="bold" mb={2}>
              Be Independent
            </Text>
            <Text fontSize="md" textAlign="center">
              Our online service portal enables you to manage your profile in
              any location at any time!
            </Text>
          </Flex>

          <Flex
            flex={1}
            alignItems="center"
            flexDirection="column"
            lineHeight={1.4}
          >
            <Text fontSize="7xl" fontWeight="bold" mb={4}>
              3.
            </Text>
            <Text fontSize="xl" fontWeight="bold" mb={2}>
              Build a Network
            </Text>
            <Text fontSize="md" textAlign="center">
              Build a strong professional network with clients in various
              industries!
            </Text>
          </Flex>
        </VStack>
        <Button colorScheme="primary" size="md" mt={10}>
          Start Now!
        </Button>
      </Container>
    </Box>
  );
}

export default Benefits;
