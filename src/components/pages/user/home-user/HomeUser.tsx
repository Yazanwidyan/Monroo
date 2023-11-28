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
      <Image
        src="../../../src/assets/images/Banner_models_4.webp"
        alt="Big Photo"
        objectFit="cover"
        w="100vw"
        h="calc(100vh - 50vh)" // Adjust this value to accommodate any header/navbar height
      />
      <Container maxW="8xl" style={{ display: "flex" }}>
        <Box flex="1">
          <Stack direction="row" spacing={4}>
            <Button
              px={0}
              variant="ghost"
              color={selectedTab === "recommended" ? "black" : "gray"}
              colorScheme={selectedTab === "recommended" ? "primary" : "gray"}
              onClick={() => handleTabChange("recommended")}
              _hover={{ bg: "none", textDecoration: "none" }} // Remove hover effect
            >
              Recommended
            </Button>
            <Button
              variant="ghost"
              color={selectedTab === "all" ? "black" : "gray"}
              colorScheme={selectedTab === "all" ? "primary" : "gray"}
              onClick={() => handleTabChange("all")}
              _hover={{ bg: "none", textDecoration: "none" }} // Remove hover effect
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
              _focus={{ outline: "none" }}
              _placeholder={{ color: "gray.500" }}
            />
            <InputLeftElement pointerEvents="none">
              <Icon as={FaSearch} color="gray.400" />
            </InputLeftElement>
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
        </Box>
      </Container>
    </>
  );
};

export default HomeUser;
