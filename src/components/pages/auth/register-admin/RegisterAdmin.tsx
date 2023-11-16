import Card from "../../atoms/card/Card";
import RegisterAdminForm from "../../molecules/register-admin-form/RegisterAdminForm";
import useRegisterAdmin from "./useRegisterAdmin";

export default function RegisterAdmin() {
  const state = useRegisterAdmin();

  return (
    <Card title="Register Admin">
      <RegisterAdminForm
        isLoading={state.isLoading}
        onSubmit={state.handleSubmit}
      />
    </Card>
  );
} 
