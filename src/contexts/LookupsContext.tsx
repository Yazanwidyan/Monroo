import { createContext, useEffect, useMemo, useState } from "react";

import axios from "axios";

import { Category, SubCategory } from "../models/Category";
import { RegisterServiceProviderLookup } from "../models/RegisterServiceProvider";

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
  categories: [],
  subCategories: [],
  registerServiceProviderLookup: REGISTER_SERVICE_PROVIDER_LOOKUP,
});

export default function LookupsProvider({ children }) {
  const [CATEGORIES, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://my-json-server.typicode.com/typicode/demo/posts"
        );
        const { data } = response;

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
        ];

        setCategories(CATEGORIES);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

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
