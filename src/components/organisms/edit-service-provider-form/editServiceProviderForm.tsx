import { Flex } from '@chakra-ui/react';
import StepperContentContainer from '../../molecules/stepper-content-container/StepperContentContainer';
import Stepper from '../../molecules/stepper/Stepper';
import useEditServiceProviderForm from './useEditServiceProviderForm';
import EditServiceProviderCategories from '../../molecules/edit-service-provider/categories/EditServiceProviderCategories';
import EditServiceProviderPersonalInfo from '../../molecules/edit-service-provider/personal-info/EditServiceProviderPersonalInfo';
import EditServiceProviderProfessionalInfo from '../../molecules/edit-service-provider/professional-info/EditServiceProviderProfessionalInfo';

const OneStep = () => {
    return (
        <>
            <EditServiceProviderCategories />
            <EditServiceProviderPersonalInfo />
        </>
    );
};
export default function EditServiceProviderForm(props) {
    const state = useEditServiceProviderForm({
        handleSubmit: props.handleSubmit,
    });

    function renderContent() {
        const content = {
            [state.steps[0].title]: <OneStep />,
            [state.steps[1].title]: <EditServiceProviderProfessionalInfo />,
        };

        return content[state.steps[state.stepsState.activeStep - 1].title];
    }

    return (
        <Flex margin={8} paddingBottom="20px" flexDirection="column" gap={10}>
            <Stepper position="sticky" top={0} zIndex={1} paddingBlock="15px" backgroundColor="white" useStepReturn={state.stepsState} index={state.stepsState.activeStep - 1} steps={state.steps}>
                <></>
            </Stepper>
            <form onSubmit={state.handleSubmit}>
                <StepperContentContainer steps={state.steps.length} currentStep={state.stepsState.activeStep} handleNextClick={state.handleNextClick} handleBackClick={state.handleBackClick}>
                    {renderContent()}
                </StepperContentContainer>
            </form>
        </Flex>
    );
}
