import { Flex, Box, Link, Spacer } from "@chakra-ui/react";
import LanguageSwitcher from "../../../Localization/LanguageSwitcher";
import { Outlet, Link as RouterLink } from "react-router-dom";

const AuthLayout = () => {
  return (
    <Flex minHeight="100vh" flexDirection="column">
      <Box bg="primary.500" py="4" px="6">
        <Flex alignItems="center">
          <Link
            as={RouterLink}
            to={"login-user"}
            fontSize="xl"
            fontWeight="bold"
          >
            Monroo
          </Link>
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
