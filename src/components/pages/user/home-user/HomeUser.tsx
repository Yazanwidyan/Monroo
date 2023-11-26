import { useContext, useEffect, useState } from "react";
import { Button } from "@chakra-ui/button";
import { Grid, GridItem, SkeletonText } from "@chakra-ui/react";
import ServiceProviderCard from "../../../organisms/service-provider-card/ServiceProviderCard";
import CreateEvent from "../create-event/CreateEvent";
import { UserContext } from "../../../../contexts/UserContext";
import userServices from "../../../../services/userServices";
import useCustomToast from "../../../../hooks/useCustomToast";
import { Skeleton } from "@chakra-ui/react";

const HomeUser = () => {
  const { user } = useContext(UserContext);
  const { showToast } = useCustomToast();

  const [providersList, setListProviders] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    fetchData();
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Grid templateColumns="repeat(auto-fill, minmax(400px, 1fr))" gap={4}>
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <GridItem key={index}>
                <Skeleton height="300px" />
                <SkeletonText
                  mt="4"
                  noOfLines={4}
                  spacing="4"
                  skeletonHeight="2"
                />
                <SkeletonText
                  mt="4"
                  noOfLines={4}
                  spacing="4"
                  skeletonHeight="2"
                />
                <Skeleton mt={4} height="40px" width="200px" />
              </GridItem>
            ))
          : providersList.map((userProfile, index) => (
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
