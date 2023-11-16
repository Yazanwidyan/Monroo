import { FormEvent } from "react";

import useInput from "../../../hooks/useInput";
import { AdminLoginFormProps } from "./AdminLoginForm";

export default function useAdminLoginForm(
  props: Pick<AdminLoginFormProps, "onSubmit">
) {
  const [email, , onEmailChange] = useInput("");
  const [password, , onPasswordChange] = useInput("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    props.onSubmit({ email, password });
  }

  return {
    email,
    password,
    onEmailChange,
    onPasswordChange,
    handleSubmit,
  };
}
