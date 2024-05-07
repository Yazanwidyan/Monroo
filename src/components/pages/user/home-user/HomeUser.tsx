import React, { useContext, useEffect, useState } from 'react';
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
    InputLeftElement,
    Icon,
    Text,
    FormControl,
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
} from '@chakra-ui/react'; // Import Slider components from Chakra UI
import { debounce } from 'lodash';
import { Select as MultiSelect } from 'chakra-react-select';
import ServiceProviderCard from '../../../organisms/service-provider-card/ServiceProviderCard';
import { UserContext } from '../../../../contexts/UserContext';
import userServices from '../../../../services/userServices';
import useCustomToast from '../../../../hooks/useCustomToast';
import { FaSearch } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import styles from './HomeUser.module.scss';
import { LookupsContext } from '../../../../contexts/LookupsContext';
import educationOptions from '../../../../constants/education.json';

const HomeUser = () => {
    const { user } = useContext(UserContext);
    const { showToast } = useCustomToast();
    const { i18n } = useTranslation();

    const { categories } = useContext(LookupsContext);
    const [providersList, setListProviders] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedGender, setSelectedGender] = useState([]);
    const [selectedEducation, setSelectedEducation] = useState([]);
    const [selectedExperience, setSelectedExperience] = useState([0, 25]); // Default experience range

    const handleCategoryChange = (selectedCategoryIds) => {
        setSelectedCategory(selectedCategoryIds);
    };

    const handleGenderChange = (selectedGender) => {
        setSelectedGender(selectedGender);
    };

    const handleEducationChange = (selectedEducation) => {
        setSelectedEducation(selectedEducation);
    };

    const handleExperienceChange = (values: number[]) => {
        setSelectedExperience(values);
    };

    const filterProviders = () => {
        let filteredProviders = providersList;

        if (selectedCategory.length > 0) {
            filteredProviders = filteredProviders.filter((provider) => selectedCategory.includes(provider.catID));
        }

        if (selectedGender.length > 0) {
            filteredProviders = filteredProviders.filter((provider) => selectedGender.includes(provider.gender));
        }

        if (selectedEducation.length > 0) {
            filteredProviders = filteredProviders.filter((provider) => selectedEducation.includes(provider.education));
        }
        filteredProviders = filteredProviders.filter((provider) => provider.experience >= selectedExperience[0] && provider.experience <= selectedExperience[1]);
        return filteredProviders;
    };

    const fetchData = async () => {
        const payload = {
            userID: user.id,
        };
        try {
            const res = await userServices.getListProviders(payload);
            setListProviders(res.data);
        } catch (error) {
            showToast(error, { status: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    const searchProviders = async () => {
        setIsLoading(true);
        const filteredProviders = filterProviders();
        setListProviders(filteredProviders);
        setIsLoading(false);
    };

    const debouncedSearchProviders = debounce(searchProviders, 500);

    useEffect(() => {
        if (searchQuery !== '' || selectedCategory.length !== 0 || selectedGender.length !== 0 || selectedEducation.length !== 0) {
            debouncedSearchProviders();
        } else {
            fetchData();
            setIsLoading(false);
        }

        return () => debouncedSearchProviders.cancel();
    }, [searchQuery, selectedCategory, selectedGender, selectedEducation, selectedExperience]);

    useEffect(() => {
        const filteredProviders = filterProviders();
        setListProviders(filteredProviders);
    }, [selectedGender, selectedEducation, selectedExperience]);

    return (
        <>
            <Box p={4}>
                <Container maxW="5xl">
                    <Text color={'gray.600'} textTransform={'capitalize'}>
                        Hi, {user.name}
                    </Text>
                </Container>
            </Box>
            <Container maxW="5xl" style={{ display: 'flex' }}>
                <Box flex="1">
                    <Box mb={8} padding={4} borderRadius={10} bg={'gray.100'}>
                        {/* <InputGroup mb={4} bg="white" borderRadius={10}>
                            <Input
                                placeholder="Search by name or description"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                bg="transparent"
                                border="none"
                                borderRadius={0}
                                borderColor="gray.300"
                                _focus={{ borderColor: 'gray.400', boxShadow: 'none' }}
                                _placeholder={{ color: 'gray.500' }}
                            />
                            <InputLeftElement pointerEvents="none">
                                <Icon as={FaSearch} color="gray.400" />
                            </InputLeftElement>
                        </InputGroup> */}

                        <Stack direction="row" spacing={4} mb={4} align="center">
                            <FormControl>
                                <MultiSelect
                                    isMulti={true}
                                    className={styles.categoriesMultiSelect}
                                    isSearchable={true}
                                    onChange={(categories) => handleCategoryChange(categories.map((category) => category.value))}
                                    placeholder="Select category"
                                    name="catID"
                                    options={categories.map((category) => ({
                                        label: i18n?.language?.includes('en') ? category.name : i18n?.language?.includes('ar') ? category.nameAR : category.nameRUS,
                                        value: category.id,
                                        catID: category.id,
                                        name: category.name,
                                        nameAR: category.nameAR,
                                        nameRUS: category.nameRUS,
                                    }))}
                                />
                            </FormControl>
                            <FormControl>
                                <MultiSelect
                                    isMulti={true}
                                    className={styles.categoriesMultiSelect}
                                    isSearchable={true}
                                    onChange={(genders) => handleGenderChange(genders.map((gender) => gender.value))}
                                    placeholder="Select gender"
                                    name="gender"
                                    options={[
                                        { label: 'Not specified', value: 0 },
                                        { label: 'Male', value: 1 },
                                        { label: 'Female', value: 2 },
                                    ]}
                                />
                            </FormControl>
                        </Stack>
                        <FormControl mb={4}>
                            <MultiSelect
                                isMulti={true}
                                className={styles.categoriesMultiSelect}
                                isSearchable={true}
                                onChange={(educations) => handleEducationChange(educations.map((education) => education.value))}
                                placeholder="Select education"
                                name="education"
                                options={educationOptions.map((option) => ({
                                    label: i18n?.language?.includes('en') ? option.name : i18n?.language?.includes('ar') ? option.nameAR : option.nameRUS,
                                    value: option.name,
                                }))}
                            />
                        </FormControl>
                        {/*} <Box width={'100%'} px={1}>
                            <FormControl>
                                <Text fontSize="sm" color="gray.500">
                                    Experience: {selectedExperience[0]} - {selectedExperience[1]} yrs
                                </Text>
                                <RangeSlider aria-label={['min', 'max']} defaultValue={[0, 25]} min={0} max={25} onChange={(values) => handleExperienceChange(values)}>
                                    <RangeSliderTrack>
                                        <RangeSliderFilledTrack />
                                    </RangeSliderTrack>
                                    <RangeSliderThumb index={0} />
                                    <RangeSliderThumb index={1} />
                                </RangeSlider>
                            </FormControl>
                        </Box>*/}
                    </Box>

                    <Box mb={8}>
                        {isLoading ? (
                            <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={4}>
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <GridItem key={index}>
                                        <Skeleton height="300px" />
                                        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
                                        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
                                        <Skeleton mt={4} height="40px" width="200px" />
                                    </GridItem>
                                ))}
                            </Grid>
                        ) : providersList.length ? (
                            <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={4}>
                                {providersList.map((userProfile, index) => (
                                    <GridItem key={index}>
                                        <ServiceProviderCard
                                            bio={userProfile.bio}
                                            image={userProfile.profilePic}
                                            name={userProfile.fname + ' ' + userProfile.lname}
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
                            <Box textAlign={'center'} mt={5}>
                                <Text className="mt-5">Sorry, we found no stars matching your search criteria.</Text>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default HomeUser;
