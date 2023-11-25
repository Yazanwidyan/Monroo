import { createContext, useContext, useMemo, useState } from "react";

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
  selectedSubCategories: MultiSelectOption[];
  filteredSubCategories: SubCategory[];
  handleCategoryChange(selectedCategories: MultiSelectOption): void;
  handleSubCategoriesChange(selectedCategories: MultiSelectOption[]): void;
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
  onResumeChange(e?: React.ChangeEvent<HTMLInputElement>): void;
  resumeError: string;
  resumeFile: File[];
  oneMinuteVideoInputKey: number;
  videosInputKey: number;
  audiosInputKey: number;
  onOneMinuteVideoChange(e?: React.ChangeEvent<HTMLInputElement>): void;
  onVideosChange(e?: React.ChangeEvent<HTMLInputElement>): void;
  onAudiosChange(e?: React.ChangeEvent<HTMLInputElement>): void;
  videosError: string;
  audiosError: string;
  oneMinuteVideoError: string;
  oneMinuteVideoFile: File[];
  videosFile: File[];
  audiosFile: File[];
  imagesInputKey: number;
  onImagesChange(e?: React.ChangeEvent<HTMLInputElement>): void;
  imagesError: string;
  imageFiles: File[];
};

const PERSONAL_INFO_DEFAULT_VALUE: RegisterServiceProviderPersonalInfo = {
  fname: "",
  lname: "",
  gender: "0",
  username: "",
  password: "",
  confirmPassword: "",
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
  selectedSubCategories: [],
  filteredSubCategories: [],
  handleCategoryChange: () => {},
  handleSubCategoriesChange: () => {},
  handlePersonalInfoChange: () => {},
  handleProfessionalInfoChange: () => {},
  resumeError: "",
  onResumeChange: () => {},
  resumeInputKey: 0,
  resumeFile: [],
  oneMinuteVideoInputKey: 0,
  videosInputKey: 0,
  audiosInputKey: 0,
  onOneMinuteVideoChange: () => {},
  onVideosChange: () => {},
  onAudiosChange: () => {},
  oneMinuteVideoError: "",
  videosError: "",
  audiosError: "",
  oneMinuteVideoFile: [],
  videosFile: [],
  audiosFile: [],
  imagesInputKey: 0,
  onImagesChange: () => {},
  imagesError: "",
  imageFiles: [],
};

export const RegisterServiceProviderContext =
  createContext<ContextProps>(DEFAULT_VALUE);

export default function RegisterServiceProviderContextProvider({ children }) {
  const { subCategories } = useContext(LookupsContext);

  //#region Categories Selection

  const [selectedCategory, setSelectedCategory] = useState<MultiSelectOption>();
  const [selectedSubCategories, setSelectedSubCategories] = useState<
    MultiSelectOption[]
  >([]);

  const filteredSubCategories = useMemo(() => {
    return subCategories.filter(
      (subCategory) => subCategory.categoryId === selectedCategory?.value
    );
  }, [selectedCategory, subCategories]);

  function handleCategoryChange(selectedCategory: MultiSelectOption): void {
    setSelectedCategory(selectedCategory);
    setSelectedSubCategories([]);
  }

  function handleSubCategoriesChange(
    selectedSubCategories: MultiSelectOption[]
  ): void {
    setSelectedSubCategories(selectedSubCategories);
  }

  //#endregion

  //#region Personal Info

  const [personalInfo, , handlePersonalInfoChange] =
    useFormFields<RegisterServiceProviderPersonalInfo>(
      PERSONAL_INFO_DEFAULT_VALUE
    );

  //#endregion

  //#region Professional Info

  const [professionalInfo, , handleProfessionalInfoChange] =
    useFormFields<RegisterServiceProviderProfessionalInfo>(
      PROFESSIONAL_INFO_DEFAULT_VALUE
    );

  const [resumeFile, resumeInputKey, onResumeChange, resumeError] =
    useFileInput({
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
    <RegisterServiceProviderContext.Provider
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
        oneMinuteVideoFile,
        videosFile,
        audiosFile,
        oneMinuteVideoInputKey,
        videosInputKey,
        audiosInputKey,
        onOneMinuteVideoChange,
        onVideosChange,
        onAudiosChange,
        oneMinuteVideoError,
        videosError,
        audiosError,
        imageFiles,
        imagesInputKey,
        onImagesChange,
        imagesError,
      }}
    >
      {children}
    </RegisterServiceProviderContext.Provider>
  );
}
