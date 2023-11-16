import { useEffect } from "react";
import CommonService from "../../../../services/commonService";
import { useSnackBar } from "../../../../contexts/SnackbarContext";

const HomeUser = () => {
  const { openSnackBar } = useSnackBar();

  const handleShowSuccess = () => {
    openSnackBar("Operation succeeded!", "success");
  };
  const handleShowError = () => {
    openSnackBar("Operation error!", "error");
  };

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  const fetchData = async () => {
    try {
      const userData = await CommonService.getUserData();
      console.log("userData", userData);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      HomeUser
      <br />
      <button onClick={handleShowSuccess}>Show Success</button>
      <button onClick={handleShowError}>Show error</button>
    </div>
  );
};

export default HomeUser;
