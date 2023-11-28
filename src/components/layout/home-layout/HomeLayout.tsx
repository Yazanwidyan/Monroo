import React, { useContext, useState } from "react";
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
import CreateEventPage from "../../pages/user/create-event/CreateEvent";

const HomeLayout = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useContext(UserContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleLogout = () => {
    navigate("/");
    updateUser("");
  };

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <Flex minHeight="100vh" flexDirection="column">
      <Box boxShadow="base" bg="white.100" py="3" px="4">
        <Container maxW="6xl">
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
            <Flex color={"black"} align="center">
              {user.isMainUser && (
                <>
                  <Button
                    mx="0.5rem"
                    colorScheme="black"
                    size="sm"
                    textTransform={"uppercase"}
                    variant={"outline"}
                    onClick={openDialog}
                  >
                    Create Event
                  </Button>
                </>
              )}
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
                colorScheme="black"
                size="sm"
                variant={"ghost"}
                leftIcon={<FaSignOutAlt />}
              ></Button>
            </Flex>
          </Flex>
          <CreateEventPage isOpen={isDialogOpen} onClose={closeDialog} />
        </Container>
      </Box>
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </Flex>
  );
};

export default HomeLayout;
