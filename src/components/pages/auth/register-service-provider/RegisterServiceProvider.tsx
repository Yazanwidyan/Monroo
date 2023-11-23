import RegisterServiceProviderForm from "../../../organisms/register-service-provider-form/RegisterServiceProviderForm";
import RegisterServiceProviderContextProvider from "../../../../contexts/RegisterServiceProviderContext";
import { useNavigate } from "react-router-dom";
import authServices from "../../../../services/authServices";

export default function RegisterServiceProvider() {
  const navigate = useNavigate();

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
          videosFile,
          audiosFile
        ) => {
          console.log(
            "selectedCategory:",
            selectedCategory,
            "selectedSubCategories:",
            selectedSubCategories,
            "personalInfo:",
            personalInfo,
            "professionalInfo:",
            professionalInfo,
            "resumeFile:",
            resumeFile,
            "imageFiles:",
            imageFiles,
            "oneMinuteVideoFile:",
            oneMinuteVideoFile,
            "videosFile:",
            videosFile,
            "audiosFile:",
            audiosFile
          );
          const data = new FormData();

          const otherData = {
            ...personalInfo,
            ...professionalInfo,
            catID: selectedCategory.value,
            subCatID: selectedSubCategories,
          };

          data.append("resumeCV", resumeFile[0]);
          data.append("images", imageFiles[0]);
          data.append("onevideo", oneMinuteVideoFile[0]);
          data.append("data", JSON.stringify(otherData));

          try {
            const res = await authServices.registerProvider(data);
            console.log("res", res);
          } catch (error) {
            console.log("error", error);
          }
        }}
      />
    </RegisterServiceProviderContextProvider>
  );
}
