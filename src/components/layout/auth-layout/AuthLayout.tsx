import { Flex, Box, Spacer, Link as ChakraLink } from "@chakra-ui/react";
import LanguageSwitcher from "../../../Localization/LanguageSwitcher";
import { Outlet, Link as RouterLink } from "react-router-dom";

const AuthLayout = () => {
  return (
    <Flex minHeight="100vh" flexDirection="column">
      <Box bg="primary.500" py="4" px="6">
        <Flex alignItems="center">
          <ChakraLink
            as={RouterLink}
            to={"login-user"}
            fontSize="xl"
            fontWeight="bold"
            color={"white"}
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
          >
            Monroo
          </ChakraLink>
          <Spacer />
          <LanguageSwitcher />
        </Flex>
      </Box>
      <main style={{ padding: "16px" }}>
        <Outlet />
      </main>
    </Flex>
  );
};

export default AuthLayout;
