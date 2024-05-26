import { FormEvent, useMemo, useContext, useState } from 'react';
import countryList from '../../../constants/countries.json';

import useFormFields from '../../../hooks/useFormFields';
import { RegisterEmployer } from '../../../models/RegisterEmployer';
import { RegisterEmployerFormProps } from './RegisterEmployerForm';
import { validatePassword } from '../../../utils/FormUtility';
import { LookupsContext } from '../../../contexts/LookupsContext';

const DEFAULT_REGISTER_EMPLOYER: RegisterEmployer = {
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    about: '',
    companyName: '',
    country: '',
    intrestedList: [],
    phone: '',
};

export default function useRegisterEmployerForm(props: Pick<RegisterEmployerFormProps, 'onSubmit'>) {
    const [registerEmployer, , handleRegisterEmployerChange] = useFormFields<RegisterEmployer>(DEFAULT_REGISTER_EMPLOYER);

    const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
    const [profilePic, setProfilePic] = useState<File | null>(null); // State to hold the selected file

    const { categories } = useContext(LookupsContext);

    const countries: { name: string; code: string; flag: string }[] = useMemo(() => countryList.filter((country) => country.code !== 'IL'), []);

    function handleCategoriesChange(selectedCategoryIds: string[]): void {
        setSelectedCategoryIds(selectedCategoryIds);
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const fileList = e.target.files;
        if (fileList && fileList.length > 0) {
            const selectedFile = fileList[0];
            setProfilePic(selectedFile);
        }
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();

        const isValid = validatePassword(registerEmployer.password, registerEmployer.confirmPassword);

        if (!isValid) {
            alert('Passwords do not match');
            return;
        }

        // Include file in the submission payload
        props.onSubmit(
            {
                ...registerEmployer,
                intrestedList: selectedCategoryIds,
            },
            profilePic
        );
    }

    return {
        registerEmployer,
        handleRegisterEmployerChange,
        handleSubmit,
        countries,
        categories,
        handleCategoriesChange,
        selectedCategoryIds,
        profilePic,
        setProfilePic,
        handleFileChange, // Add handleFileChange function to expose it to the component
    };
}
