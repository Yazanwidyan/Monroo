import { FormEvent, useMemo, useContext, useState } from "react";
import countryList from "react-select-country-list";

import useFormFields from "../../../hooks/useFormFields";
import { RegisterEmployer } from "../../../models/RegisterEmployer";
import { RegisterEmployerFormProps } from "./RegisterEmployerForm";
import { validatePassword } from "../../../utils/FormUtility";
import { LookupsContext } from "../../../contexts/LookupsContext";

const DEFAULT_REGISTER_EMPLOYER: RegisterEmployer = {
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

export default function useRegisterEmployerForm(
  props: Pick<RegisterEmployerFormProps, "onSubmit">
) {
  const [registerEmployer, , handleRegisterEmployerChange] =
    useFormFields<RegisterEmployer>(DEFAULT_REGISTER_EMPLOYER);
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
      registerEmployer.password,
      registerEmployer.confirmPassword
    );

    if (!isValid) {
      alert("Passwords do not match");
      return;
    }

    props.onSubmit({...registerEmployer, interestedList: selectedCategoryIds});
  }

  return {
    registerEmployer,
    handleRegisterEmployerChange,
    handleSubmit,
    countries,
    categories,
    handleCategoriesChange,
    selectedCategoryIds,
  };
}
