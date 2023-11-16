import { UserTypes } from "../../../../models/UserTypes";
import { useNavigate } from "react-router-dom";
import useInput from "../../../../hooks/useInput";

export default function useRegisterUserPage() {
  const navigate = useNavigate();

  const [userType, , handleUserTypeChange] = useInput<UserTypes>(
    UserTypes.Employer
  );

  function handleNextClick() {
    console.log(typeof userType);
    switch (+userType) {
      case UserTypes.Employer:
        navigate("employer");
        break;
      case UserTypes.Employee:
        navigate("employee");
        break;
      default:
        break;
    }
  }

  return { handleNextClick, userType, handleUserTypeChange };
}
