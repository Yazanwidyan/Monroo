import { FormEvent, useMemo, useContext, useState } from "react";

import useFormFields from "../../../hooks/useFormFields";
import { CreateEvent } from "../../../models/CreateEvent";
import { CreateEventFormProps } from "./CreateEventForm";
import { LookupsContext } from "../../../contexts/LookupsContext";
import { MultiSelectOption } from "../../molecules/register-service-provider/categories/useRegisterServiceProviderCategories";

const DEFAULT_CREATE_EVENT: CreateEvent = {
  selectedCategory: "",
};

export default function useCreateEventFormForm(
  props: Pick<CreateEventFormProps, "onSubmit">
) {
  const [createEvent, , handleCreateEventChange] =
    useFormFields<CreateEvent>(DEFAULT_CREATE_EVENT);
  const [selectedCategory, setSelectedCategory] = useState<MultiSelectOption>();
  const [selectedSubCategories, setSelectedSubCategories] = useState<
    MultiSelectOption[]
  >([]);

  const { categories, subCategories } = useContext(LookupsContext);

  function handleCategoryChange(selectedCategory: MultiSelectOption): void {
    setSelectedCategory(selectedCategory);
    console.log("selectedCategory", selectedCategory);

    setSelectedSubCategories([]);
  }

  function handleSubCategoriesChange(
    selectedSubCategories: MultiSelectOption[]
  ): void {
    setSelectedSubCategories(selectedSubCategories);
  }

  const filteredSubCategories = useMemo(() => {
    return subCategories.filter(
      (subCategory) => subCategory.categoryId === selectedCategory?.value
    );
  }, [selectedCategory, subCategories]);

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    props.onSubmit({
      ...createEvent,
    });
  }

  return {
    createEvent,
    handleCreateEventChange,
    handleSubmit,
    categories,
    subCategories,
    selectedCategory,
    selectedSubCategories,
    filteredSubCategories,
    handleCategoryChange,
    handleSubCategoriesChange,
  };
}
