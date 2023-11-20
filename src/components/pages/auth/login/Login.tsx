import { useNavigate } from "react-router-dom";

import LoginForm from "../../../organisms/login-form/LoginForm";
import { LoginInput } from "../../../../models/LoginInput";
import { useContext } from "react";
import { UserContext } from "../../../../contexts/UserContext";
import commonService from "../../../../services/commonService";

export default function Login() {
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  return (
    <LoginForm
      handleSubmit={async (loginInput: LoginInput) => {
        console.log("loginInput", loginInput);

        try {
          const res = await commonService.login(loginInput);
          console.log("res", res);
        } catch (error) {
          console.log("error", error);
        }

        // const loginData = {
        //   ...loginInput,
        //   userType: "user",
        //   userId: 1,
        // };
        // updateUser(loginData);

        // navigate("/home", { replace: true });
      }}
    />
  );
}
