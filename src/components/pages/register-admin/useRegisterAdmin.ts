import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterAdminInput } from "../../../models/RegisterAdminInput";
import { registerAdmin } from "../../../network/Auth";
import { APIResponse } from "../../../models/APIResponse";

export default function useRegisterAdmin() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(
    registerAdminInput: RegisterAdminInput
  ): Promise<APIResponse> {
    setIsLoading(true);

    const res = await registerAdmin(registerAdminInput);

    setIsLoading(false);

    if (res.success) navigate("/admins/dashboard");

    alert(res.message);

    return res;
  }

  return { isLoading, handleSubmit };
}
