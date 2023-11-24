// import styles from "./RegisterServiceProviderForm.module.scss"

import { Flex } from "@chakra-ui/react";
import StepperContentContainer from "../../molecules/stepper-content-container/StepperContentContainer";
import Stepper from "../../molecules/stepper/Stepper";
import useRegisterServiceProviderForm from "./useRegisterServiceProviderForm";
import RegisterServiceProviderCategories from "../../molecules/register-service-provider/categories/RegisterServiceProviderCategories";
import RegisterServiceProviderPersonalInfo from "../../molecules/register-service-provider/personal-info/RegisterServiceProviderPersonalInfo";
import RegisterServiceProviderProfessionalInfo from "../../molecules/register-service-provider/professional-info/RegisterServiceProviderProfessionalInfo";

export default function RegisterServiceProviderForm(props) {
  const state = useRegisterServiceProviderForm({
    handleSubmit: props.handleSubmit,
  });

  function renderContent() {
    const content = {
      [state.steps[0].title]: <RegisterServiceProviderCategories />,
      [state.steps[1].title]: <RegisterServiceProviderPersonalInfo />,
      [state.steps[2].title]: <RegisterServiceProviderProfessionalInfo />,
    };

    return content[state.steps[state.stepsState.activeStep - 1].title];
  }

  return (
    <Flex paddingBottom="20px" flexDirection="column" gap={100}>
      <Stepper
        position="sticky"
        top={0}
        zIndex={1}
        paddingBlock="15px"
        backgroundColor="white"
        useStepReturn={state.stepsState}
        index={state.stepsState.activeStep - 1}
        steps={state.steps}
      >
        <></>
      </Stepper>
      <form onSubmit={state.handleSubmit}>
        <StepperContentContainer
          steps={state.steps.length}
          currentStep={state.stepsState.activeStep}
          handleNextClick={state.handleNextClick}
          handleBackClick={state.handleBackClick}
        >
          {renderContent()}
        </StepperContentContainer>
      </form>
    </Flex>
  );
}
