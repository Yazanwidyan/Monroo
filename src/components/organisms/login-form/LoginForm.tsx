import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Container,
  Box,
  Link as ChakraLink,
  Flex,
  InputRightElement,
  IconButton,
  InputGroup,
} from "@chakra-ui/react";
import useLoginForm from "./useLoginForm";
import { useTranslation } from "react-i18next";
import { LoginInput } from "../../../models/LoginInput";
import { Link as RouterLink } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import usePasswordVisibility from "../../../hooks/usePasswordVisibility";

export type LoginFormProps = {
  handleSubmit(loginInput: LoginInput): void;
  onClose: () => void;
};

export default function LoginForm(props: LoginFormProps) {
  const state = useLoginForm({ onSubmit: props.handleSubmit });
  const { t } = useTranslation();
  const [passwordVisibility, togglePasswordVisibility] = usePasswordVisibility({
    password: false,
  });

  return (
    <Container maxW="md" p="4">
      <form onSubmit={state.handleSubmit}>
        <FormControl mb="4">
          <FormLabel htmlFor="email">{t("login.username")}</FormLabel>
          <Input
            type="text"
            id="username"
            name="username"
            placeholder={t("login.enter_emailOrusername")}
            value={state.login.username}
            onChange={state.handleLoginChange}
            variant="filled"
            borderRadius="md"
            required
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel htmlFor="password">{t("login.password")}</FormLabel>
          <InputGroup>
            <Input
              type={passwordVisibility.password ? "text" : "password"}
              id="password"
              name="password"
              placeholder={t("login.enter_password")}
              value={state.login.password}
              onChange={state.handleLoginChange}
              variant="filled"
              borderRadius="md"
              required
            />
            <InputRightElement width="3rem">
              <IconButton
                h="1.5rem"
                size="sm"
                onClick={() => togglePasswordVisibility("password")}
                icon={
                  passwordVisibility.password ? <ViewOffIcon /> : <ViewIcon />
                }
                aria-label={
                  passwordVisibility.password
                    ? "Hide password"
                    : "Show password"
                }
                variant="ghost"
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
          borderRadius="md"
        >
          {t("login.login")}
        </Button>
      </form>
      <Flex width="100%" justifyContent="center" mt="4">
        <ChakraLink
          onClick={props.onClose}
          as={RouterLink}
          to="/register"
          href="/register"
          color="primary.500"
          textDecoration="none"
          _hover={{ textDecoration: "underline" }}
        >
          {t("login.create_account")}
        </ChakraLink>
      </Flex>
    </Container>
  );
}
