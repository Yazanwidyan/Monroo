import { useNavigate } from "react-router-dom";
import { RegisterEmployer } from "../../../../models/RegisterEmployer";
import RegisterEmployerForm from "../../../organisms/register-employer-form/RegisterEmployerForm";
import authServices from "../../../../services/authServices";
export default function RegisterEmployerPage() {
  // const state = useRegisterEmployer();
  const navigate = useNavigate();

  return (
    <RegisterEmployerForm
      onSubmit={async (register: RegisterEmployer) => {
        try {
          const res = await authServices.registerUser(register);
          console.log("res", res);
        } catch (error) {
          console.log("error", error);
        }

        console.log({ register });
        navigate("/login", { replace: true });
      }}
      onBackClick={() => navigate("/register")}
    />
  );
}
