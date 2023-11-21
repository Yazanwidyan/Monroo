import RegisterServiceProviderForm from "../../../organisms/register-service-provider-form/RegisterServiceProviderForm";
import RegisterServiceProviderContextProvider from "../../../../contexts/RegisterServiceProviderContext";
import { useNavigate } from "react-router-dom";
import authServices from "../../../../services/authServices";

export default function RegisterServiceProvider() {
  const navigate = useNavigate();

  return (
    <RegisterServiceProviderContextProvider>
      <RegisterServiceProviderForm
        handleSubmit={async (one, two, three) => {
          console.log("one, two, three", one, two, three);

          return;
          // const registerInfo = {
          //   ...one,
          //   ...two,
          //   ...three,
          // };

          // const data = new FormData();
          // data.append("data", JSON.stringify(registerInfo)); // Stringify the combined data

          // try {
          //   const res = await authServices.registerProvider(data);
          //   console.log("res", res);
          // } catch (error) {
          //   console.log("error", error);
          // }

          // console.log("registerInfo", registerInfo);
          // navigate("/login", { replace: true });
        }}
      />
    </RegisterServiceProviderContextProvider>
  );
}
