import { useState, ChangeEvent } from 'react';

export default function useFormFields<T>(initialValue: T) {
    const [formFields, setFormFields] = useState(initialValue);

    function handleFormFieldsChange(e?: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, fieldName?: string, value?: string): void {
        const spaceRegex = /\s/;
        if ((e?.target?.name === 'username' || e?.target?.name === 'password' || e?.target?.name === 'confirmPassword' || e?.target?.name === 'email') && spaceRegex.test(e?.target?.value)) {
            console.log(`no spaces allowed in ${e?.target?.name}`);

            e.preventDefault();
        } else {
            setFormFields((curr) => ({
                ...curr,
                [e?.target?.name || fieldName]: e?.target?.value || value,
            }));
        }
    }

    return [formFields as T, setFormFields, handleFormFieldsChange] as const;
}
