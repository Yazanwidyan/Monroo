import {
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Button,
  Flex,
  Heading,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { Select as MultiSelect } from "chakra-react-select";

import { CreateEvent } from "../../../models/CreateEvent";
import styles from "./CreateEventForm.module.scss";
import useCreateEventForm from "./useCreateEventForm";

export type CreateEventFormProps = {
  onSubmit(createEvent: CreateEvent): Promise<void>;
  onBackClick(): void;
};

export default function CreateEventForm(props: CreateEventFormProps) {
  const state = useCreateEventForm({ onSubmit: props.onSubmit });

  return (
    <form onSubmit={state.handleSubmit}>
      <SimpleGrid columns={{ base: 1, md: 1 }} rowGap="20px" columnGap="20px">
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
      </SimpleGrid>
      <Flex marginTop="25px" justifyContent="space-between">
        <Button fontSize="14px" colorScheme="telegram" type="submit">
          Submit
        </Button>
      </Flex>
    </form>
  );
}
