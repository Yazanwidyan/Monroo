import { Box, Button, Flex, Link as ChakraLink } from "@chakra-ui/react";
import { useContext } from "react";
import { Outlet, Link as RouterLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";

const HomeLayout = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useContext(UserContext);
  const handleLogout = () => {
    if (user.isMainUser) {
      navigate("/login-user");
    } else {
      navigate("/login-provider");
    }
    updateUser("");
  };
  return (
    <Box>
      <Flex
        as="header"
        align="center"
        justify="space-between"
        padding="1rem"
        boxShadow="0 0 10px rgba(0, 0, 0, 0.1)"
        bg="primary.500"
        position="sticky"
        top="0"
        zIndex="sticky"
      >
        <ChakraLink
          as={RouterLink}
          to={user.isMainUser ? "/home" : "/timeline"}
          fontSize="xl"
          fontWeight="bold"
          textDecoration="none"
          _hover={{ textDecoration: "none" }}
        >
          Home
        </ChakraLink>
        <Flex align="center">
          {!user.isMainUser && (
            <ChakraLink
              as={RouterLink}
              to="/events"
              mx="1rem"
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
            >
              Booking
            </ChakraLink>
          )}
          <ChakraLink
            as={RouterLink}
            to="/inbox"
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
          >
            Inbox
          </ChakraLink>

          <ChakraLink
            mx="1rem"
            as={RouterLink}
            to={user.isMainUser ? "/user-profile" : "/service-provider-profile"}
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
          >
            Profile
          </ChakraLink>

          <ChakraLink
            mx="1rem"
            as={RouterLink}
            to={user.isMainUser ? "/payment" : "/payment"}
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
          >
            Payment
          </ChakraLink>

          <Button onClick={handleLogout} ml="1rem" colorScheme="red">
            Logout
          </Button>
        </Flex>
      </Flex>
      <Box as="main" p="4">
        <Outlet />
      </Box>
    </Box>
  );
};

export default HomeLayout;
