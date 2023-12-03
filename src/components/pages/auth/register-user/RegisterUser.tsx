import {
  Button,
  Box,
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
    <Box p={4} maxW="400px" mt={12} mx="auto">
      <FormControl>
        <FormLabel>{t("register.whoAreYou")}</FormLabel>
        <Select
          value={state.userType}
          onChange={state.handleUserTypeChange}
          mb={4}
        >
          <option value={UserTypes.User}>User</option>
          <option value={UserTypes.ServiceProvider}>Service provider</option>
        </Select>
      </FormControl>
      <Button
        colorScheme="primary"
        width="100%"
        onClick={state.handleNextClick}
      >
        {t("common.next")}
      </Button>
    </Box>
  );
}
