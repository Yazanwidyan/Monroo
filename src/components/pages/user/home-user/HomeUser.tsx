import { useEffect } from "react";
import CommonService from "../../../../services/commonService";

const HomeUser = () => {
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

  return <div>HomeUser</div>;
};

export default HomeUser;
