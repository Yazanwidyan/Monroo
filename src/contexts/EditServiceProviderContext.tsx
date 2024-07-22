import { createContext, useContext, useMemo, useState, useEffect } from "react";

import {
  RegisterServiceProviderPersonalInfo,
  RegisterServiceProviderProfessionalInfo,
} from "../models/RegisterServiceProvider";
import { MultiSelectOption } from "../components/molecules/register-service-provider/categories/useRegisterServiceProviderCategories";
import { LookupsContext } from "./LookupsContext";
import { SubCategory } from "../models/Category";
import useFormFields from "../hooks/useFormFields";
import { useFileInput } from "../hooks/useFileInput";

type ContextProps = {
  personalInfo: RegisterServiceProviderPersonalInfo;
  professionalInfo: RegisterServiceProviderProfessionalInfo;
  selectedCategory: MultiSelectOption;
  selectedSubCategories: MultiSelectOption;
  filteredSubCategories: SubCategory[];
  handleCategoryChange(selectedCategories: MultiSelectOption): void;
  handleSubCategoriesChange(selectedCategories: MultiSelectOption): void;
  handlePersonalInfoChange: (
    e?: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    fieldName?: string,
    value?: string
  ) => void;
  handleProfessionalInfoChange: (
    e?: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    fieldName?: string,
    value?: string
  ) => void;
  resumeInputKey: number;
  picInputKey: number;
  onResumeChange(
    e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>
  ): void;
  onPicChange(
    e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>
  ): void;
  resumeError: string;
  picError: string;
  resumeFile: File[];
  picFile: File[];
  oneMinuteVideoInputKey: number;
  demoReelInputKey: number;
  portfolioInputKey: number;
  videosInputKey: number;
  audiosInputKey: number;
  onOneMinuteVideoChange(
    e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>
  ): void;
  onDemoReelChange(
    e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>
  ): void;
  onPortfolioChange(
    e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>
  ): void;
  onVideosChange(
    e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>
  ): void;
  onAudiosChange(
    e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>
  ): void;
  videosError: string;
  audiosError: string;
  demoReelError: string;
  portfolioError: string;
  oneMinuteVideoError: string;
  oneMinuteVideoFile: File[];
  demoReelFile: File[];
  portfolioFile: File[];
  videosFile: File[];
  audiosFile: File[];
  imagesInputKey: number;
  onImagesChange(
    e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>
  ): void;
  imagesError: string;
  imageFiles: File[];
};

const PERSONAL_INFO_DEFAULT_VALUE: RegisterServiceProviderPersonalInfo = {
  fname: "",
  lname: "",
  gender: 0,
  username: "",
  nationality: "",
  dob: "",
};

const PROFESSIONAL_INFO_DEFAULT_VALUE: RegisterServiceProviderProfessionalInfo =
  {
    email: "",
    phone: "",
    education: "",
    averageRatePerHour: 0,
    openToWorkInCountry: "",
    countryOfResidence: "",
    spokenLanguage: "",
    experience: 0,
    visaType: "",
    instagram: "",
    photos: "",
    youtubeLink: "",
    bio: "",
    linkedin: "",
    workLink: "",
    height: 0,
    weight: 0,
    resume: "",
    portfolio: "",
    isAmodel: false,
    musicalInstruments: "",
    musicGenres: "",
    specialSkills: "",
    audios: "",
    demoReel: "",
    introductionVideoLink: "",
    oneMinuteVideo: "",
  };

