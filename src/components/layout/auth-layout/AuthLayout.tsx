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
      <main>
        <Outlet />
      </main>
    </Flex>
  );
};

export default AuthLayout;
