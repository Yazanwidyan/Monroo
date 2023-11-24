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
  InputRightElement,
  IconButton,
  InputGroup,
} from "@chakra-ui/react";
import useLoginForm from "./useLoginForm"; // Update this import path if needed
import { useTranslation } from "react-i18next";
import { LoginInput } from "../../../models/LoginInput";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import usePasswordVisibility from "../../../hooks/usePasswordVisibility";

export type LoginFormProps = {
  handleSubmit(loginInput: LoginInput): void;
};

export default function LoginForm(props: LoginFormProps) {
  const state = useLoginForm({ onSubmit: props.handleSubmit });
  const { pathname } = useLocation();
  const [passwordVisibility, togglePasswordVisibility] = usePasswordVisibility({
    password: false,
  });

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
              <FormLabel htmlFor="email">{t("login.username")}</FormLabel>
              <Input
                type="text"
                id="username"
                name="username"
                placeholder={t("login.enter_emailOrusername")}
                value={state.login.username}
                onChange={state.handleLoginChange}
                textTransform={"capitalize"}
                required
              />
            </FormControl>
            <FormControl marginBottom="4">
              <FormLabel htmlFor="password">{t("login.password")}</FormLabel>
              <InputGroup>
                <Input
                  type={passwordVisibility.password ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder={t("login.enter_password")}
                  value={state.login.password}
                  onChange={state.handleLoginChange}
                  textTransform={"capitalize"}
                  required
                />
                <InputRightElement width="2.8rem">
                  <IconButton
                    h="1.75rem"
                    size="sm"
                    onClick={() => togglePasswordVisibility("password")}
                    icon={
                      passwordVisibility.password ? (
                        <ViewOffIcon />
                      ) : (
                        <ViewIcon />
                      )
                    }
                    aria-label={
                      passwordVisibility.password
                        ? "Hide password"
                        : "Show password"
                    }
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button
              fontSize="md"
              colorScheme="primary"
              type="submit"
              width="full"
              textTransform="capitalize"
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
