import { Flex, Box, Center, Heading, Spacer } from "@chakra-ui/react";
import LanguageSwitcher from "../../../Localization/LanguageSwitcher";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <Flex minHeight="100vh" flexDirection="column">
      <Box bg="primary.500" py="4" px="6">
        <Flex alignItems="center">
          <Heading as="h1" fontSize="xl" color="white">
            Monroo
          </Heading>
          <Spacer />
          <LanguageSwitcher />
        </Flex>
      </Box>
      <Flex flex="1" justifyContent="center" alignItems="center" bg="gray.100">
        <Box
          maxW="md"
          w="100%"
          p="6"
          borderRadius="lg"
          boxShadow="lg"
          bg="white"
        >
          <Box as="main" p="4">
            <Center>
              {/* You can place your content here */}
              <Outlet />
            </Center>
          </Box>
        </Box>
      </Flex>
      {/* You can add a footer here if needed */}
    </Flex>
  );
};

export default AuthLayout;
