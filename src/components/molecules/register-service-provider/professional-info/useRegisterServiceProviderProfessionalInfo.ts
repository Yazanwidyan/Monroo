import { useContext, useMemo } from "react";
import countryList from "react-select-country-list";

import { RegisterServiceProviderContext } from "../../../../contexts/RegisterServiceProviderContext";
import { LookupsContext } from "../../../../contexts/LookupsContext";

export default function useRegisterServiceProviderProfessionalInfo() {
  const {
    professionalInfo,
    handleProfessionalInfoChange,
    resumeError,
    resumeFile,
    resumeInputKey,
    onResumeChange,
    oneMinuteVideoFile,
    oneMinuteVideoInputKey,
    onOneMinuteVideoChange,
    oneMinuteVideoError,
    imageFiles,
    imagesInputKey,
    onImagesChange,
    imagesError,
  } = useContext(RegisterServiceProviderContext);

  const { registerServiceProviderLookup } = useContext(LookupsContext);

  const countries: { label: string; value: string }[] = useMemo(
    () =>
      countryList()
        .getData()
        .filter(
          (country: { label: string; value: string }) => country.value !== "IL"
        ),
    []
  );

  return {
    professionalInfo,
    handleProfessionalInfoChange,
    countries,
    resumeError,
    resumeFile,
    resumeInputKey,
    onResumeChange,
    oneMinuteVideoFile,
    oneMinuteVideoInputKey,
    onOneMinuteVideoChange,
    oneMinuteVideoError,
    imageFiles,
    imagesInputKey,
    onImagesChange,
    imagesError,
    registerServiceProviderLookup,
  };
}
