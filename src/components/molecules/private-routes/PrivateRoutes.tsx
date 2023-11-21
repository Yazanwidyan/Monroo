import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";

export default function PrivateRoutes() {
  const { user } = useContext(UserContext);

  const isLoggedIn = !!user;

  console.log("isLoggedIn", isLoggedIn);

  return isLoggedIn ? <Outlet /> : <Navigate to="login" />;
}
