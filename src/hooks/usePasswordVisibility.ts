import { useState } from "react";

type PasswordVisibility = Record<string, boolean>;

export default function usePasswordVisibility(
  initialVisibility: PasswordVisibility = {}
) {
  const [passwordVisibility, setPasswordVisibility] =
    useState<PasswordVisibility>(initialVisibility);

  const togglePasswordVisibility = (fieldName: string): void => {
    setPasswordVisibility((prevVisibility) => ({
      ...prevVisibility,
      [fieldName]: !prevVisibility[fieldName],
    }));
  };

  return [passwordVisibility, togglePasswordVisibility] as const;
}
