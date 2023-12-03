import { Text, Box } from "@chakra-ui/react";
import educationData from "../../../constants/education.json";
import { useTranslation } from "react-i18next";

const EducationLookup = ({ value }) => {
  const { i18n } = useTranslation();

  const findEducationName = (val) => {
    if (Array.isArray(val)) {
      return val
        .map((v) => {
          const education = educationData.find((item) => item.code === v);
          return education
            ? i18n.language == "en"
              ? education.name
              : i18n.language == "ar"
              ? education.nameAR
              : education.nameRUS
            : v;
        })
        .join(", ");
    } else {
      const education = educationData.find((item) => item.code === val);
      return education
        ? i18n.language == "en"
          ? education.name
          : i18n.language == "ar"
          ? education.nameAR
          : education.nameRUS
        : val;
    }
  };

  const educationName = findEducationName(value);

  return (
    <Box mb={2}>
      <Text fontWeight="400" fontSize="xs">
        Education:
      </Text>
      <Text fontSize="sm" fontWeight={600}>
        {educationName}
      </Text>
    </Box>
  );
};

export default EducationLookup;
