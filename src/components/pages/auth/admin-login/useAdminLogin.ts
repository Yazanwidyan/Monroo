import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  AdminContext,
  AdminContextType,
} from "../../../contexts/admin-context/AdminContext";
import { LoginInput } from "../../../models/Login";

export default function useAdminLogin() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const { login, adminInfo } = useContext<AdminContextType | undefined>(
    AdminContext
  ) as AdminContextType;

  async function handleSubmit(loginInput: LoginInput): Promise<void> {
    setIsLoading(true);

    await login(loginInput);

    setIsLoading(false);
  }

  function handleLoginRedirection() {
    switch (adminInfo?.role) {
      case "Admin":
        navigate("/admins/dashboard");
        break;
      case "Observer":
        navigate("/admins/create-user");
        break;
      default:
        navigate("/404");
    }
  }

  useEffect(() => {
    if (!adminInfo?.role) return;

    handleLoginRedirection();
  }, [adminInfo]);

  return {
    handleSubmit,
    isLoading,
  };
}
