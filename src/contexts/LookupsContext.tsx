import { createContext, useEffect, useMemo, useState } from "react";

import axios from "axios";

import { Category, SubCategory } from "../models/Category";
import { RegisterServiceProviderLookup } from "../models/RegisterServiceProvider";

type LookupsContextProps = {
  categories: Category[];
  subCategories: SubCategory[];
  registerServiceProviderLookup: RegisterServiceProviderLookup;
  updateRegisterServiceProviderLookup: (
    updatedLookup: RegisterServiceProviderLookup
  ) => void;
};

export const LookupsContext = createContext<LookupsContextProps>({
  categories: [],
  subCategories: [],
  registerServiceProviderLookup: {},
  updateRegisterServiceProviderLookup: () => {},
});

export default function LookupsProvider({ children }) {
  const [CATEGORIES, setCategories] = useState<Category[]>([]);
  const [registerServiceProviderLookup, setRegisterServiceProviderLookup] =
    useState<RegisterServiceProviderLookup>({});

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
  const updateRegisterServiceProviderLookup = (
    updatedLookup: RegisterServiceProviderLookup
  ) => {
    setRegisterServiceProviderLookup(updatedLookup);
  };

  return (
    <LookupsContext.Provider
      value={{
        categories: CATEGORIES,
        subCategories,
        registerServiceProviderLookup,
        updateRegisterServiceProviderLookup,
      }}
    >
      {children}
    </LookupsContext.Provider>
  );
}
