import { useNavigate } from "react-router-dom";

import LoginForm from "../../../organisms/login-form/LoginForm";
import { LoginInput } from "../../../../models/LoginInput";
import { useContext } from "react";
import { UserContext } from "../../../../contexts/UserContext";
import authServices from "../../../../services/authServices";

export default function Login() {
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  return (
    <LoginForm
      handleSubmit={async (loginInput: LoginInput) => {
        try {
          const res = await authServices.login(loginInput);
          console.log("res", res.data);
          updateUser(res.data);
          navigate("/home", { replace: true });
        } catch (error) {
          console.log("error", error);
        }
      }}
    />
  );
}
