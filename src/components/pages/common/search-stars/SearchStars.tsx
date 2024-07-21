import { useContext, useEffect, useState } from "react";
import {
  Grid,
  GridItem,
  SkeletonText,
  Box,
  Container,
  Skeleton,
  Text,
  FormControl,
  Flex,
  Tag,
  TagLabel,
  InputGroup,
  Input,
  Button,
  VStack,
} from "@chakra-ui/react";
import { Select as MultiSelect } from "chakra-react-select";
import ServiceProviderCard from "../../../organisms/service-provider-card/ServiceProviderCard";
import userServices from "../../../../services/userServices";
import useCustomToast from "../../../../hooks/useCustomToast";
import { useTranslation } from "react-i18next";
import styles from "./SearchStars.module.scss";
import { LookupsContext } from "../../../../contexts/LookupsContext";
import educationOptions from "../../../../constants/education.json";
import { FaGripHorizontal } from "react-icons/fa";
import { useParams } from "react-router-dom";

const SearchStars = () => {
  const { showToast } = useCustomToast();
  const { i18n } = useTranslation();
  const { id } = useParams();
  const { categories } = useContext(LookupsContext);
  const [providersList, setListProviders] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);
  const [selectedEducation, setSelectedEducation] = useState([]);
  const [experienceRange, setExperienceRange] = useState({ min: 0, max: 25 });
  const [filterTriggered, setFilterTriggered] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);

  const handleToggleCategory = (categoryId) => {
    console.log("mmmmmmmmmmmmmmmmmmmm", id);

    setSelectedCategory((prevSelectedCategory) => {
      const categoryIndex = prevSelectedCategory.indexOf(categoryId);
      if (categoryIndex !== -1) {
        return prevSelectedCategory.filter((id) => id !== categoryId);
      } else {
        return [...prevSelectedCategory, categoryId];
      }
    });
  };

  const handleGenderChange = (selectedGender) => {
    setSelectedGender(selectedGender);
  };

  const handleEducationChange = (selectedEducation) => {
    setSelectedEducation(selectedEducation);
  };

  const handleExperienceChange = (e) => {
    const { name, value } = e.target;
    setExperienceRange((prevRange) => ({
      ...prevRange,
      [name]: value,
    }));
  };

  const filterProviders = () => {
    let filteredProviders = providersList;

    if (selectedCategory.length > 0) {
      filteredProviders = filteredProviders.filter((provider) =>
        selectedCategory.includes(provider.catID)
      );
    }

    if (selectedGender.length > 0) {
      filteredProviders = filteredProviders.filter((provider) =>
        selectedGender.includes(provider.gender)
      );
    }

    if (selectedEducation.length > 0) {
      filteredProviders = filteredProviders.filter((provider) =>
        selectedEducation.includes(provider.education)
      );
    }

    filteredProviders = filteredProviders.filter(
      (provider) =>
        provider.experience >= experienceRange.min &&
        provider.experience <= experienceRange.max
    );

    if (searchQuery.trim()) {
      filteredProviders = filteredProviders.filter((provider) =>
        `${provider.fname} ${provider.lname}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }

    return filteredProviders;
  };

  const searchProviders = () => {
    setIsLoading(true);
    const filteredProviders = filterProviders();
    setListProviders(filteredProviders);
    setIsLoading(false);
  };

  const fetchData = async () => {
    const payload = {};
    try {
      const res = await userServices.getListOutProviders(payload);
      setListProviders(res.data);
    } catch (error) {
      showToast(error, { status: "error" });
    } finally {
      setIsLoading(false);
      setDataFetched(true);
    }
  };

  const handleFilterSubmit = () => {
    setFilterTriggered(true);
  };

  const handleClearFilters = () => {
    setSelectedCategory([]);
    setSelectedGender([]);
    setSelectedEducation([]);
    setExperienceRange({ min: 0, max: 25 });
    setSearchQuery("");
    fetchData();
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      await fetchData();
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (dataFetched && filterTriggered) {
      searchProviders();
      setFilterTriggered(false);
    }
  }, [filterTriggered, dataFetched]);

  useEffect(() => {
    if (dataFetched) {
      const timer = setTimeout(() => {
        if (id !== "all") {
          handleToggleCategory(id);
          setFilterTriggered(true);
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [id, dataFetched]);

  return (
    <>
      <Container maxW="6xl" style={{ display: "flex" }}>
        <Box flex="1">
          <Box
            maxW="full"
            mx="auto"
            mt={8}
            mb={8}
            borderRadius="lg"
            boxShadow="lg"
            bgRepeat={"no-repeat"}
            bgImage="/assets/images/image-voiceover.png"
            bgSize="contain"
            bgColor={"primary.800"}
            bgPosition="right"
            color="white"
            textAlign="center"
          >
            <VStack
              spacing={4}
              align={"flex-start"}
              bg="rgba(0, 0, 0, 0.1)"
              p={6}
              py={8}
              borderRadius="lg"
            >
              <Text fontSize="2xl" fontWeight="bold">
                Need to hire talent for your next project?
              </Text>
              <Text textAlign={"initial"} fontSize={"sm"} maxW={"2xl"}>
                Connect with the perfect creative for your next project with
                direct access to the largest network of actors, models, voice
                artists, creative freelancers, and crew.
              </Text>
            </VStack>
          </Box>
          <Text fontSize={"4xl"} fontWeight={900} mb={4}>
            Connect with Local Talent and Professionals
          </Text>
          <Box
            mb={8}
            padding={4}
            borderRadius={14}
            borderWidth={1}
            borderColor={"gray.300"}
            borderStyle={"solid"}
          >
            <Flex gap={2} mb={5} alignItems={"center"}>
              <FaGripHorizontal />
              <Text fontWeight={"bold"} fontSize={"md"}>
                Filter Results
              </Text>
            </Flex>
            <Grid
              mb={4}
              alignItems={"center"}
              templateColumns="repeat(auto-fit, minmax(100px, 1fr))"
              gap={4}
            >
              <GridItem>
                <Flex gap={2} alignItems={"center"} flexWrap={"wrap"}>
                  {categories.map((category) => {
                    const isSelected = selectedCategory.includes(category.id);
                    return (
                      <Tag
                        key={category.id}
                        size="md"
                        variant={"solid"}
                        bg={isSelected ? "black" : "gray.100"}
                        color={isSelected ? "white" : "black"}
                        borderRadius="full"
                        onClick={() => handleToggleCategory(category.id)}
                        cursor="pointer"
                      >
                        <TagLabel fontSize={"16px"} p={1}>
                          {i18n?.language?.includes("en")
                            ? category.name
                            : i18n?.language?.includes("ar")
                            ? category.nameAR
                            : category.nameRUS}
                        </TagLabel>
                      </Tag>
                    );
                  })}
                </Flex>
              </GridItem>
              <GridItem>
                <InputGroup bg="white" borderRadius={10}>
                  <Input
                    placeholder="Search Applicants by Name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    bg="transparent"
                    size={"sm"}
                    borderColor="gray.300"
                    _focus={{ borderColor: "gray.400", boxShadow: "none" }}
                    _placeholder={{ color: "gray.500" }}
                  />
                </InputGroup>
              </GridItem>
            </Grid>
            <Grid
              mb={4}
              templateColumns="repeat(auto-fit, minmax(170px, 1fr))"
              gap={4}
            >
              <GridItem>
                <FormControl>
                  <MultiSelect
                    size={"sm"}
                    isMulti={true}
                    className={styles.categoriesMultiSelect}
                    isSearchable={true}
                    onChange={(genders) =>
                      handleGenderChange(genders.map((gender) => gender.value))
                    }
                    placeholder="Gender"
                    name="gender"
                    value={selectedGender.map((gender) => ({
                      label:
                        gender === 1
                          ? "Male"
                          : gender === 2
                          ? "Female"
                          : "Not specified",
                      value: gender,
                    }))}
                    options={[
                      { label: "Not specified", value: 0 },
                      { label: "Male", value: 1 },
                      { label: "Female", value: 2 },
                    ]}
                  />
                </FormControl>
              </GridItem>
              {/* <GridItem>
                                <FormControl>
                                    <MultiSelect
                                        size={'sm'}
                                        isMulti={true}
                                        className={styles.categoriesMultiSelect}
                                        isSearchable={true}
                                        onChange={(educations) => handleEducationChange(educations.map((education) => education.value))}
                                        placeholder="Education"
                                        name="education"
                                        value={selectedEducation.map((education) => ({
                                            label: i18n?.language?.includes('en') ? education : i18n?.language?.includes('ar') ? education : education,
                                            value: education,
                                        }))}
                                        options={educationOptions.map((option) => ({
                                            label: i18n?.language?.includes('en') ? option.name : i18n?.language?.includes('ar') ? option.nameAR : option.nameRUS,
                                            value: option.name,
                                        }))}
                                    />
                                </FormControl>
                            </GridItem> */}
              <GridItem display={"flex"} alignItems={"center"} gap={2}>
                <Text fontSize={"sm"}>Experience</Text>
                <FormControl>
                  <Input
                    type="number"
                    name="min"
                    placeholder="Min"
                    value={experienceRange.min}
                    onChange={handleExperienceChange}
                    bg="white"
                    size={"sm"}
                  />
                </FormControl>
                <FormControl>
                  <Input
                    type="number"
                    name="max"
                    placeholder="Max"
                    value={experienceRange.max}
                    onChange={handleExperienceChange}
                    bg="white"
                    size={"sm"}
                  />
                </FormControl>
              </GridItem>
            </Grid>
            <Flex
              style={{
                paddingTop: 20,
                borderTopWidth: 2,
                borderStyle: "solid",
                borderColor: "#d4d4d4",
              }}
              justifyContent={"flex-end"}
              gap={2}
              mt={4}
            >
              <Button
                onClick={handleClearFilters}
                variant="outline"
                colorScheme="gray"
              >
                Clear
              </Button>
              <Button onClick={handleFilterSubmit} colorScheme="blue">
                Apply Filters
              </Button>
            </Flex>
          </Box>
          <Box mb={8}>
            {isLoading ? (
              <Grid
                templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
                gap={4}
              >
                {Array.from({ length: 5 }).map((_, index) => (
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
                ))}
              </Grid>
            ) : providersList.length ? (
              <Grid
                templateColumns="repeat(auto-fill, minmax(290px, 1fr))"
                gap={12}
              >
                {providersList.map((userProfile, index) => (
                  <GridItem key={index}>
                    <ServiceProviderCard
                      bio={userProfile.bio}
                      image={userProfile.profilePic}
                      name={userProfile.fname + " " + userProfile.lname}
                      providerID={userProfile.id}
                      userProfile={userProfile}
                      experience={userProfile.experience}
                      nationality={userProfile.nationality}
                      gender={userProfile.gender}
                    />
                  </GridItem>
                ))}
              </Grid>
            ) : (
              <Box minH={"12rem"} textAlign={"center"} mt={5}>
                <Text className="mt-5">
                  Sorry, we found no stars matching your search criteria.
                </Text>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SearchStars;
