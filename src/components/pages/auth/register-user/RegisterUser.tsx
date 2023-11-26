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
  Select,
} from "@chakra-ui/react";

import { UserTypes } from "../../../../models/UserTypes";
import useRegisterUserPage from "./useRegisterUser";
import { useTranslation } from "react-i18next";

export default function RegisterUserPage() {
  const state = useRegisterUserPage();
  const { t } = useTranslation();

  return (
    <Container>
      <Card>
        <CardBody>
          <FormControl>
            <FormLabel>{t("register.whoAreYou")}</FormLabel>
            <Select
              value={state.userType}
              onChange={state.handleUserTypeChange}
            >
              <option value={UserTypes.User}>User</option>
              <option value={UserTypes.ServiceProvider}>
                Service provider
              </option>
            </Select>
          </FormControl>
        </CardBody>
        <CardFooter margin="auto">
          <Button colorScheme="primary" onClick={state.handleNextClick}>
            {t("common.next")}
          </Button>
        </CardFooter>
      </Card>
    </Container>
  );
}
