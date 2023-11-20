import { useMemo, useContext } from "react";
import countryList from "../../../../constants/countries.json";

import { RegisterServiceProviderContext } from "../../../../contexts/RegisterServiceProviderContext";
import { LookupsContext } from "../../../../contexts/LookupsContext";

export default function useRegisterServiceProviderPersonalInfo() {
  const { personalInfo, handlePersonalInfoChange } = useContext(
    RegisterServiceProviderContext
  );

  const { registerServiceProviderLookup } = useContext(LookupsContext);

  const countries: { name: string; code: string }[] = useMemo(
    () => countryList.filter((country) => country.code !== "IL"),
    []
  );

  return {
    countries,
    personalInfo,
    handlePersonalInfoChange,
    registerServiceProviderLookup,
  };
}
