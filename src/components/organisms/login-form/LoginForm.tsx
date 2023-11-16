import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import useLoginForm from "./useLoginForm";
import { useTranslation } from "react-i18next";

type LoginFormProps = {
  handleSubmit(): Promise<void>;
};

export default function LoginForm(props: LoginFormProps) {
  const state = useLoginForm();
  const { t } = useTranslation();

  return (
    <Container margin="auto">
      <Card>
        <CardHeader>
          <Heading as="h2" color="blackAlpha.700" fontSize="19px">
            {t("login.login")}
          </Heading>
        </CardHeader>
        <CardBody>
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
        </CardBody>
        <CardFooter display="flex" justifyContent="center">
          <Button colorScheme="telegram" onClick={props.handleSubmit}>
            {t("login.login")}
          </Button>
        </CardFooter>
      </Card>
    </Container>
  );
}
