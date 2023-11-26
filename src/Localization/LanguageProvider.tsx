import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const currentLanguage = localStorage.getItem("i18nextLng");
    document.body.dir = i18n.dir(currentLanguage);
  }, []);

  return <div>{children}</div>;
};

export default LanguageProvider;
