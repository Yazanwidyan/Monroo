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
  InputLeftElement,
  Icon,
  Image,
} from "@chakra-ui/react";
import ServiceProviderCard from "../../../organisms/service-provider-card/ServiceProviderCard";
import CreateEvent from "../create-event/CreateEvent";
import { UserContext } from "../../../../contexts/UserContext";
import userServices from "../../../../services/userServices";
import useCustomToast from "../../../../hooks/useCustomToast";
import { FaSearch } from "react-icons/fa";
import WelcomeBanner from "../../../organisms/welcome-banner/WelcomeBanner";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    filter1: "",
    filter2: "",
    filter3: "",
  });

  const [selectedTab, setSelectedTab] = useState("recommended");

  const fetchData = async (isAll: boolean) => {
    const payload = {
      userID: user.id,
      isAll,
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
    fetchData(false);
  }, []);

  const handleTabChange = (tab: string) => {
    if (tab === "recommended") {
      fetchData(false);
    } else if (tab === "all") {
      fetchData(true);
    }
    setSelectedTab(tab);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters({ ...filters, [filterName]: value });
  };

  return (
    <>
      <WelcomeBanner />
      <Container mt={8} maxW="90%" style={{ display: "flex" }}>
        <Box flex="1">
          <Stack my={5} direction="row" spacing={4}>
            <Button
              px={3}
              variant="ghost"
              color={selectedTab === "recommended" ? "black" : "gray"}
              colorScheme={selectedTab === "recommended" ? "primary" : "gray"}
              onClick={() => handleTabChange("recommended")}
              borderRadius={0}
              _hover={{ bg: "none", textDecoration: "none" }} // Remove hover effect
              borderLeftWidth={selectedTab === "recommended" ? "3px" : "0"} // Add left border if active
              borderColor={
                selectedTab === "recommended" ? "primary.400" : "transparent"
              } // Border color for active tab
            >
              Recommended
            </Button>
            <Button
              px={3}
              variant="ghost"
              color={selectedTab === "all" ? "black" : "gray"}
              colorScheme={selectedTab === "all" ? "primary" : "gray"}
              onClick={() => handleTabChange("all")}
              borderRadius={0}
              _hover={{ bg: "none", textDecoration: "none" }} // Remove hover effect
              borderLeftWidth={selectedTab === "all" ? "3px" : "0"} // Add left border if active
              borderColor={
                selectedTab === "all" ? "primary.400" : "transparent"
              } // Border color for active tab
            >
              All
            </Button>
          </Stack>
          <InputGroup mb={4} bg="white">
            <Input
              placeholder="Search by name or description"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              bg="transparent"
              border="none"
              borderRadius={0}
              borderBottom="1px solid"
              borderColor="gray.300"
              _focus={{ borderColor: "gray.400", boxShadow: "none" }}
              _placeholder={{ color: "gray.500" }}
            />
            <InputLeftElement pointerEvents="none">
              <Icon as={FaSearch} color="gray.400" />
            </InputLeftElement>
          </InputGroup>
          <Stack direction="row" spacing={4} mb={8} align="center">
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
          <Grid
            mb={8}
            templateColumns="repeat(auto-fill, minmax(350px, 1fr))"
            gap={4}
          >
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
                      userProfile={userProfile}
                    />
                  </GridItem>
                ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default HomeUser;
