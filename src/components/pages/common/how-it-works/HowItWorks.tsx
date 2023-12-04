import {
  Box,
  Heading,
  Flex,
  Grid,
  Icon,
  Container,
  Button,
  Text,
  Slider,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
  Image,
} from "@chakra-ui/react";
import {
  FaRegEnvelope,
  FaRegUser,
  FaRegAddressCard,
  FaRegCreditCard,
  FaRegCheckCircle,
  FaChevronRight,
} from "react-icons/fa"; // Import icons from react-icons library
import VerticalSteps from "../../../organisms/vertical-steps/VerticalSteps";

const stepsData1 = [
  {
    title: "Step 1",
    desc: "philosophi quantumcumque quaedam iustitia proposita",
    icon: FaRegEnvelope,
  },
  {
    title: "Step 2",
    desc: "philosophi quantumcumque quaedam iustitia proposita",
    icon: FaRegUser,
  },
  {
    title: "Step 3",
    desc: "quantumcumque quaedam parabilis delectamur iniuria iactant philosophi quantumcumque quaedam iustitia proposita",
    icon: FaRegAddressCard,
  },
  {
    title: "Step 4",
    desc: "quantumcumque quaedam iustitia proposita Chrysippo parabilis delectamur iniuria iactant philosophi quantumcumque quaedam iustitia proposita",
    icon: FaRegCreditCard,
  },
];

const HeadingTitle = ({ title, desc }) => {
  return (
    <>
      <Heading as="h2" size="lg" mb="4">
        {title}
      </Heading>
      <Box
        fontWeight={300}
        fontSize={"sm"}
        maxWidth={800}
        margin={"auto"}
        textAlign={"center"}
        mb="20"
        mt={8}
        lineHeight={2}
      >
        <p>{desc}</p>
      </Box>
    </>
  );
};

const HowItWorks = () => {
  return (
    <Box bg="primary.50">
      <Container maxW={"7xl"}>
        <Box p="4">
          <Flex p={4} bg="white">
            <Box flex="1" p="12" pb={0}>
              <Text
                lineHeight={1}
                maxWidth={600}
                fontWeight="700"
                fontSize="7xl"
                mb="4"
              >
                How It Works?
              </Text>
              <Box
                textTransform={"uppercase"}
                fontSize={"sm"}
                color={"gray.500"}
                fontWeight={600}
                letterSpacing={2}
                mb={8}
              >
                <p>Learn about our easy proccess</p>
              </Box>
              <Box fontWeight={300} fontSize={"sm"}>
                <p>
                  Chrysippo parabilis delectamur iniuria iactant philosophi
                  quantumcumque quaedam iustitia proposita Chrysippo parabilis
                  delectamur iniuria iactant philosophi quantumcumque quaedam
                  iustitia proposita
                </p>
              </Box>
            </Box>

            <Box h="500px" overflow="hidden">
              <Image
                src={"src/assets/images/howitworks.jpg"}
                alt={"photo"}
                objectFit="cover"
                w="100%"
                h="100%"
              />
            </Box>
          </Flex>

          <Box textAlign={"center"} mt="20">
            <HeadingTitle
              title="Talents"
              desc="Chrysippo parabilis delectamur iniuria iactant philosophi
          quantumcumque quaedam iustitia proposita Chrysippo parabilis
          delectamur iniuria iactant philosophi quantumcumque quaedam iustitia
          proposita"
            />
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
                    <p>{step.desc}</p>
                  </Box>
                </Box>
              ))}
            </Grid>
            <Button colorScheme={"primary"}>
              Register as service provider
            </Button>
          </Box>
          <Box textAlign={"center"} mt="20">
            <HeadingTitle
              title="Business"
              desc="Chrysippo parabilis delectamur iniuria iactant philosophi
         quantumcumque quaedam iustitia proposita Chrysippo parabilis
         delectamur iniuria iactant philosophi quantumcumque quaedam iustitia
         proposita"
            />
            <VerticalSteps />
            <Button colorScheme={"primary"}>Register as user</Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HowItWorks;
