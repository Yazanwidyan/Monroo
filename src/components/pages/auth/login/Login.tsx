import { useNavigate } from "react-router-dom";

import LoginForm from "../../../organisms/login-form/LoginForm";
import { LoginInput } from "../../../../models/LoginInput";

export default function Login() {
  const navigate = useNavigate();

  return (
    <LoginForm
      handleSubmit={async (loginInput: LoginInput) => {
        console.log("loginInput", loginInput);

        navigate("/home", { replace: true });
      }}
    />
  );
}
