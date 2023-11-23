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
  const [CATEGORIES, setCategories] = useState<any>([]);
  const [registerServiceProviderLookup, setRegisterServiceProviderLookup] =
    useState<RegisterServiceProviderLookup>({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const config = {
          headers: {
            "x-secret": "MonrooHeaders",
          },
        };

        const response = await axios.post(
          `http://localhost:3000/monroo/apis/lookups/getCategories`,
          null,
          config
        );

        const categoriesData = response.data.data;
        const categories = [];

        for (const catID of categoriesData) {
          const payload = {
            catID: catID.id,
          };

          const config = {
            headers: {
              "x-secret": "MonrooHeaders",
            },
          };

          const response = await axios.post(
            `http://localhost:3000/monroo/apis/lookups/getSubCategories`,
            payload,
            config
          );

          const subCategories = response.data.data;

          const category = {
            id: catID.id,
            name: catID.name, // Change this to the actual property name for category name
            nameAR: catID.nameAR, // Change this to the actual property name for category name
            nameRUS: catID.nameRUS, // Change this to the actual property name for category name
            subCategories: subCategories.map((subCat) => ({
              id: subCat.id,
              name: subCat.name, // Change this to the actual property name for subcategory name
              nameAR: subCat.nameAR, // Change this to the actual property name for category name
              nameRUS: subCat.nameRUS, // Change this to the actual property name for category name
              categoryId: catID.id,
            })),
          };

          categories.push(category);
        }
        setCategories(categories);

        console.log("categoriescategories", categories);
      } catch (error) {
        throw error;
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
