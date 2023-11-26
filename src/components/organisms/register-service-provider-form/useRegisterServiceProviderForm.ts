import { useSteps } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useRegisterServiceProviderProfessionalInfo from "../../molecules/register-service-provider/professional-info/useRegisterServiceProviderProfessionalInfo";
import useRegisterServiceProviderPersonalInfo from "../../molecules/register-service-provider/personal-info/useRegisterServiceProviderPersonalInfo";
import useRegisterServiceProviderCategories from "../../molecules/register-service-provider/categories/useRegisterServiceProviderCategories";
import { useContext } from "react";
import { LookupsContext } from "../../../contexts/LookupsContext";
import commonService from "../../../services/commonServices";
import useCustomToast from "../../../hooks/useCustomToast";

const steps = [
  { title: "First Step", description: "Category" },
  { title: "Second Step", description: "Personal Info" },
  { title: "Third Step", description: "Professional Info" },
];

export default function useRegisterServiceProviderForm(props) {
  const stepsState = useSteps({
    index: 1,
    count: steps.length,
  });

  const { updateRegisterServiceProviderLookup } = useContext(LookupsContext);

  const state1 = useRegisterServiceProviderCategories();
  const state2 = useRegisterServiceProviderPersonalInfo();
  const state3 = useRegisterServiceProviderProfessionalInfo();

  const { showToast } = useCustomToast();
  const navigate = useNavigate();

  async function handleNextClick(): Promise<void> {
    const payload = {
      catID: state1.selectedCategory.value,
      subCatID: state1.selectedSubCategories[0].value,
    };
    try {
      const res = await commonService.getProviderlookups(payload);
      updateRegisterServiceProviderLookup(res.data);
    } catch (error) {
      showToast(error, { status: "error" });
    }
  }

  function handleBackClick(): void {
    const isFirstStep = stepsState.activeStep === 1;

    if (isFirstStep) {
      navigate("/register");
      return;
    }

    stepsState.goToPrevious();
  }

  function handleSubmit(e): void {
    e.preventDefault();
    const isSecondStep = stepsState.activeStep === 2;
    isSecondStep && handleNextClick();
    stepsState.goToNext();
    stepsState.activeStep === 3 &&
      props.handleSubmit(
        state1.selectedCategory,
        state1.selectedSubCategories,
        state2.personalInfo,
        state3.professionalInfo,
        state3.resumeFile,
        state3.imageFiles,
        state3.oneMinuteVideoFile,
        state3.videosFile,
        state3.audiosFile
      );
  }

  return {
    stepsState,
    steps,
    handleNextClick,
    handleBackClick,
    handleSubmit,
  };
}
