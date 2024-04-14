// import styles from "./RegisterServiceProviderForm.module.scss"
import {
    Box,
    Step as ChakraStep,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper as ChakraStepper,
    StepperProps as ChakraStepperProps,
    UseStepsReturn,
    Container,
} from '@chakra-ui/react';

type Step = { title: string; description: string };

interface StepperProps extends ChakraStepperProps {
    useStepReturn: UseStepsReturn;
    steps: Step[];
}

export default function Stepper({ steps, useStepReturn, ...props }: StepperProps) {
    return (
        <Container maxW={'5xl'}>
            <ChakraStepper colorScheme={'primary'} {...props} index={useStepReturn.activeStep - 1} {...props}>
                {steps.map((step, index) => (
                    <ChakraStep key={index}>
                        <StepIndicator>
                            <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
                        </StepIndicator>

                        <Box flexShrink="0">
                            <StepTitle>{step.title}</StepTitle>
                            <StepDescription>{step.description}</StepDescription>
                        </Box>

                        <StepSeparator />
                    </ChakraStep>
                ))}
            </ChakraStepper>
        </Container>
    );
}
