import { useMemo, useContext } from "react";
import countryList from "react-select-country-list";

import { RegisterServiceProviderContext } from "../../../../contexts/RegisterServiceProviderContext";
import { LookupsContext } from "../../../../contexts/LookupsContext";

export default function useRegisterServiceProviderPersonalInfo() {
  const { personalInfo, handlePersonalInfoChange } = useContext(
    RegisterServiceProviderContext
  );

  const { registerServiceProviderLookup } = useContext(LookupsContext);

  const countries: { label: string; value: string }[] = useMemo(
    () =>
      countryList()
        .getData()
        .filter(
          (country: { label: string; value: string }) => country.value !== "IL"
        ),
    []
  );

  return {
    countries,
    personalInfo,
    handlePersonalInfoChange,
    registerServiceProviderLookup,
  };
}
