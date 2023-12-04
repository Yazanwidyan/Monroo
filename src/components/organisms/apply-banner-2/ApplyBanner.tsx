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
      overflow="hidden"
      textAlign="center"
      bg={"white"}
    >
      <Box h="500px" overflow="hidden">
        <Image src={image} alt={title} objectFit="cover" w="100%" h="100%" />
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
      image: "src/assets/images/startcareer.jpg", // Updated image URL for Card 1
      title: "Embark on an exciting career as a service provider",
      points: [
        "Apply conveniently online and promptly receive feedback from our team",
        "Explore numerous rewarding job opportunities",
        "Effortlessly manage your online profile and showcase your services",
      ],
      buttonText: "Join as a Service Provider",
    },
    {
      image: "src/assets/images/findtealent.jpg", // Updated image URL for Card 2
      title: "Find the right service provider for your needs",
      points: [
        "Easily register and find skilled service providers online",
        "Book services directly through our platform",
        "Access a diverse range of service providers to meet your requirements",
      ],
      buttonText: "Find Service Providers Now",
    },
  ];

  return (
    <Box bg="primary.50" pt="4">
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
