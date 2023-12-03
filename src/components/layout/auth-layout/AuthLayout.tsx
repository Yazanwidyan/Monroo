import React, { useState } from "react";
import {
  Flex,
  Box,
  Spacer,
  Link as ChakraLink,
  Button,
  Container,
} from "@chakra-ui/react";
import LanguageSwitcher from "../../../Localization/LanguageSwitcher";
import { Outlet, Link as RouterLink, useNavigate } from "react-router-dom";
import LoginModal from "../../organisms/login-modal/LoginModal";
import { AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai"; // Import Chakra Icons
import Footer from "../footer/Footer";

const AuthLayout = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <Flex minHeight="100vh" flexDirection="column">
      <Box boxShadow="base" bg="white.100" py="3" px="4">
        <Container maxW={"6xl"}>
          <Flex
            alignItems="center"
            fontSize="sm"
            fontWeight="bold"
            textTransform={"uppercase"}
            justifyContent={"space-between"}
          >
            <ChakraLink
              as={RouterLink}
              to={"/"}
              fontSize="lg"
              fontWeight="bold"
              color={"primary.500"}
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
            >
              Monroo
            </ChakraLink>
            <LanguageSwitcher />

            <Spacer />
            <ChakraLink
              mx={"1rem"}
              as={RouterLink}
              to={"/how-it-works"}
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
            >
              How it works
            </ChakraLink>
            <Button
              mx={"1rem"}
              onClick={() => navigate("register")}
              leftIcon={<AiOutlineUserAdd size={20} color={"primary.500"} />}
              variant="outline"
              fontSize={"small"}
              size={"sm"}
              fontWeight={500}
              borderColor="primary.500"
              color={"primary.500"}
              _hover={{
                bg: "primary.200",
                color: "primary.800",
                borderColor: "primary.500",
              }}
            >
              Join us
            </Button>
            <Button
              onClick={() => setLoginOpen(true)}
              leftIcon={<AiOutlineLogin size={20} color={"primary.500"} />}
              variant="outline"
              size={"sm"}
              fontWeight={500}
              fontSize={"small"}
              borderColor="primary.500"
              color={"primary.500"}
              _hover={{
                bg: "primary.200",
                color: "primary.800",
                borderColor: "primary.500",
              }}
            >
              Login
            </Button>
          </Flex>
        </Container>
      </Box>
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />

      <LoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} />
    </Flex>
  );
};

export default AuthLayout;
