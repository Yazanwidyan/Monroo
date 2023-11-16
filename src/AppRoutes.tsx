import { Route, Outlet } from "react-router-dom";

import RegisterUserPage from "./components/pages/register-user/RegisterUser";
import RegisterEmployerPage from "./components/pages/register-employer/RegisterEmployer";
import RegisterServiceProvider from "./components/pages/register-service-provider/RegisterServiceProvider";
import Login from "./components/pages/login/Login";
import PrivateRoutes from "./components/molecules/private-routes/PrivateRoutes";
import HomeUser from "./components/pages/home-user/HomeUser";
import AuthLayout from "./components/layout/auth-layout/AuthLayout";
import HomeLayout from "./components/layout/home-layout/HomeLayout";

export const AppRoutes = () => (
  <>
    <Route path="/" element={<AuthLayout />}>
      <Route path="register" element={<RegisterUserPage />} />
      <Route path="login" element={<Login />} />
      <Route path="register/employer" element={<RegisterEmployerPage />} />
      <Route path="register/employee" element={<RegisterServiceProvider />} />
    </Route>
    <Route path="/" element={<HomeLayout />}>
      <Route element={<PrivateRoutes />}>
        <Route path="home" element={<HomeUser />} />
      </Route>
    </Route>
  </>
);
