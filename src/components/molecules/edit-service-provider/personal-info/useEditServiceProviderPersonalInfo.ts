import { useMemo, useContext } from 'react';
import countryList from '../../../../constants/countries.json';

import { EditServiceProviderContext } from '../../../../contexts/EditServiceProviderContext';
import { LookupsContext } from '../../../../contexts/LookupsContext';

export default function useEditServiceProviderPersonalInfo() {
    const { personalInfo, handlePersonalInfoChange } = useContext(EditServiceProviderContext);

    const { registerServiceProviderLookup } = useContext(LookupsContext);

    const countries: { name: string; code: string }[] = useMemo(() => countryList.filter((country) => country.code !== 'IL'), []);

    return {
        countries,
        personalInfo,
        handlePersonalInfoChange,
        registerServiceProviderLookup,
    };
}
