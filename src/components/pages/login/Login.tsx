import { useNavigate } from "react-router-dom";

import LoginForm from "../../organisms/login-form/LoginForm";

export default function Login() {
  const navigate = useNavigate();

  return (
    <LoginForm handleSubmit={async () => navigate("/", { replace: true })} />
  );
}
