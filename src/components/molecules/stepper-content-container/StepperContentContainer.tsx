import { ReactNode, useMemo } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Heading,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <Container maxWidth={props.currentStep === 1 ? "3xl" : "6xl"} margin="auto">
      <Box>
        <Box>{props.children}</Box>
        <Box mt={4} display="flex" justifyContent="space-between">
          <Button variant="ghost" onClick={props.handleBackClick}>
            {t("common.back")}
          </Button>
          {isLastStep ? (
            <Button colorScheme="primary" type="submit">
              {t("common.submit")}
            </Button>
          ) : (
            <Button colorScheme="primary" type="submit">
              {t("common.next")}
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
}
