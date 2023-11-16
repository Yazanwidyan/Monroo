import { useEffect } from "react";
import CommonService from "../../../../services/commonService";
import { useSnackBar } from "../../../../contexts/SnackbarContext";
import ServiceProviderCard from "../../../organisms/service-provider-card/ServiceProviderCard";
import CreateEvent from "../create-event/CreateEvent";

const userProfile = {
  image:
    "https://benmarcum.com/wp-content/uploads/2017/03/Ben-Marcum-Photography_Headshot-Photographer_Louisville_Kentucky_Actor-Headshots_John-Wells_Jan-11-2017_025-1.jpg",
  title: "Actor",
  name: "John Doe",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  experience: "5 years",
  nationality: "American",
  gender: "Male",
};

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
      <ServiceProviderCard
        image={userProfile.image}
        title={userProfile.title}
        name={userProfile.name}
        description={userProfile.description}
        experience={userProfile.experience}
        nationality={userProfile.nationality}
        gender={userProfile.gender}
      />
      <br />
      <CreateEvent />
      {/* <button onClick={handleShowSuccess}>Show Success</button>
      <button onClick={handleShowError}>Show error</button> */}
    </div>
  );
};

export default HomeUser;
