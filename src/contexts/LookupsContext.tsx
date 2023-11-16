import { createContext, useMemo } from "react";

import { Category, SubCategory } from "../models/Category";
import { RegisterServiceProviderLookup } from "../models/RegisterServiceProvider";

const CATEGORIES: Category[] = [
  {
    id: "1",
    name: "Category 1",
    subCategories: [
      {
        id: crypto.randomUUID().toString(),
        name: "Sub-Category 11",
        categoryId: "1",
      },
      {
        id: crypto.randomUUID().toString(),
        name: "Sub-Category 12",
        categoryId: "1",
      },
      {
        id: crypto.randomUUID().toString(),
        name: "Sub-Category 13",
        categoryId: "1",
      },
    ],
  },
  {
    id: "2",
    name: "Category 2",
    subCategories: [
      {
        id: crypto.randomUUID().toString(),
        name: "Sub-Category 21",
        categoryId: "2",
      },
      {
        id: crypto.randomUUID().toString(),
        name: "Sub-Category 22",
        categoryId: "2",
      },
      {
        id: crypto.randomUUID().toString(),
        name: "Sub-Category 23",
        categoryId: "2",
      },
    ],
  },
  {
    id: "3",
    name: "Category 3",
    subCategories: [
      {
        id: crypto.randomUUID().toString(),
        name: "Sub-Category 31",
        categoryId: "3",
      },
      {
        id: crypto.randomUUID().toString(),
        name: "Sub-Category 32",
        categoryId: "3",
      },
      {
        id: crypto.randomUUID().toString(),
        name: "Sub-Category 33",
        categoryId: "3",
      },
    ],
  },
  {
    id: "4",
    name: "Category 4",
    subCategories: [
      {
        id: crypto.randomUUID().toString(),
        name: "Sub-Category 41",
        categoryId: "4",
      },
      {
        id: crypto.randomUUID().toString(),
        name: "Sub-Category 42",
        categoryId: "4",
      },
      {
        id: crypto.randomUUID().toString(),
        name: "Sub-Category 43",
        categoryId: "4",
      },
    ],
  },
  {
    id: "5",
    name: "Category 5",
    subCategories: [
      {
        id: crypto.randomUUID().toString(),
        name: "Sub-Category 51",
        categoryId: "5",
      },
      {
        id: crypto.randomUUID().toString(),
        name: "Sub-Category 52",
        categoryId: "5",
      },
      {
        id: crypto.randomUUID().toString(),
        name: "Sub-Category 53",
        categoryId: "5",
      },
    ],
  },
  {
    id: "6",
    name: "Category 6",
    subCategories: [
      {
        id: crypto.randomUUID().toString(),
        name: "Sub-Category 61",
        categoryId: "6",
      },
      {
        id: crypto.randomUUID().toString(),
        name: "Sub-Category 62",
        categoryId: "6",
      },
      {
        id: crypto.randomUUID().toString(),
        name: "Sub-Category 63",
        categoryId: "6",
      },
    ],
  },
  {
    id: "7",
    name: "Category 7",
    subCategories: [
      {
        id: crypto.randomUUID().toString(),
        name: "Sub-Category 71",
        categoryId: "7",
      },
      {
        id: crypto.randomUUID().toString(),
        name: "Sub-Category 72",
        categoryId: "7",
      },
      {
        id: crypto.randomUUID().toString(),
        name: "Sub-Category 73",
        categoryId: "7",
      },
    ],
  },
  {
    id: "8",
    name: "Category 8",
    subCategories: [
      {
        id: crypto.randomUUID().toString(),
        name: "Sub-Category 81",
        categoryId: "8",
      },
      {
        id: crypto.randomUUID().toString(),
        name: "Sub-Category 82",
        categoryId: "8",
      },
      {
        id: crypto.randomUUID().toString(),
        name: "Sub-Category 83",
        categoryId: "8",
      },
    ],
  },
  {
    id: "9",
    name: "Category 9",
    subCategories: [
      {
        id: crypto.randomUUID().toString(),
        name: "Sub-Category 91",
        categoryId: "9",
      },
      {
        id: crypto.randomUUID().toString(),
        name: "Sub-Category 92",
        categoryId: "9",
      },
      {
        id: crypto.randomUUID().toString(),
        name: "Sub-Category 93",
        categoryId: "9",
      },
    ],
  },
  {
    id: "10",
    name: "Category 10",
    subCategories: [
      {
        id: crypto.randomUUID().toString(),
        name: "Sub-Category 101",
        categoryId: "10",
      },
      {
        id: crypto.randomUUID().toString(),
        name: "Sub-Category 102",
        categoryId: "10",
      },
      {
        id: crypto.randomUUID().toString(),
        name: "Sub-Category 103",
        categoryId: "10",
      },
    ],
  },
];

const REGISTER_SERVICE_PROVIDER_LOOKUP: RegisterServiceProviderLookup = {
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

type LookupsContextProps = {
  categories: Category[];
  subCategories: SubCategory[];
  registerServiceProviderLookup: RegisterServiceProviderLookup;
};

export const LookupsContext = createContext<LookupsContextProps>({
  categories: CATEGORIES,
  subCategories: [],
  registerServiceProviderLookup: REGISTER_SERVICE_PROVIDER_LOOKUP
});

export default function LookupsProvider({ children }) {
  const subCategories = useMemo(
    () => CATEGORIES.flatMap((category) => category.subCategories),
    [CATEGORIES]
  );

  return (
    <LookupsContext.Provider
      value={{
        categories: CATEGORIES,
        subCategories,
        registerServiceProviderLookup: REGISTER_SERVICE_PROVIDER_LOOKUP,
      }}
    >
      {children}
    </LookupsContext.Provider>
  );
}
