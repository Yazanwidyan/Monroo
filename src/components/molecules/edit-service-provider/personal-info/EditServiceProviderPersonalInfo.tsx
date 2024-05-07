import { FormControl, FormLabel, Input, Select, SimpleGrid } from '@chakra-ui/react';
import useEditServiceProviderPersonalInfo from './useEditServiceProviderPersonalInfo';
import { useTranslation } from 'react-i18next';

const maxDateFor18YearsOld = new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0];

export default function EditServiceProviderPersonalInfo() {
    const { t } = useTranslation();

    const state = useEditServiceProviderPersonalInfo();

    return (
        <SimpleGrid columns={{ base: 1, md: 2 }} rowGap="20px" columnGap="20px">
            <FormControl isRequired>
                <FormLabel>{t('register.first_name')}</FormLabel>
                <Input type="text" name="fname" placeholder={t('register.enter_first_name')} value={state.personalInfo.fname} onChange={state.handlePersonalInfoChange} required />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>{t('register.last_name')}</FormLabel>
                <Input type="text" name="lname" placeholder={t('register.enter_last_name')} value={state.personalInfo.lname} onChange={state.handlePersonalInfoChange} required />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>{t('register.gender')}</FormLabel>
                <Select name="gender" value={state.personalInfo.gender} onChange={state.handlePersonalInfoChange} placeholder="Select option">
                    <option value={1}>Male</option>
                    <option value={2}>Female</option>
                </Select>
            </FormControl>
            <FormControl isRequired>
                <FormLabel>{t('register.nationality')}</FormLabel>
                <Select placeholder={t('register.select_country')} value={state.personalInfo.nationality} onChange={state.handlePersonalInfoChange} name="nationality" required>
                    {state.countries.map((country) => (
                        <option key={country.code} value={country.name}>
                            {country.name}
                        </option>
                    ))}
                </Select>
            </FormControl>
            <FormControl isRequired>
                <FormLabel>{t('register.username')}</FormLabel>
                <Input type="text" name="username" placeholder={t('register.enter_username')} value={state.personalInfo.username} onChange={state.handlePersonalInfoChange} required />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>{t('register.date_of_birth')}</FormLabel>
                <Input
                    type="date"
                    name="dob"
                    placeholder={t('register.enter_date_of_birth')}
                    value={state.personalInfo.dob}
                    onChange={state.handlePersonalInfoChange}
                    max={maxDateFor18YearsOld}
                    className="date-rtl"
                    required
                />
            </FormControl>
        </SimpleGrid>
    );
}
