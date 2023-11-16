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

export default function RegisterUserPage() {
  const state = useRegisterUserPage();

  return (
    <Container>
      <Card>
        <CardHeader>
          <Heading as="h2" color="blackAlpha.700" fontSize="19px">
            Register
          </Heading>
        </CardHeader>
        <CardBody>
          <FormControl>
            <FormLabel>Who Are You ?</FormLabel>
            <Select
              value={state.userType}
              onChange={state.handleUserTypeChange}
            >
              <option value={UserTypes.Employer}>Employer</option>
              <option value={UserTypes.Employee}>Employee</option>
            </Select>
          </FormControl>
        </CardBody>
        <CardFooter margin="auto">
          <Button colorScheme="telegram" onClick={state.handleNextClick}>
            Next
          </Button>
        </CardFooter>
      </Card>
    </Container>
  );
}
