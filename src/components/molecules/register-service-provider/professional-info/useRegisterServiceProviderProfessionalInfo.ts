import { useContext, useMemo } from "react";
import countryList from "../../../../constants/countries.json";
import musicalInstrumentsList from "../../../../constants/instruments.json";
import musicGenresList from "../../../../constants/music_genres.json";
import educationList from "../../../../constants/education.json";
import visaTypeList from "../../../../constants/visa.json";

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
    demoReelFile,
    videosFile,
    audiosFile,
    audiosInputKey,
    oneMinuteVideoInputKey,
    demoReelInputKey,
    videosInputKey,
    onOneMinuteVideoChange,
    onDemoReelChange,
    onVideosChange,
    onAudiosChange,
    oneMinuteVideoError,
    demoReelError,
    audiosError,
    videosError,
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

  const musicGenres: { name: string; id: number }[] = useMemo(
    () => musicGenresList,
    []
  );

  const education: {
    name: string;
    nameAR: string;
    nameRUS: string;
    code: string;
  }[] = useMemo(() => educationList, []);

  const visaType: { name: string; id: number }[] = useMemo(
    () => visaTypeList,
    []
  );

  return {
    professionalInfo,
    handleProfessionalInfoChange,
    countries,
    musicalInstruments,
    musicGenres,
    education,
    visaType,
    resumeError,
    resumeFile,
    resumeInputKey,
    onResumeChange,
    oneMinuteVideoFile,
    demoReelFile,
    videosFile,
    audiosFile,
    oneMinuteVideoInputKey,
    demoReelInputKey,
    videosInputKey,
    audiosInputKey,
    onOneMinuteVideoChange,
    onDemoReelChange,
    onVideosChange,
    onAudiosChange,
    oneMinuteVideoError,
    demoReelError,
    videosError,
    audiosError,
    imageFiles,
    imagesInputKey,
    onImagesChange,
    imagesError,
    registerServiceProviderLookup,
  };
}
