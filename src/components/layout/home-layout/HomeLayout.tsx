import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { useContext } from "react";
import { Outlet, Link as RouterLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";

const HomeLayout = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  console.log("useruseruser", user);

  const handleLogout = () => {
    navigate("/login");
    console.log("Logged out!");
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
        <Link
          as={RouterLink}
          to={user.userType == "user" ? "/home" : "/timeline"}
          fontSize="xl"
          fontWeight="bold"
        >
          Home
        </Link>
        <Flex align="center">
          <Link as={RouterLink} to="/events" mx="1rem">
            Booking
          </Link>
          <Link as={RouterLink} to="/inbox">
            Inbox
          </Link>
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
