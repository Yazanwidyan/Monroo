import React, { useContext } from "react";
import {
  Flex,
  Box,
  Link as ChakraLink,
  Button,
  Container,
} from "@chakra-ui/react";
import { Outlet, Link as RouterLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";
import Footer from "../footer/Footer";
import { FaSignOutAlt } from "react-icons/fa";

const HomeLayout = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useContext(UserContext);
  const handleLogout = () => {
    navigate("/");
    updateUser("");
  };

  return (
    <Flex minHeight="100vh" flexDirection="column">
      <Box bg="gray.800" py="3" px="4">
        <Container maxW="8xl">
          <Flex
            alignItems="center"
            fontSize="sm"
            fontWeight="bold"
            textTransform={"uppercase"}
            justifyContent={"space-between"}
          >
            <ChakraLink
              as={RouterLink}
              to={user.isMainUser ? "/home" : "/timeline"}
              fontSize="lg"
              fontWeight="bold"
              color={"primary.500"}
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
              mr="4"
            >
              Monroo
            </ChakraLink>
            <Flex color={"white"} align="center">
              {!user.isMainUser && (
                <ChakraLink
                  as={RouterLink}
                  to="/events"
                  mx="0.5rem"
                  textDecoration="none"
                  _hover={{ textDecoration: "none" }}
                >
                  Booking
                </ChakraLink>
              )}
              <ChakraLink
                as={RouterLink}
                to="/inbox"
                mx="0.5rem"
                textDecoration="none"
                _hover={{ textDecoration: "none" }}
              >
                Inbox
              </ChakraLink>
              <ChakraLink
                as={RouterLink}
                to={
                  user.isMainUser
                    ? "/user-profile"
                    : "/service-provider-profile"
                }
                mx="0.5rem"
                textDecoration="none"
                _hover={{ textDecoration: "none" }}
              >
                Profile
              </ChakraLink>
              <ChakraLink
                as={RouterLink}
                to={user.isMainUser ? "/payment" : "/payment"}
                mx="0.5rem"
                textDecoration="none"
                _hover={{ textDecoration: "none" }}
              >
                Payment
              </ChakraLink>
              <Button
                onClick={handleLogout}
                mx="0.5rem"
                colorScheme="white"
                size="sm"
                variant={"ghost"}
                leftIcon={<FaSignOutAlt />}
              ></Button>
            </Flex>
          </Flex>
        </Container>
      </Box>
      <main style={{ flex: 1, padding: "1rem" }}>
        <Outlet />
      </main>
      <Footer />
    </Flex>
  );
};

export default HomeLayout;
