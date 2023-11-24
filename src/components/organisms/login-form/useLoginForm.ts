import useFormFields from "../../../hooks/useFormFields";
import { LoginInputWithoutMain } from "../../../models/LoginInput";

export default function useLoginForm(props: {
  onSubmit: (loginInput: LoginInputWithoutMain) => void;
}) {
  const [login, , handleLoginChange] = useFormFields<LoginInputWithoutMain>({
    username: "",
    password: "",
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    props.onSubmit(login);
  }

  return { login, handleLoginChange, handleSubmit };
}
