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
} from "@chakra-ui/react";
import useLoginForm from "./useLoginForm"; // Update this import path if needed
import { useTranslation } from "react-i18next";
import { LoginInput } from "../../../models/LoginInput";

export type LoginFormProps = {
  handleSubmit(loginInput: LoginInput): void;
};

export default function LoginForm(props: LoginFormProps) {
  const state = useLoginForm({ onSubmit: props.handleSubmit });
  const { t } = useTranslation();

  return (
    <Container>
      <Card margin="auto">
        <CardHeader as="section" textAlign="center">
          <Heading as="h2" color="blackAlpha.700" fontSize="19px">
            {t("login.login")}
          </Heading>
        </CardHeader>
        <CardBody as="section">
          <form onSubmit={state.handleSubmit}>
            <FormControl>
              <FormLabel> {t("login.username")}</FormLabel>
              <Input
                type="text"
                name="username"
                placeholder={t("login.enter_username")}
                value={state.login.username}
                onChange={state.handleLoginChange}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel> {t("login.password")}</FormLabel>
              <Input
                type="password"
                name="password"
                placeholder={t("login.enter_password")}
                value={state.login.password}
                onChange={state.handleLoginChange}
                required
              />
            </FormControl>
            <Button fontSize="14px" colorScheme="telegram" type="submit">
              {t("login.login")}
            </Button>
          </form>
        </CardBody>
      </Card>
    </Container>
  );
}
