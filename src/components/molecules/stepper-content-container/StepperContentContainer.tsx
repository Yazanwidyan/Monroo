import { ReactNode, useMemo } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Heading,
} from "@chakra-ui/react";

type StepperContentContainerProps = {
  handleBackClick(): void;
  handleNextClick(): void;
  children: ReactNode;
  steps: number;
  currentStep: number;
};

export default function StepperContentContainer(
  props: StepperContentContainerProps
) {
  const isLastStep = useMemo(
    () => props.currentStep === props.steps,
    [props.currentStep, props.steps]
  );

  return (
    <Container maxWidth={props.currentStep === 1 ? "60%" : "80%"} margin="auto">
      <Card>
        <CardHeader>
          <Heading as="h2" color="blackAlpha.700" fontSize="19px">
            Register
          </Heading>
        </CardHeader>
        <CardBody>{props.children}</CardBody>
        <CardFooter display="flex" justifyContent="space-between">
          <Button variant="ghost" onClick={props.handleBackClick}>
            Back
          </Button>
          {isLastStep ? (
            <Button colorScheme="telegram" type="submit">
              Submit
            </Button>
          ) : (
            <Button colorScheme="telegram" type="submit">
              Next
            </Button>
          )}
        </CardFooter>
      </Card>
    </Container>
  );
}
