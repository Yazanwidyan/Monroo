import { useNavigate } from "react-router-dom";

import LoginForm from "../../../organisms/login-form/LoginForm";
import { LoginInput } from "../../../../models/LoginInput";
import { useContext } from "react";
import { UserContext } from "../../../../contexts/UserContext";
import authServices from "../../../../services/authServices";
import { useSnackBar } from "../../../../contexts/SnackbarContext";

export default function LoginUser() {
  const navigate = useNavigate();
  const { openSnackBar } = useSnackBar();

  const { updateUser } = useContext(UserContext);

  return (
    <LoginForm
      handleSubmit={async (loginInput: LoginInput) => {
        try {
          const res = await authServices.loginUser(loginInput);
          updateUser(res.data);
          navigate("/home", { replace: true });
        } catch (error) {
          openSnackBar(error, "error");
        }
      }}
    />
  );
}
