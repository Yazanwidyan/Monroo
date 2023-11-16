import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoutes() {
  const isLoggedIn = true;

  return isLoggedIn ? <Outlet /> : <Navigate to="login" />;
}
