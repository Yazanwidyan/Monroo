import RegisterServiceProviderForm from "../../../organisms/register-service-provider-form/RegisterServiceProviderForm";
import RegisterServiceProviderContextProvider from "../../../../contexts/RegisterServiceProviderContext";
import { useNavigate } from "react-router-dom";

export default function RegisterServiceProvider() {
  const navigate = useNavigate();

  return (
    <RegisterServiceProviderContextProvider>
      <RegisterServiceProviderForm
        handleSubmit={async (one, two, three) => {
          const registerInfo = {
            ...one,
            ...two,
            ...three,
          };
          console.log("registerInfo", registerInfo);
          navigate("/login", { replace: true });
        }}
      />
    </RegisterServiceProviderContextProvider>
  );
}
