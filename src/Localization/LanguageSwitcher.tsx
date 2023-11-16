import { Select } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const lngs = {
  en: { nativeName: "English" },
  ru: { nativeName: "Russian" },
  ar: { nativeName: "Arabic" },
};

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
    document.body.dir = i18n.dir(selectedLanguage);
  };

  return (
    <Select
      variant="outline"
      size="sm"
      onChange={changeLanguage}
      value={i18n.language}
      width="fit-content"
    >
      {Object.keys(lngs).map((lng) => (
        <option key={lng} value={lng}>
          {lngs[lng].nativeName}
        </option>
      ))}
    </Select>
  );
}
