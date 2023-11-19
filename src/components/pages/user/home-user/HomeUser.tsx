import { useContext, useEffect, useState } from "react";
import commonService from "../../../../services/commonService";
import { useSnackBar } from "../../../../contexts/SnackbarContext";
import ServiceProviderCard from "../../../organisms/service-provider-card/ServiceProviderCard";
import CreateEvent from "../create-event/CreateEvent";
import { Button } from "@chakra-ui/button";
import { Grid, GridItem } from "@chakra-ui/react";
import { UserContext } from "../../../../contexts/UserContext";

const userProfiles = [
  {
    image:
      "https://media.istockphoto.com/id/1226217925/photo/portrait-of-focused-building-constructor-in-his-workplace-cranes-in-background.jpg?s=612x612&w=0&k=20&c=InRSmSD3VUepKOJy5htT2I8scJW8Mj_PqUAwCRd_Fx4=",
    title: "Engineer",
    name: "Morgan Smith",
    description: "Passionate about building innovative solutions.",
    experience: "8 years",
    nationality: "Canadian",
    gender: "Female",
  },
  {
    image:
      "https://foodie.sysco.com/wp-content/uploads/2019/07/MarcusMeansChefProfile_800x850.jpg",
    title: "Chef",
    name: "Bob Johnson",
    description: "Creating culinary experiences that delight the senses.",
    experience: "12 years",
    nationality: "Italian",
    gender: "Male",
  },
  {
    image:
      "https://previews.123rf.com/images/georgerudy/georgerudy1703/georgerudy170300108/73532351-beautiful-business-lady-is-looking-at-camera-and-smiling-while-working-in-office.jpg",
    title: "Designer",
    name: "Eva Martinez",
    description: "Bringing creativity to life through design.",
    experience: "6 years",
    nationality: "Spanish",
    gender: "Female",
  },
];

const HomeUser = () => {
  const { openSnackBar } = useSnackBar();
  const { user } = useContext(UserContext);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleShowSuccess = () => {
    openSnackBar("Operation succeeded!", "success");
  };
  const handleShowError = () => {
    openSnackBar("Operation error!", "error");
  };

  useEffect(() => {
    console.log("userInfo", user);

    fetchData();
    return () => {};
  }, []);

  const fetchData = async () => {
    try {
      const userData = await commonService.getUserData();
      console.log("userData", userData);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      logged email: {user.email} <br /> type: {user.userType}
      <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={4}>
        {userProfiles.map((userProfile, index) => (
          <GridItem key={index}>
            <ServiceProviderCard
              image={userProfile.image}
              title={userProfile.title}
              name={userProfile.name}
              description={userProfile.description}
              experience={userProfile.experience}
              nationality={userProfile.nationality}
              gender={userProfile.gender}
            />
          </GridItem>
        ))}
      </Grid>
      <Button onClick={openDialog}>Create Event</Button>
      <CreateEvent isOpen={isDialogOpen} onClose={closeDialog} />
    </div>
  );
};

export default HomeUser;
