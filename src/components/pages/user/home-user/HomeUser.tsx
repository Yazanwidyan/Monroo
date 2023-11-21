import { useContext, useEffect, useState } from "react";
import { useSnackBar } from "../../../../contexts/SnackbarContext";
import ServiceProviderCard from "../../../organisms/service-provider-card/ServiceProviderCard";
import CreateEvent from "../create-event/CreateEvent";
import { Button } from "@chakra-ui/button";
import { Grid, GridItem } from "@chakra-ui/react";
import { UserContext } from "../../../../contexts/UserContext";
import userServices from "../../../../services/userServices";
import commonService from "../../../../services/commonServices";

const HomeUser = () => {
  const { openSnackBar } = useSnackBar();
  const { user } = useContext(UserContext);

  const [userProfiles, setUserProfiles] = useState<any>([]);
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
    fetchData();
    return () => {};
  }, []);

  const fetchData = async () => {
    const payload = {
      userID: user.id,
    };
    try {
      const res = await userServices.getListProviders(payload);
      setUserProfiles(res);
    } catch (error) {
      openSnackBar(error, "error");
    }
  };

  return (
    <div>
      <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={4}>
        {userProfiles.map((userProfile, index) => (
          <GridItem key={index}>
            <ServiceProviderCard
              image={userProfile.profilePic}
              title={userProfile.title}
              name={userProfile.username}
              description={userProfile.bio}
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
