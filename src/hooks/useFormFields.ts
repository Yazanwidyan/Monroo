import { useState, ChangeEvent } from "react";

export default function useFormFields<T>(initialValue: T) {
  const [formFields, setFormFields] = useState(initialValue);

  function handleFormFieldsChange(
    e?: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, fieldName?: string, value?: string
  ): void {
    setFormFields((curr) => ({ ...curr, [e?.target?.name || fieldName]: e?.target?.value || value }));
  }

  return [formFields as T, setFormFields, handleFormFieldsChange] as const;
}
