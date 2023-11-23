import { UserTypes } from "../../../../models/UserTypes";
import { useNavigate } from "react-router-dom";
import useInput from "../../../../hooks/useInput";

export default function useRegisterUserPage() {
  const navigate = useNavigate();

  const [userType, , handleUserTypeChange] = useInput<UserTypes>(
    UserTypes.User
  );

  function handleNextClick() {
    console.log(typeof userType);
    switch (+userType) {
      case UserTypes.User:
        navigate("user");
        break;
      case UserTypes.ServiceProvider:
        navigate("service-provider");
        break;
      default:
        break;
    }
  }

  return { handleNextClick, userType, handleUserTypeChange };
}
