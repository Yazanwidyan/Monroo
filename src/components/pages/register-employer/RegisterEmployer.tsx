import { useNavigate } from "react-router-dom";
import { RegisterEmployer } from "../../../models/RegisterEmployer";
import RegisterEmployerForm from "../../organisms/register-employer-form/RegisterEmployerForm";
export default function RegisterEmployerPage() {
  // const state = useRegisterEmployer();
  const navigate = useNavigate();

  return (
    <RegisterEmployerForm
      onSubmit={async (register: RegisterEmployer) => {
        console.log({ register });
        navigate("/login", { replace: true });
      }}
      onBackClick={() => navigate("/register")}
    />
  );
}
