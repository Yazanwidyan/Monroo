import { Text, Box } from "@chakra-ui/react";
import visaTypesData from "../../../constants/visa.json";

const VisaTypeLookup = ({ value }) => {
  const findVisaTypeName = (val) => {
    if (Array.isArray(val)) {
      return val
        .map((v) => {
          const visaType = visaTypesData.find((item) => item.id === v);
          return visaType ? visaType.name : v;
        })
        .join(", ");
    } else {
      const visaType = visaTypesData.find((item) => item.id === val);
      return visaType ? visaType.name : val;
    }
  };

  const visaTypeName = findVisaTypeName(value);

  return (
    <Box mb={2}>
      <Text fontWeight="400" fontSize="xs">
        Visa Type:
      </Text>
      <Text fontSize="sm" fontWeight={600}>
        {visaTypeName}
      </Text>
    </Box>
  );
};

export default VisaTypeLookup;
