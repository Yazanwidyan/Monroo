import { Route, Outlet } from "react-router-dom";

import RegisterUserPage from "./components/pages/register-user/RegisterUser";
import RegisterEmployerPage from "./components/pages/register-employer/RegisterEmployer";
import RegisterServiceProvider from "./components/pages/register-service-provider/RegisterServiceProvider";
import Login from "./components/pages/login/Login";

export const AppRoutes = () => (
  <Route path="/" element={<Outlet />}>
    <Route path="register" element={<RegisterUserPage />} />
    <Route path="login" element={<Login />} />
    <Route path="register/employer" element={<RegisterEmployerPage />} />
    <Route path="register/employee" element={<RegisterServiceProvider />} />
  </Route>
);
