import React from "react";
import {
  Box,
  Flex,
  Heading,
  Image,
  Grid,
  GridItem,
  Text,
  Center,
  useColorModeValue,
} from "@chakra-ui/react";

const categories = [
  { title: "Category 1", image: "https://via.placeholder.com/150" },
  { title: "Category 2", image: "https://via.placeholder.com/150" },
  { title: "Category 3", image: "https://via.placeholder.com/150" },
  // Add more categories as needed
];

const Landing = () => {
  const boxBgColor = useColorModeValue("gray.100", "gray.800");
  const boxHoverColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box>
      <Image
        src="https://via.placeholder.com/1200x300" // Replace with your image URL
        alt="Big Photo"
        objectFit="cover"
        w="100vw"
        h="calc(100vh - 50vh)" // Adjust this value to accommodate any header/navbar height
      />

      {/* Categories as boxes */}
      <Flex direction="column" maxW="6xl" mx="auto" my="8" px="4">
        <Heading size="xl" mb="4">
          Explore Categories
        </Heading>
        <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4}>
          {categories.map((category, index) => (
            <GridItem key={index}>
              <Center
                bg={boxBgColor}
                p="4"
                borderRadius="lg"
                boxShadow="md"
                transition="background 0.3s"
                _hover={{ bg: boxHoverColor }}
                cursor="pointer"
                onClick={() => {
                  // Handle category click
                }}
              >
                <Image
                  src={category.image}
                  alt={category.title}
                  maxW="50%"
                  mx={2}
                />
                <Text mt="3" fontWeight="semibold">
                  {category.title}
                </Text>
              </Center>
            </GridItem>
          ))}
        </Grid>
      </Flex>
    </Box>
  );
};

export default Landing;
