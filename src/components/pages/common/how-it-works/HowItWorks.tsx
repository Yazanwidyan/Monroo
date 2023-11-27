import {
  Box,
  Heading,
  Flex,
  Grid,
  Icon,
  Container,
  Button,
} from "@chakra-ui/react";
import {
  FaRegEnvelope,
  FaRegUser,
  FaRegAddressCard,
  FaRegCreditCard,
  FaRegCheckCircle,
  FaChevronRight,
} from "react-icons/fa"; // Import icons from react-icons library

const stepsData1 = [
  { title: "Step 1", icon: FaRegEnvelope },
  { title: "Step 2", icon: FaRegUser },
  { title: "Step 3", icon: FaRegAddressCard },
  { title: "Step 4", icon: FaRegCreditCard },
];

const HowItWorks = () => {
  return (
    <Container maxW={"7xl"}>
      <Box p="4">
        <Flex>
          {/* Left Section: Big Title and Description */}
          <Box flex="1" p="4">
            <Heading as="h2" size="xl" mb="4">
              Your Big Title
            </Heading>
            <Box>
              <p>Your description goes here...</p>
            </Box>
          </Box>

          <Box flex="1" p="4">
            <img
              src="https://via.placeholder.com/300" // Replace with your image URL
              alt="Your Photo"
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
        </Flex>

        <Box textAlign={"center"} mt="8">
          <Heading as="h2" size="lg" mb="4">
            Talent
          </Heading>
          <Box mb={6}>
            <p>Your description goes here...</p>
          </Box>
          <Grid mb={6} templateColumns="repeat(4, 1fr)" gap={6}>
            {stepsData1.map((step, index) => (
              <Box key={index} textAlign="left" p={4}>
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                >
                  <Icon as={step.icon} fontSize="2xl" mb={3} />
                  {index !== stepsData1.length - 1 && (
                    <Icon as={FaChevronRight} fontSize="sm" mb={3} />
                  )}
                </Box>
                <Heading as="h3" size="md" mb={2}>
                  {step.title}
                </Heading>
                <Box>
                  <p>Your description goes here...</p>
                </Box>
              </Box>
            ))}
          </Grid>
          <Button colorScheme={"primary"}>Register as service provider</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default HowItWorks;
