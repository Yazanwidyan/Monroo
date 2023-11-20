import { useContext, useMemo } from "react";
import countryList from "../../../../constants/countries.json";
import musicalInstrumentsList from "../../../../constants/instruments.json";

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

  const countries: { name: string; code: string }[] = useMemo(
    () => countryList.filter((country) => country.code !== "IL"),
    []
  );

  const musicalInstruments: { name: string; id: number }[] = useMemo(
    () => musicalInstrumentsList,
    []
  );

  return {
    professionalInfo,
    handleProfessionalInfoChange,
    countries,
    musicalInstruments,
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
