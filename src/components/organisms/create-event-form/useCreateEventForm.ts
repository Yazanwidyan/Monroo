import { FormEvent, useMemo, useContext, useState } from "react";
import countryList from "react-select-country-list";

import useFormFields from "../../../hooks/useFormFields";
import { CreateEvent } from "../../../models/CreateEvent";
import { CreateEventFormProps } from "./CreateEventForm";
import { validatePassword } from "../../../utils/FormUtility";
import { LookupsContext } from "../../../contexts/LookupsContext";

const DEFAULT_CREATE_EVENT: CreateEvent = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
  about: "",
  companyName: "",
  country: "0",
  interestedList: [],
  phone: "",
};

export default function useCreateEventFormForm(
  props: Pick<CreateEventFormProps, "onSubmit">
) {
  const [createEvent, , handleCreateEventChange] =
    useFormFields<CreateEvent>(DEFAULT_CREATE_EVENT);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);

  const { categories } = useContext(LookupsContext);

  const countries: { label: string; value: string }[] = useMemo(
    () =>
      countryList()
        .getData()
        .filter(
          (country: { label: string; value: string }) => country.value !== "IL"
        ),
    []
  );

  function handleCategoriesChange(selectedCategoryIds: string[]): void {
    setSelectedCategoryIds(selectedCategoryIds);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    const isValid = validatePassword(
      createEvent.password,
      createEvent.confirmPassword
    );

    if (!isValid) {
      alert("Passwords do not match");
      return;
    }

    props.onSubmit({
      ...createEvent,
      interestedList: selectedCategoryIds,
    });
  }

  return {
    createEvent,
    handleCreateEventChange,
    handleSubmit,
    countries,
    categories,
    handleCategoriesChange,
    selectedCategoryIds,
  };
}
