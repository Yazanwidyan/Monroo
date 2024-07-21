import {
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Button,
  Flex,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { Select as MultiSelect } from "chakra-react-select";

import { CreateEvent } from "../../../models/CreateEvent";
import styles from "./CreateEventForm.module.scss";
import useCreateEventForm from "./useCreateEventForm";
import { useTranslation } from "react-i18next";
import languagesList from "../../../constants/languages.json";

export type CreateEventFormProps = {
  onSubmit(createEvent: CreateEvent): Promise<void>;
};

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

export default function CreateEventForm(props: CreateEventFormProps) {
  const state = useCreateEventForm({ onSubmit: props.onSubmit });
  const { i18n } = useTranslation();

  return (
    <form onSubmit={state.handleSubmit}>
      <SimpleGrid columns={{ base: 1, md: 3 }} rowGap="20px" columnGap="20px">
        <FormControl>
          <FormLabel>Select Category</FormLabel>
          <MultiSelect
            value={state.selectedCategory}
            className={styles.categoriesMultiSelect}
            isSearchable={true}
            onChange={state.handleCategoryChange}
            placeholder="Select category"
            required
            name="catID"
            options={state.categories.map((category) => ({
              label: i18n?.language?.includes("en")
                ? category.name
                : i18n?.language?.includes("ar")
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
        <FormControl isDisabled={!state.selectedCategory}>
          <FormLabel>Select Sub-Categories</FormLabel>
          <MultiSelect
            value={state.selectedSubCategories}
            className={styles.subCategoriesMultiSelect}
            isSearchable={true}
            onChange={state.handleSubCategoriesChange}
            placeholder="Select sub-categories"
            name="subCatID"
            required
            options={state.filteredSubCategories.map((category) => ({
              label: i18n?.language?.includes("en")
                ? category.name
                : i18n?.language?.includes("ar")
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
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            name="title"
            placeholder="Enter title"
            value={state.createEvent.title}
            onChange={state.handleCreateEventChange}
            required
          />
        </FormControl>

        <FormControl>
          <FormLabel>Event Budget</FormLabel>
          <Input
            min={1}
            type="number"
            name="averageCost"
            placeholder="Enter budget"
            value={state.createEvent.averageCost}
            onChange={state.handleCreateEventChange}
            required
          />
        </FormControl>

        <FormControl>
          <FormLabel>Gender</FormLabel>
          <Select
            className="custom-select"
            name="gender"
            value={state.createEvent.gender}
            onChange={state.handleCreateEventChange}
            placeholder="Select option"
          >
            <option value={0}>Not specified</option>
            <option value={1}>Male</option>
            <option value={2}>Female</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Language</FormLabel>
          <Select
            name="languages"
            value={state.createEvent.languages}
            onChange={state.handleCreateEventChange}
            placeholder="Select option"
            className="custom-select"
          >
            {languagesList.map((language) => (
              <option key={language.code} value={language.code}>
                {i18n?.language?.includes("en")
                  ? language.name.en
                  : language.name.ar}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Location</FormLabel>
          <Input
            type="text"
            name="location"
            placeholder="Enter location"
            value={state.createEvent.location}
            onChange={state.handleCreateEventChange}
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel>Start Date</FormLabel>
          <Input
            type="date"
            name="eventDate"
            placeholder="Enter start date"
            value={
              state.createEvent.eventDate ||
              tomorrow.toISOString().split("T")[0]
            } // Initialize with the day after the current day if no value is set
            onChange={state.handleCreateEventChange}
            min={new Date(Date.now() + 86400000).toISOString().split("T")[0]} // Adding 24 hours in milliseconds to the current date
            max={"2050-01-01"}
            className="date-rtl"
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel>End Date</FormLabel>
          <Input
            type="date"
            name="eventEndDate"
            placeholder="Enter end date"
            value={
              state.createEvent.eventEndDate ||
              tomorrow.toISOString().split("T")[0]
            } // Initialize with the day after the current day if no value is set
            onChange={state.handleCreateEventChange}
            min={
              state.createEvent.eventDate ||
              tomorrow.toISOString().split("T")[0]
            } // Setting min date to the event start date
            max={"2050-01-01"}
            className="date-rtl"
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel>Event Duration Per Hour</FormLabel>
          <Input
            min={1}
            type="number"
            name="duration"
            placeholder="Enter duration"
            value={state.createEvent.duration}
            onChange={state.handleCreateEventChange}
            required
          />
        </FormControl>
      </SimpleGrid>
      <FormControl mt={4}>
        <FormLabel>Description</FormLabel>
        <Textarea
          fontSize={17}
          rows={5}
          name="desc"
          placeholder="Enter description"
          value={state.createEvent.desc}
          onChange={state.handleCreateEventChange}
          required
        />
      </FormControl>
      <Flex marginTop="38px" justifyContent="flex-end">
        <Button fontSize="14px" colorScheme="primary" type="submit">
          Submit
        </Button>
      </Flex>
    </form>
  );
}
