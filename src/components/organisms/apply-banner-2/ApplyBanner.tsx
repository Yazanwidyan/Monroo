import {
  Flex,
  Box,
  Image,
  Heading,
  Text,
  Button,
  VStack,
  Container,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons"; // Make sure to import the CheckIcon from Chakra UI

const BigCard = ({ image, title, points, buttonText }) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"flex-start"}
      flex={1}
      borderWidth="1px"
      overflow="hidden"
      boxShadow="lg"
      textAlign="center"
      bg={"white"}
    >
      <Box h="500px" overflow="hidden">
        <Image src={image} alt={title} w="100%" h="100%" />
      </Box>
      <Box p="14">
        <Text fontWeight={"500"} fontSize="3xl" mb="10">
          {title}
        </Text>
        <VStack align="start" spacing="2" mb={10}>
          {points.map((point, index) => (
            <Flex
              mb={"5"}
              textAlign={"start"}
              fontSize={"sm"}
              key={index}
              justifyContent={"start"}
            >
              <CheckIcon color="primary.300" mr="2" />
              <Text fontSize={"sm"}>{point}</Text>
            </Flex>
          ))}
        </VStack>
        <Button variant={"outline"} colorScheme="primary.500" mt="4" mx="auto">
          {buttonText}
        </Button>
      </Box>
    </Box>
  );
};

const ApplyBanner = () => {
  const cardData = [
    {
      image: "https://via.placeholder.com/150", // Update image URL for Card 1
      title: "Start an exciting career as a model",
      points: [
        "Apply online & receive quick feedback from our scouting team",
        "Discover many exciting job opportunities",
        "Manage your online model profile and create your Comp Card",
      ],
      buttonText: "Become a Model Now",
    },
    {
      image: "https://via.placeholder.com/150", // Update image URL for Card 2
      title: "Find the right model for your job",
      points: [
        "Easy and fast online registration",
        "Book models for your jobs directly online",
        "Wide variety of models to meet diverse client needs",
      ],
      buttonText: "Find Models Now",
    },
  ];

  return (
    <Box bg="gray.200" pt="4">
      <Container maxW={"7xl"}>
        <Flex p={10} gap={"2rem"} justifyContent={"space-between"}>
          {cardData.map((card, index) => (
            <BigCard key={index} {...card} />
          ))}
        </Flex>
      </Container>
    </Box>
  );
};

export default ApplyBanner;
