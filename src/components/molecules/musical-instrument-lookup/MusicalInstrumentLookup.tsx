import { Text, Box } from "@chakra-ui/react";
import instrumentsData from "../../../constants/instruments.json";

const MusicalInstrumentLookup = ({ value }) => {
  const findInstrumentName = (val) => {
    if (Array.isArray(val)) {
      return val
        .map((v) => {
          const instrument = instrumentsData.find((item) => item.id === v);
          return instrument ? instrument.name : v;
        })
        .join(", ");
    } else {
      const instrument = instrumentsData.find((item) => item.id === val);
      return instrument ? instrument.name : val;
    }
  };

  const instrumentName = findInstrumentName(value);

  return (
    <Box mb={2}>
      <Text fontWeight="400" fontSize="xs">
        Musical Instrument:
      </Text>
      <Text fontSize="sm" fontWeight={600}>
        {instrumentName}
      </Text>
    </Box>
  );
};

export default MusicalInstrumentLookup;
