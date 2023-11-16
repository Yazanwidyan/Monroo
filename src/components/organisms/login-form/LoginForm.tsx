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

type LoginFormProps = {
  handleSubmit(): Promise<void>;
};

export default function LoginForm(props: LoginFormProps) {
  const state = useLoginForm();

  return (
    <Container margin="auto">
      <Card>
        <CardHeader>
          <Heading as="h2" color="blackAlpha.700" fontSize="19px">
            Login
          </Heading>
        </CardHeader>
        <CardBody>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              name="username"
              placeholder="Enter username"
              value={state.login.username}
              onChange={state.handleLoginChange}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              placeholder="Enter password"
              value={state.login.password}
              onChange={state.handleLoginChange}
              required
            />
          </FormControl>
        </CardBody>
        <CardFooter display="flex" justifyContent="center">
          <Button colorScheme="telegram" onClick={props.handleSubmit}>
            Login
          </Button>
        </CardFooter>
      </Card>
    </Container>
  );
}
