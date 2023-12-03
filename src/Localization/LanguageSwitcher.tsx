import { useState } from "react";
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
    <div
      style={{
        position: "relative",
        width: "90px",
        padding: "0px 20px 0px 20px",
      }}
    >
      <select
        value={selectedLanguage}
        onChange={handleSelectChange}
        style={{
          width: "100%",
          backgroundColor: "white",
          color: "#333",
          borderRadius: "4px",
          backgroundPosition: "right 5px top 50%",
          outline: "none",
        }}
      >
        {Object.keys(lngs).map((lngKey) => (
          <option key={lngKey} value={lngKey}>
            {lngs[lngKey].nativeName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
