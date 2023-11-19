import { useSteps } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useRegisterServiceProviderProfessionalInfo from "../../molecules/register-service-provider/professional-info/useRegisterServiceProviderProfessionalInfo";
import useRegisterServiceProviderPersonalInfo from "../../molecules/register-service-provider/personal-info/useRegisterServiceProviderPersonalInfo";
import useRegisterServiceProviderCategories from "../../molecules/register-service-provider/categories/useRegisterServiceProviderCategories";
import { useContext } from "react";
import { LookupsContext } from "../../../contexts/LookupsContext";

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

  // console.log(state1, state2, state3);

  const navigate = useNavigate();

  function handleNextClick(): void {
    stepsState.goToNext();
    const updatedLookup = {
      fname: true,
      lname: true,
      gender: true,
      isActive: true,
      username: true,
      password: true,
      registerDate: true,
      phone: true,
      email: true,
      dob: true,
      nationality: true,
      education: true,
      averageRatePerHour: true,
      openToWorkInCountry: true,
      countryOfResidence: true,
      spokenLanguage: true,
      experience: true,
      visaType: true,
      instagram: true,
      photos: true,
      introductionVideoLink: true,
      youtubeLink: true,
      videos: true,
      bio: true,
      workLink: true,
      linkedin: true,
      height: false,
      weight: false,
      resume: true,
      portfolio: true,
      isAmodel: true,
      oneMinuteVideo: true,
      audios: true,
      musicalInstruments: true,
      musicGenres: true,
      specialSkills: true,
      demoReel: true,
      token: true,
      fcmToken: true,
    };
    updateRegisterServiceProviderLookup(updatedLookup);
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
    props.handleSubmit(
      state1.selectedCategory,
      state2.personalInfo,
      state3.professionalInfo
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
