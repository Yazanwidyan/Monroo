import { Text, Box } from "@chakra-ui/react";
import countriesData from "../../../constants/countries.json";

const CountryLookup = ({ countryCode }) => {
  const findCountryName = (code) => {
    const country = countriesData.find((item) => item.code === code);
    return country ? country.name : "Country Not Found";
  };

  const countryName = Array.isArray(countryCode)
    ? countryCode.map((code) => findCountryName(code)).join(", ")
    : findCountryName(countryCode);

  return (
    <Box mb={2}>
      <Text fontWeight="400" fontSize="xs">
        {Array.isArray(countryCode) ? "Countries" : "Country"}:
      </Text>
      <Text fontSize="sm" fontWeight={600}>
        {countryName}
      </Text>
    </Box>
  );
};

export default CountryLookup;
