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
};

export default function LoginForm(props: LoginFormProps) {
  const state = useLoginForm({ onSubmit: props.handleSubmit });
  const { t } = useTranslation();
  const [passwordVisibility, togglePasswordVisibility] = usePasswordVisibility({
    password: false,
  });

  return (
    <Container maxW="sm" padding="4">
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
              required
            />
            <InputRightElement width="2.8rem">
              <IconButton
                h="1.75rem"
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
      <Flex width={"100%"} justifyContent={"space-between"}>
        <Box>
          <ChakraLink
            as={RouterLink}
            to="/register"
            href="/register"
            color="primary.500"
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
          >
            {t("login.create_account")}
          </ChakraLink>
        </Box>
      </Flex>
    </Container>
  );
}
