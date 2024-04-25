import { Text, Box } from '@chakra-ui/react';
import visaTypesData from '../../../constants/visa.json';
import { useTranslation } from 'react-i18next';

const VisaTypeLookup = ({ value }) => {
    const { i18n } = useTranslation();

    const findVisaTypeName = (val) => {
        if (Array.isArray(val)) {
            return val
                .map((v) => {
                    const visaType = visaTypesData.find((item) => item.id === v);
                    return visaType ? (i18n?.language?.includes('en') ? visaType.name : i18n?.language?.includes('ar') ? visaType.nameAR : visaType.nameRUS) : v;
                })
                .join(', ');
        } else {
            const visaType = visaTypesData.find((item) => item.id === val);
            return visaType ? (i18n.language == 'en' ? visaType.name : i18n.language == 'ar' ? visaType.nameAR : visaType.nameRUS) : val;
        }
    };

    const visaTypeName = findVisaTypeName(value);

    return (
        <Box mb={2}>
            <Text fontWeight="400" fontSize="xs">
                Visa type:
            </Text>
            <Text fontSize="sm" fontWeight={600}>
                {visaTypeName}
            </Text>
        </Box>
    );
};

export default VisaTypeLookup;
