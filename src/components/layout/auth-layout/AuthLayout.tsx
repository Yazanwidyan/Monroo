import { Outlet } from "react-router-dom";
import LanguageSwitcher from "../../../Localization/LanguageSwitcher";

const AuthLayout = () => {
  return (
    <div>
      <LanguageSwitcher />
      AuthLayout
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
