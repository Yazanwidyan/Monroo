import { LoginInput } from "../../../models/LoginInput";
import Button from "../../atoms/button/Button";
import Input from "../../atoms/input/Input";
import styles from "./AdminLoginForm.module.scss";
import useAdminLoginForm from "./useAdminLoginForm";

export type AdminLoginFormProps = {
  isLoading: boolean;
  onSubmit(loginInput: LoginInput): Promise<void>;
};

export default function AdminLoginForm(props: AdminLoginFormProps) {
  const state = useAdminLoginForm({ onSubmit: props.onSubmit });

  return (
    <form className={styles.form} onSubmit={state.handleSubmit}>
      <Input
        type="text"
        onChange={state.onEmailChange}
        value={
          state.email as string | number | readonly string[] | undefined
        }
        name="email"
        placeholder="Enter Email"
        labelName="Email"
      />
      <Input
        type="password"
        onChange={state.onPasswordChange}
        value={
          state.password as string | number | readonly string[] | undefined
        }
        name="password"
        placeholder="Enter Password"
        labelName="Password"
      />
      <div className={styles.tools}>
        <Button type="submit" variant="primary" disabled={props.isLoading}>
          Login
        </Button>
      </div>
    </form>
  );
}
