import RegisterServiceProviderForm from "../../../organisms/register-service-provider-form/RegisterServiceProviderForm";
import RegisterServiceProviderContextProvider from "../../../../contexts/RegisterServiceProviderContext";

export default function RegisterServiceProvider() {
  return (
    <RegisterServiceProviderContextProvider>
      <RegisterServiceProviderForm />
    </RegisterServiceProviderContextProvider>
  );
}
