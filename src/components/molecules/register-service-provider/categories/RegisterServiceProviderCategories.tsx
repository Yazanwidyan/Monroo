import { Flex, FormControl, FormLabel } from "@chakra-ui/react";
import { Select as MultiSelect } from "chakra-react-select";

import useRegisterServiceProviderCategories from "./useRegisterServiceProviderCategories";
import styles from "./RegisterServiceProviderCategories.module.scss";
import { useTranslation } from "react-i18next";

export default function RegisterServiceProviderCategories() {
  const state = useRegisterServiceProviderCategories();
  const { i18n } = useTranslation();

  return (
    <Flex flexDirection="column" gap="12px">
      <FormControl isRequired>
        <FormLabel>Select Category</FormLabel>
        <MultiSelect
          required
          value={state.selectedCategory}
          className={styles.categoriesMultiSelect}
          isSearchable={true}
          onChange={state.handleCategoryChange}
          placeholder="Select category"
          name="category"
          options={state.categories.map((category) => ({
            label:
              i18n.language == "en"
                ? category.name
                : i18n.language == "ar"
                ? category.nameAR
                : category.nameRUS,
            value: category.id,
            catID: category.id,
            name: category.name,
            nameAR: category.nameAR,
            nameRUS: category.nameRUS,
          }))}
        />
      </FormControl>
      <FormControl isRequired isDisabled={!state.selectedCategory}>
        <FormLabel>Select Sub-Categories</FormLabel>
        <MultiSelect
          required
          value={state.selectedSubCategories}
          className={styles.subCategoriesMultiSelect}
          isSearchable={true}
          onChange={state.handleSubCategoriesChange}
          placeholder="Select sub-categories"
          name="subCategories"
          options={state.filteredSubCategories.map((category) => ({
            label:
              i18n.language == "en"
                ? category.name
                : i18n.language == "ar"
                ? category.nameAR
                : category.nameRUS,
            value: category.id,
            id: category.id,
            name: category.name,
            nameAR: category.nameAR,
            nameRUS: category.nameRUS,
            catID: category.categoryId,
          }))}
        />
      </FormControl>
    </Flex>
  );
}
