import { useSteps } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const steps = [
  { title: "First Step", description: "Category" },
  { title: "Second Step", description: "Personal Info" },
  { title: "Third Step", description: "Professional Info" },
];

export default function useRegisterServiceProviderForm() {
  const stepsState = useSteps({
    index: 1,
    count: steps.length,
  });

  

  const navigate = useNavigate();


  function handleNextClick(): void {
    stepsState.goToNext();
  }

  function handleBackClick(): void {
    const isFirstStep = stepsState.activeStep === 1;

    if (isFirstStep) {
      navigate("/register");
      return;
    }

    stepsState.goToPrevious();
  }

  function handleSubmit(): void {
    navigate("/login", {replace: true});
  }

  return {
    stepsState,
    steps,
    handleNextClick,
    handleBackClick,
    handleSubmit,
  };
}