const DEFAULT_VALUE: ContextProps = {
  personalInfo: PERSONAL_INFO_DEFAULT_VALUE,
  professionalInfo: PROFESSIONAL_INFO_DEFAULT_VALUE,
  selectedCategory: null,
  selectedSubCategories: null,
  filteredSubCategories: [],
  handleCategoryChange: () => {},
  handleSubCategoriesChange: () => {},
  handlePersonalInfoChange: () => {},
  handleProfessionalInfoChange: () => {},
  onResumeChange: () => {},
  resumeInputKey: 0,
  resumeFile: [],
  resumeError: "",
  onPicChange: () => {},
  picError: "",
  picInputKey: 0,
  picFile: [],
  oneMinuteVideoInputKey: 0,
  demoReelInputKey: 0,
  portfolioInputKey: 0,
  videosInputKey: 0,
  audiosInputKey: 0,
  onOneMinuteVideoChange: () => {},
  onDemoReelChange: () => {},
  onPortfolioChange: () => {},
  onVideosChange: () => {},
  onAudiosChange: () => {},
  oneMinuteVideoError: "",
  demoReelError: "",
  portfolioError: "",
  videosError: "",
  audiosError: "",
  oneMinuteVideoFile: [],
  demoReelFile: [],
  portfolioFile: [],
  videosFile: [],
  audiosFile: [],
  imagesInputKey: 0,
  onImagesChange: () => {},
  imagesError: "",
  imageFiles: [],
};

export const EditServiceProviderContext =
  createContext<ContextProps>(DEFAULT_VALUE);

