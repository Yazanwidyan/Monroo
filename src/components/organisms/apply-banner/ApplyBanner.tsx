import { Box, VStack, Text, Button, Image, Container } from "@chakra-ui/react";

// Replace these image URLs with your own image sources
const staffImage = "https://via.placeholder.com/150";
const partnerImage = "https://via.placeholder.com/150";

function ApplyBanner() {
  return (
    <Box bg="gray.100">
      <Container
        p={8}
        display="flex"
        justifyContent="space-around"
        maxWidth={"5xl"}
      >
        <VStack spacing={6} alignItems="center">
          <Image src={staffImage} alt="Hire Staff" boxSize="150px" />
          <Text fontSize="xl" fontWeight="bold" color="primary.500">
            Hire Staff
          </Text>
          <Box maxW="400px">
            <Text fontSize={"sm"} textAlign="center" color="gray.600">
              Organizing an event? Look no further! Just click below to get
              started, select your staff, and get a quote!
            </Text>
          </Box>
          <Button colorScheme="primary.500" variant={"outline"} size="sm">
            See Our Staff
          </Button>
        </VStack>

        <VStack spacing={6} alignItems="center">
          <Image src={partnerImage} alt="Become a Partner" boxSize="150px" />
          <Text fontSize="xl" fontWeight="bold" color="primary.500">
            Become a Partner
          </Text>
          <Box maxW="400px">
            <Text fontSize={"sm"} textAlign="center" color="gray.600">
              Join our team and start working with other talented and ambitious
              people such as yourself. Just click below to register!
            </Text>
          </Box>
          <Button colorScheme="primary.500" variant={"outline"} size="sm">
            I want to work
          </Button>
        </VStack>
      </Container>
    </Box>
  );
}

export default ApplyBanner;
