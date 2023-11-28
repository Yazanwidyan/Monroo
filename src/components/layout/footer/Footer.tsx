import React from "react";
import {
  Box,
  Flex,
  Text,
  Divider,
  Link,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <Box color={"white"} as="footer" py="8" mt={8} bg="black">
      <Box maxW="8xl" mx="auto" px="4">
        <Text
          color={"white"}
          textAlign="left"
          mb="4"
          fontWeight="bold"
          fontSize={"x-large"}
        >
          MONROO
        </Text>
        <Flex justify="space-between" flexWrap="wrap" mb="4">
          <HStack spacing="4" mb="4">
            <IconButton
              aria-label="Facebook"
              icon={<FaFacebook />}
              variant="ghost"
              fontSize="20px"
              color="gray.500"
            />
            <IconButton
              aria-label="Twitter"
              icon={<FaTwitter />}
              variant="ghost"
              fontSize="20px"
              color="gray.500"
            />
            <IconButton
              aria-label="Instagram"
              icon={<FaInstagram />}
              variant="ghost"
              fontSize="20px"
              color="gray.500"
            />
          </HStack>
          <Flex gap={4} mt={2}>
            <Link href="#">FAQs</Link>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms & Conditions</Link>
            <Link href="#">Contact</Link>
          </Flex>
        </Flex>
        <Text textAlign="left" color="gray.500">
          © {new Date().getFullYear()} All Rights Reserved
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;
