import { createContext, useEffect, useMemo, useState } from "react";
import axios from "axios";

import { Category, SubCategory } from "../models/Category";
import { RegisterServiceProviderLookup } from "../models/RegisterServiceProvider";
import commonService from "../services/commonServices";
import { useSnackBar } from "./SnackbarContext";

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

  const { openSnackBar } = useSnackBar();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await commonService.getCategories();
        const categoriesData = res.data;
        const categories = [];

        for (const catID of categoriesData) {
          const payload = {
            catID: catID.id,
          };
          const res = await commonService.getSubCategories(payload);
          const subCategories = res.data;

          const category = {
            id: catID.id,
            name: catID.name,
            nameAR: catID.nameAR,
            nameRUS: catID.nameRUS,
            subCategories: subCategories.map((subCat) => ({
              id: subCat.id,
              name: subCat.name,
              nameAR: subCat.nameAR,
              nameRUS: subCat.nameRUS,
              categoryId: catID.id,
            })),
          };

          categories.push(category);
        }
        setCategories(categories);
      } catch (error) {
        openSnackBar(error, "error");
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
