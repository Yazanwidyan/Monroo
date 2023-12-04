import RegisterServiceProviderForm from "../../../organisms/register-service-provider-form/RegisterServiceProviderForm";
import RegisterServiceProviderContextProvider from "../../../../contexts/RegisterServiceProviderContext";
import { useNavigate } from "react-router-dom";
import authServices from "../../../../services/authServices";
import useCustomToast from "../../../../hooks/useCustomToast";
import { useContext } from "react";
import { UserContext } from "../../../../contexts/UserContext";

export default function RegisterServiceProvider() {
  const navigate = useNavigate();
  const { showToast } = useCustomToast();
  const { updateUser } = useContext(UserContext);

  return (
    <RegisterServiceProviderContextProvider>
      <RegisterServiceProviderForm
        handleSubmit={async (
          selectedCategory,
          selectedSubCategories,
          personalInfo,
          professionalInfo,
          resumeFile,
          imageFiles,
          oneMinuteVideoFile,
          demoReelFile,
          portfolioFile,
          videosFile,
          audiosFile
        ) => {
          const data = new FormData();
          const otherData = {
            ...personalInfo,
            ...professionalInfo,
            catID: selectedCategory.value,
            subCatID: selectedSubCategories,
          };
          data.append("resumeCV", resumeFile[0]);
          imageFiles.forEach((file) => {
            data.append(`images`, file);
          });
          videosFile.forEach((file) => {
            data.append(`videos`, file);
          });
          audiosFile.forEach((file) => {
            data.append(`audios`, file);
          });
          data.append("onevideo", oneMinuteVideoFile[0]);
          data.append("reel", demoReelFile[0]);
          data.append("portfolio", portfolioFile[0]);
          data.append("data", JSON.stringify(otherData));

          try {
            const res = await authServices.registerProvider(data);
            console.log("res", res.data);
            updateUser(res.data);
            navigate("/timeline", { replace: true });
          } catch (error) {
            showToast(error, { status: "error" });
          }
        }}
      />
    </RegisterServiceProviderContextProvider>
  );
}
