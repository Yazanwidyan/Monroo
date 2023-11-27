import { useContext, useEffect, useState } from "react";
import {
  Grid,
  GridItem,
  Input,
  InputGroup,
  SkeletonText,
  Stack,
  Box,
  Container,
  Skeleton,
  Button,
  Select,
} from "@chakra-ui/react";
import ServiceProviderCard from "../../../organisms/service-provider-card/ServiceProviderCard";
import CreateEvent from "../create-event/CreateEvent";
import { UserContext } from "../../../../contexts/UserContext";
import userServices from "../../../../services/userServices";
import useCustomToast from "../../../../hooks/useCustomToast";

const DummySelectOptions = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
];

const HomeUser = () => {
  const { user } = useContext(UserContext);
  const { showToast } = useCustomToast();

  const [providersList, setListProviders] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    filter1: "",
    filter2: "",
    filter3: "",
  });

  const [selectedTab, setSelectedTab] = useState("recommended"); // Track selected tab

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const fetchData = async (isRecommended: boolean) => {
    const payload = {
      userID: user.id,
      recommended: isRecommended,
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

  useEffect(() => {
    fetchData(true); // Fetch recommended data initially
  }, []);

  const handleTabChange = (tab: string) => {
    if (tab === "recommended") {
      fetchData(true); // Fetch recommended providers
    } else if (tab === "all") {
      fetchData(false); // Fetch all providers
    }
    setSelectedTab(tab); // Update selected tab
  };

  const handleFilterChange = (filterName, value) => {
    setFilters({ ...filters, [filterName]: value });
  };

  return (
    <Container maxW="8xl" style={{ display: "flex" }}>
      <Box flex=".5">
        <Stack direction="column" spacing={4}>
          <Button
            colorScheme={selectedTab === "recommended" ? "primary" : "gray"}
            onClick={() => handleTabChange("recommended")}
          >
            Recommended
          </Button>
          <Button
            colorScheme={selectedTab === "all" ? "primary" : "gray"}
            onClick={() => handleTabChange("all")}
          >
            All
          </Button>
        </Stack>
      </Box>
      <Box flex=".4"></Box>
      <Box flex="14">
        <InputGroup mb={4}>
          <Input
            placeholder="Search by name or description"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
        <Stack direction="row" spacing={4} mb={4} align="center">
          <Select
            value={filters.filter1}
            onChange={(selectedOption) =>
              handleFilterChange("filter1", selectedOption)
            }
            placeholder="Select"
          />
          <Select
            value={filters.filter2}
            onChange={(selectedOption) =>
              handleFilterChange("filter2", selectedOption)
            }
            placeholder="Select"
          />
          <Select
            value={filters.filter3}
            onChange={(selectedOption) =>
              handleFilterChange("filter3", selectedOption)
            }
            placeholder="Select"
          />
          <Button
            size="sm"
            fontSize="x-small"
            variant="outline"
            colorScheme="primary"
          >
            Apply
          </Button>
        </Stack>
        <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={4}>
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
      </Box>
    </Container>
  );
};

export default HomeUser;
