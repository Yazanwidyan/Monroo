import { useContext } from "react";

import { LookupsContext } from "../../../../contexts/LookupsContext";
import { RegisterServiceProviderContext } from "../../../../contexts/RegisterServiceProviderContext";

export type MultiSelectOption = {
  label: string;
  value: string;
  catID: string;
};

export default function useRegisterServiceProviderCategories() {
  const { categories, subCategories } = useContext(LookupsContext);

  const {
    selectedCategory,
    selectedSubCategories,
    filteredSubCategories,
    handleCategoryChange,
    handleSubCategoriesChange,
  } = useContext(RegisterServiceProviderContext);

  return {
    categories,
    subCategories,
    selectedCategory,
    selectedSubCategories,
    handleCategoryChange,
    handleSubCategoriesChange,
    filteredSubCategories,
  };
}
