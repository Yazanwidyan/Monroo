import useFormFields from "../../../hooks/useFormFields";
import { LoginInput } from "../../../models/LoginInput";

export default function useLoginForm(props: {
  onSubmit: (loginInput: LoginInput) => void;
}) {
  const [login, , handleLoginChange] = useFormFields<LoginInput>({
    email: "",
    password: "",
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    props.onSubmit(login);
  }

  return { login, handleLoginChange, handleSubmit };
}