export default function EditServiceProviderContextProvider({
  providerProfile,
  children,
}) {
  const { categories, subCategories } = useContext(LookupsContext);

  console.log("providerProfile", providerProfile);

  //#region Categories Selection

  const [selectedCategory, setSelectedCategory] = useState<MultiSelectOption>();
  const [selectedSubCategories, setSelectedSubCategories] = useState<any>();

  const filteredSubCategories = useMemo(() => {
    return subCategories.filter(
      (subCategory) => subCategory.categoryId === selectedCategory?.value
    );
  }, [selectedCategory, subCategories]);

  function handleCategoryChange(selectedCategory: MultiSelectOption): void {
    setSelectedCategory(selectedCategory);
    setSelectedSubCategories(null);
  }

  function handleSubCategoriesChange(
    selectedSubCategories: MultiSelectOption
  ): void {
    console.log("selectedSubCategories", selectedSubCategories);

    setSelectedSubCategories(selectedSubCategories);
  }

  //#endregion

  //#region Personal Info

  const [personalInfo, setPersonalInfo, handlePersonalInfoChange] =
    useFormFields<RegisterServiceProviderPersonalInfo>(
      PERSONAL_INFO_DEFAULT_VALUE
    );
  const [professionalInfo, setProfessionalInfo, handleProfessionalInfoChange] =
    useFormFields<RegisterServiceProviderProfessionalInfo>(
      PROFESSIONAL_INFO_DEFAULT_VALUE
    );

  useEffect(() => {
    if (providerProfile) {
      const selectedCatID = categories.find(
        (category) => category.id === providerProfile.catID
      );

      setSelectedCategory({
        catID: providerProfile.catID,
        label: selectedCatID.name,
        value: providerProfile.catID,
      });
      setSelectedSubCategories({
        catID: providerProfile.subCatID[0].catID,
        label: providerProfile.subCatID[0].name,
        value: providerProfile.subCatID[0].id,
        id: providerProfile.subCatID[0].id,
        name: providerProfile.subCatID[0].name,
        nameAR: providerProfile.subCatID[0].nameAR,
        nameRUS: providerProfile.subCatID[0].nameRUS,
      });

      const unixTimestamp = providerProfile.dob;
      const dobDate = new Date(unixTimestamp * 1000);
      const formattedDob = dobDate.toISOString().slice(0, 10);

      setPersonalInfo((prevPersonalInfo) => ({
        ...prevPersonalInfo,
        fname: providerProfile.fname || "",
        lname: providerProfile.lname || "",
        gender: providerProfile.gender || 0,
        username: providerProfile.username || "",
        nationality: providerProfile.nationality || "",
        dob: formattedDob || "",
      }));
      setProfessionalInfo((prevProfessionalInfo) => ({
        ...prevProfessionalInfo,
        email: providerProfile.email || "",
        phone: providerProfile.phone || "",
        education: providerProfile.education || "",
        averageRatePerHour: providerProfile.averageRatePerHour || 0,
        openToWorkInCountry: providerProfile.openToWorkInCountry || "",
        countryOfResidence: providerProfile.countryOfResidence || "",
        spokenLanguage: providerProfile.spokenLanguage || "",
        experience: providerProfile.experience || 0,
        visaType: providerProfile.visaType || "",
        instagram: providerProfile.instagram || "",
        photos: providerProfile.photos || "",
        youtubeLink: providerProfile.youtubeLink || "",
        bio: providerProfile.bio || "",
        linkedin: providerProfile.linkedin || "",
        workLink: providerProfile.workLink || "",
        height: providerProfile.height || 0,
        weight: providerProfile.weight || 0,
        resume: providerProfile.resume || "",
        portfolio: providerProfile.portfolio || "",
        isAmodel: providerProfile.isAmodel || false,
        musicalInstruments: providerProfile.musicalInstruments || "",
        musicGenres: providerProfile.musicGenres || "",
        specialSkills: providerProfile.specialSkills || "",
        audios: providerProfile.audios || "",
        demoReel: providerProfile.demoReel || "",
        introductionVideoLink: providerProfile.introductionVideoLink || "",
        oneMinuteVideo: providerProfile.oneMinuteVideo || "",
      }));
    }
  }, [providerProfile, setPersonalInfo]);

  //#endregion

  //#region Professional Info

  const [resumeFile, resumeInputKey, onResumeChange, resumeError] =
    useFileInput({
      maxFileSizeKB: 1024,
      maxFileCount: 1,
    });

  const [picFile, picInputKey, onPicChange, picError] = useFileInput({
    maxFileSizeKB: 1024,
    maxFileCount: 1,
  });

  const [
    oneMinuteVideoFile,
    oneMinuteVideoInputKey,
    onOneMinuteVideoChange,
    oneMinuteVideoError,
  ] = useFileInput({
    maxFileSizeKB: 10240,
    maxFileCount: 1,
  });

  const [portfolioFile, portfolioInputKey, onPortfolioChange, portfolioError] =
    useFileInput({
      maxFileSizeKB: 10240,
      maxFileCount: 1,
    });

  const [demoReelFile, demoReelInputKey, onDemoReelChange, demoReelError] =
    useFileInput({
      maxFileSizeKB: 10240,
      maxFileCount: 1,
    });

  const [videosFile, videosInputKey, onVideosChange, videosError] =
    useFileInput({
      maxFileSizeKB: 10240,
      maxFileCount: 2,
    });

  const [audiosFile, audiosInputKey, onAudiosChange, audiosError] =
    useFileInput({
      maxFileSizeKB: 10240,
      maxFileCount: 2,
    });

  const [imageFiles, imagesInputKey, onImagesChange, imagesError] =
    useFileInput({
      maxFileSizeKB: 5120,
      maxFileCount: 4,
    });

  // const [resumeFile, resumeInputKey, onResumeChange, resumeError] =
  // useFileInput({
  //   maxFileSizeKB: 1024,
  //   maxFileCount: 1,
  // });

  //#endregion

  return (
    <EditServiceProviderContext.Provider
      value={{
        ...DEFAULT_VALUE,
        selectedCategory,
        selectedSubCategories,
        filteredSubCategories,
        handleCategoryChange,
        handleSubCategoriesChange,
        handlePersonalInfoChange,
        personalInfo,
        professionalInfo,
        handleProfessionalInfoChange,
        resumeFile,
        resumeInputKey,
        onResumeChange,
        resumeError,
        picFile,
        picInputKey,
        onPicChange,
        picError,
        oneMinuteVideoFile,
        demoReelFile,
        portfolioFile,
        videosFile,
        audiosFile,
        oneMinuteVideoInputKey,
        demoReelInputKey,
        portfolioInputKey,
        videosInputKey,
        audiosInputKey,
        onOneMinuteVideoChange,
        onDemoReelChange,
        onPortfolioChange,
        onVideosChange,
        onAudiosChange,
        oneMinuteVideoError,
        demoReelError,
        portfolioError,
        videosError,
        audiosError,
        imageFiles,
        imagesInputKey,
        onImagesChange,
        imagesError,
      }}
    >
      {children}
    </EditServiceProviderContext.Provider>
  );
}
