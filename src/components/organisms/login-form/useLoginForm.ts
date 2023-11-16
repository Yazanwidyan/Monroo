import useFormFields from "../../../hooks/useFormFields";

type LoginInfo = {
  username: string;
  password: string;
};

export default function useLoginForm() {
  const [login, , handleLoginChange] = useFormFields<LoginInfo>({
    username: "",
    password: "",
  });

  return { login, handleLoginChange };
}
