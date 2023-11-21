import { useNavigate } from "react-router-dom";

import LoginForm from "../../../organisms/login-form/LoginForm";
import { LoginInput } from "../../../../models/LoginInput";
import { useContext } from "react";
import { UserContext } from "../../../../contexts/UserContext";
import authServices from "../../../../services/authServices";
import { useSnackBar } from "../../../../contexts/SnackbarContext";

export default function LoginProvider() {
  const navigate = useNavigate();
  const { openSnackBar } = useSnackBar();

  const { updateUser } = useContext(UserContext);

  return (
    <LoginForm
      handleSubmit={async (loginInput: LoginInput) => {
        try {
          const res = await authServices.loginProvider(loginInput);
          updateUser(res);
          if (!res.hasOwnProperty("dob")) {
            navigate("/home", { replace: true });
          } else {
            navigate("/timeline", { replace: true });
          }
        } catch (error) {
          openSnackBar(error, "error");
        }
      }}
    />
  );
}
