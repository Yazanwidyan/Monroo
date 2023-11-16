import { useTranslation } from "react-i18next";

const lngs = {
  en: { nativeName: "English" },
  ru: { nativeName: "Russian" },
  ar: { nativeName: "Arabic" },
};

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.body.dir = i18n.dir();
  };

  return (
    <div>
      <header className="App-header">
        <div>
          {Object.keys(lngs).map((lng) => (
            <button
              key={lng}
              style={{
                fontWeight: i18n.resolvedLanguage === lng ? "bold" : "normal",
              }}
              type="submit"
              onClick={() => changeLanguage(lng)}
            >
              {lngs[lng].nativeName}
            </button>
          ))}
        </div>
      </header>
      {t("login.login")}
    </div>
  );
}
