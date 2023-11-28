import React from "react";
import { Box, Flex, Text, Link, HStack } from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <Box as="footer" py="4" bg="black" color="white">
      <Flex
        maxW="6xl"
        mx="auto"
        px="4"
        justify="space-between"
        alignItems="center"
        flexDirection={{ base: "column", md: "row" }}
      >
        <Text fontWeight="bold" fontSize="lg" mb={{ base: "2", md: "0" }}>
          MONROO
        </Text>
        <HStack spacing="4" mt={{ base: "4", md: "0" }}>
          <Link href="#" fontSize="sm">
            FAQs
          </Link>
          <Link href="#" fontSize="sm">
            Privacy Policy
          </Link>
          <Link href="#" fontSize="sm">
            Terms & Conditions
          </Link>
          <Link href="#" fontSize="sm">
            Contact
          </Link>
        </HStack>
        <HStack spacing="4" mt={{ base: "4", md: "0" }}>
          <Link href="#" fontSize="xl">
            <FaFacebook />
          </Link>
          <Link href="#" fontSize="xl">
            <FaTwitter />
          </Link>
          <Link href="#" fontSize="xl">
            <FaInstagram />
          </Link>
        </HStack>
      </Flex>
      <Text textAlign="center" color="gray.500" fontSize="sm">
        © {new Date().getFullYear()} MONROO. All Rights Reserved
      </Text>
    </Box>
  );
};

export default Footer;
