import { Flex, FormControl, FormLabel } from "@chakra-ui/react";
import { Select as MultiSelect } from "chakra-react-select";

import useRegisterServiceProviderCategories, {
} from "./useRegisterServiceProviderCategories";
import styles from "./RegisterServiceProviderCategories.module.scss";

export default function RegisterServiceProviderCategories() {
  const state = useRegisterServiceProviderCategories();

  return (
    <Flex flexDirection="column" gap="12px">
      <FormControl>
        <FormLabel>Select Category</FormLabel>
        <MultiSelect
          value={state.selectedCategory}
          className={styles.categoriesMultiSelect}
          isSearchable={true}
          onChange={state.handleCategoryChange}
          placeholder="Select category"
          name="category"
          options={state.categories.map((category) => ({
            label: category.name,
            value: category.id,
          }))}
        />
      </FormControl>
      <FormControl isDisabled={!state.selectedCategory}>
        <FormLabel>Select Sub-Categories</FormLabel>
        <MultiSelect
          value={state.selectedSubCategories}
          className={styles.subCategoriesMultiSelect}
          closeMenuOnSelect={false}
          isSearchable={true}
          isMulti={true}
          onChange={state.handleSubCategoriesChange}
          placeholder="Select sub-categories"
          name="subCategories"
          options={state.filteredSubCategories.map((category) => ({
            label: category.name,
            value: category.id,
          }))}
        />
      </FormControl>
    </Flex>
  );
}
