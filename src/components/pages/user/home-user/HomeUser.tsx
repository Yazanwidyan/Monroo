import { useContext, useEffect, useState } from "react";
import ServiceProviderCard from "../../../organisms/service-provider-card/ServiceProviderCard";
import CreateEvent from "../create-event/CreateEvent";
import { Button } from "@chakra-ui/button";
import { Grid, GridItem } from "@chakra-ui/react";
import { UserContext } from "../../../../contexts/UserContext";
import userServices from "../../../../services/userServices";
import useCustomToast from "../../../../hooks/useCustomToast";

const HomeUser = () => {
  const { user } = useContext(UserContext);
  const { showToast } = useCustomToast();

  const [providersList, setListProviders] = useState<any>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
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
      setListProviders(res.data);
    } catch (error) {
      showToast(error, { status: "error" });
    }
  };

  return (
    <div>
      <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={4}>
        {providersList.map((userProfile, index) => (
          <GridItem key={index}>
            <ServiceProviderCard
              image={userProfile.profilePic}
              title={userProfile.title}
              name={userProfile.username}
              description={userProfile.bio}
              experience={userProfile.experience}
              nationality={userProfile.nationality}
              gender={userProfile.gender}
              providerID={userProfile.id}
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
