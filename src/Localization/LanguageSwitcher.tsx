import { useState } from "react";
import { Select, CSSReset } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FaFlagUsa, FaFlag } from "react-icons/fa"; // Import flag icons

const lngs = {
  en: { nativeName: "En", icon: <FaFlagUsa /> },
  ru: { nativeName: "Ru", icon: <FaFlag /> },
  ar: { nativeName: "Ar", icon: <FaFlag /> },
};

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.body.dir = i18n.dir(lng);
    setSelectedLanguage(lng);
  };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    changeLanguage(selectedValue);
  };

  return (
    <>
      <Select
        value={selectedLanguage}
        onChange={handleSelectChange}
        maxWidth="100px"
        borderWidth="0"
      >
        {Object.keys(lngs).map((lngKey) => (
          <option key={lngKey} value={lngKey}>
            {lngs[lngKey].nativeName}
          </option>
        ))}
      </Select>
    </>
  );
};

export default LanguageSwitcher;
