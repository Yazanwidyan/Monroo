import {
  FormControl,
  FormLabel,
  Input,
  Card,
  CardBody,
  CardHeader,
  Button,
  Heading,
  Container,
  CardFooter,
  Box,
  Link as ChakraLink,
  Flex,
} from "@chakra-ui/react";
import useLoginForm from "./useLoginForm"; // Update this import path if needed
import { useTranslation } from "react-i18next";
import { LoginInput } from "../../../models/LoginInput";
import { Link as RouterLink, useLocation, useParams } from "react-router-dom";

export type LoginFormProps = {
  handleSubmit(loginInput: LoginInput): void;
};

export default function LoginForm(props: LoginFormProps) {
  const state = useLoginForm({ onSubmit: props.handleSubmit });
  const { pathname } = useLocation();

  const { t } = useTranslation();

  return (
    <Container maxW="sm" padding="4">
      <Card boxShadow="md">
        <CardHeader textAlign="center" bg="primary.500" py="4">
          <Heading as="h2" color="white" fontSize="xl">
            {pathname === "/login-user"
              ? t("login.login") + " " + "User"
              : t("login.login") + " " + "Provider"}
          </Heading>
        </CardHeader>
        <CardBody>
          <form onSubmit={state.handleSubmit}>
            <FormControl marginBottom="4">
              <FormLabel htmlFor="email">{t("login.email")}</FormLabel>
              <Input
                type="text"
                id="username"
                name="username"
                placeholder={t("login.enter_email")}
                value={state.login.username}
                onChange={state.handleLoginChange}
                required
              />
            </FormControl>
            <FormControl marginBottom="4">
              <FormLabel htmlFor="password">{t("login.password")}</FormLabel>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder={t("login.enter_password")}
                value={state.login.password}
                onChange={state.handleLoginChange}
                required
              />
            </FormControl>
            <Button
              fontSize="md"
              colorScheme="primary"
              type="submit"
              width="full"
            >
              {t("login.login")}
            </Button>
          </form>
        </CardBody>
        <CardFooter>
          <Flex width={"100%"} justifyContent={"space-between"}>
            <Box>
              <ChakraLink
                as={RouterLink}
                to="/register"
                href="/register"
                color="blue.500"
                textDecoration="none"
              >
                Register
              </ChakraLink>
            </Box>
            <Box>
              <ChakraLink
                as={RouterLink}
                to={
                  pathname === "/login-user" ? "/login-provider" : "/login-user"
                }
                href="/login-provider"
                color="blue.500"
                textDecoration="none"
              >
                {pathname === "/login-user" ? "Login provider" : "Login user"}
              </ChakraLink>
            </Box>
          </Flex>
        </CardFooter>
      </Card>
    </Container>
  );
}
