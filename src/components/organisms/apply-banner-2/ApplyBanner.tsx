import {
  Flex,
  Box,
  Image,
  Text,
  Button,
  VStack,
  Container,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons"; // Make sure to import the CheckIcon from Chakra UI
import { useNavigate } from "react-router-dom";

const BigCard = ({ image, title, points, buttonText }) => {
  const navigate = useNavigate();

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"flex-start"}
      flex={1}
      overflow="hidden"
      textAlign="center"
      bg={"white"}
      borderRadius="lg"
      boxShadow="2xl"
      transition="transform 0.2s"
      _hover={{ transform: "scale(1.008)" }}
    >
      <Box h="300px" overflow="hidden">
        <Image src={image} alt={title} objectFit="cover" w="100%" h="100%" />
      </Box>
      <Box p="6">
        <Text fontWeight={"700"} fontSize="2xl" mb="6">
          {title}
        </Text>
        <VStack align="start" spacing="4" mb={8}>
          {points.map((point, index) => (
            <Flex
              key={index}
              textAlign={"start"}
              fontSize={"md"}
              align="center"
            >
              <CheckIcon color="primary.500" mr="2" />
              <Text>{point}</Text>
            </Flex>
          ))}
        </VStack>
        <Button
          onClick={() => navigate("register")}
          variant={"solid"}
          colorScheme="primary"
          mt="4"
          mx="auto"
          size="lg"
          borderRadius="full"
        >
          {buttonText}
        </Button>
      </Box>
    </Box>
  );
};

const ApplyBanner = () => {
  const cardData = [
    {
      image: "/assets/images/startcareer.jpg", // Updated image URL for Card 1
      title: "Monroo: Your Gateway to Creative Careers",
      points: [
        "Create Your Profile",
        "Set Your Rate",
        "Select Your Expertise",
        "Find Opportunities",
        "Get Hired",
      ],
      buttonText: "Join as a Star",
    },
    {
      image: "/assets/images/findtealent.jpg", // Updated image URL for Card 2
      title: "Access a World of Talent at Your Fingertips",
      points: [
        "Create Your Profile",
        "Post a Job",
        "Browse Talents",
        "Contact Directly",
        "Hire and Collaborate",
        "Complete Your Project",
      ],
      buttonText: "Find Star Now",
    },
  ];

  return (
    <Box bg="primary.50" pt="8" pb="8">
      <Container maxW={"7xl"}>
        <Text fontSize="3xl" fontWeight="bold" textAlign="center" mb="8">
          Discover Your Path with Monroo
        </Text>
        <Flex
          p={8}
          gap={"4rem"}
          justifyContent={"space-around"}
          flexWrap="wrap"
        >
          {cardData.map((card, index) => (
            <BigCard key={index} {...card} />
          ))}
        </Flex>
      </Container>
    </Box>
  );
};

export default ApplyBanner;
