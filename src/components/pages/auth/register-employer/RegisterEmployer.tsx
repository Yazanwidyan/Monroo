import { useNavigate } from "react-router-dom";
import { RegisterEmployer } from "../../../../models/RegisterEmployer";
import RegisterEmployerForm from "../../../organisms/register-employer-form/RegisterEmployerForm";
import authServices from "../../../../services/authServices";
import { useContext } from "react";
import { UserContext } from "../../../../contexts/UserContext";
import useCustomToast from "../../../../hooks/useCustomToast";
export default function RegisterEmployerPage() {
  // const state = useRegisterEmployer();
  const navigate = useNavigate();
  const { showToast } = useCustomToast();
  const { updateUser } = useContext(UserContext);

  return (
    <RegisterEmployerForm
      onSubmit={async (register: RegisterEmployer) => {
        try {
          const res = await authServices.registerUser(register);
          console.log("res", res.data);
          updateUser(res.data);
          navigate("/home", { replace: true });
        } catch (error) {
          showToast(error, { status: "error" });
        }
      }}
      onBackClick={() => navigate("/register")}
    />
  );
}
