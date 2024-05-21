import { useContext, useEffect, useState } from 'react';
import { Grid, GridItem, SkeletonText, Stack, Box, Container, Skeleton, Text, FormControl, Flex, Tag, TagLabel, InputGroup, Input, Button } from '@chakra-ui/react';
import { debounce } from 'lodash';
import { Select as MultiSelect } from 'chakra-react-select';
import ServiceProviderCard from '../../../organisms/service-provider-card/ServiceProviderCard';
import { UserContext } from '../../../../contexts/UserContext';
import userServices from '../../../../services/userServices';
import useCustomToast from '../../../../hooks/useCustomToast';
import { useTranslation } from 'react-i18next';
import styles from './HomeUser.module.scss';
import { LookupsContext } from '../../../../contexts/LookupsContext';
import educationOptions from '../../../../constants/education.json';
import { FaGripHorizontal } from 'react-icons/fa';

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
    const [experienceRange, setExperienceRange] = useState({ min: 0, max: 25 });
    const [filterTriggered, setFilterTriggered] = useState(false);

    const handleToggleCategory = (categoryId) => {
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
            filteredProviders = filteredProviders.filter((provider) => selectedCategory.includes(provider.catID));
        }

        if (selectedGender.length > 0) {
            filteredProviders = filteredProviders.filter((provider) => selectedGender.includes(provider.gender));
        }

        if (selectedEducation.length > 0) {
            filteredProviders = filteredProviders.filter((provider) => selectedEducation.includes(provider.education));
        }

        filteredProviders = filteredProviders.filter((provider) => provider.experience >= experienceRange.min && provider.experience <= experienceRange.max);

        return filteredProviders;
    };

    const searchProviders = async () => {
        setIsLoading(true);
        const filteredProviders = filterProviders();
        setListProviders(filteredProviders);
        setIsLoading(false);
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

    const handleFilterSubmit = () => {
        setFilterTriggered(true);
        searchProviders();
    };

    const handleClearFilters = () => {
        setSelectedCategory([]);
        setSelectedGender([]);
        setSelectedEducation([]);
        setExperienceRange({ min: 0, max: 25 });
        setSearchQuery('');
        fetchData();
    };

    useEffect(() => {
        if (filterTriggered) {
            searchProviders();
            setFilterTriggered(false);
        } else {
            fetchData();
        }
    }, [filterTriggered]);

    return (
        <>
            <Container maxW="5xl" style={{ display: 'flex' }}>
                <Box flex="1" mt={8}>
                    <Text fontSize={'5xl'} fontWeight={900} mb={4}>
                        {/* Find Local Talent for Hire */}
                    </Text>
                    <Box mb={8} padding={4} borderRadius={14} borderWidth={1} borderColor={'gray.300'} borderStyle={'solid'}>
                        <Flex gap={2} mb={5} alignItems={'center'}>
                            <FaGripHorizontal />
                            <Text fontWeight={'bold'} fontSize={'md'}>
                                Filter Results
                            </Text>
                        </Flex>
                        <Grid mb={4} alignItems={'center'} templateColumns="repeat(auto-fit, minmax(100px, 1fr))" gap={4}>
                            <GridItem>
                                <Flex gap={2} alignItems={'center'} flexWrap={'wrap'}>
                                    {categories.map((category) => {
                                        const isSelected = selectedCategory.includes(category.id);
                                        return (
                                            <Tag
                                                key={category.id}
                                                size="md"
                                                variant={'solid'}
                                                bg={isSelected ? 'black' : 'gray.100'}
                                                color={isSelected ? 'white' : 'black'}
                                                borderRadius="full"
                                                onClick={() => handleToggleCategory(category.id)}
                                                cursor="pointer"
                                            >
                                                <TagLabel fontSize={'16px'} p={1}>
                                                    {i18n?.language?.includes('en') ? category.name : i18n?.language?.includes('ar') ? category.nameAR : category.nameRUS}
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
                                        size={'sm'}
                                        borderRadius={7}
                                        borderColor="gray.300"
                                        _focus={{ borderColor: 'gray.400', boxShadow: 'none' }}
                                        _placeholder={{ color: 'gray.500' }}
                                    />
                                </InputGroup>
                            </GridItem>
                        </Grid>
                        <Grid mb={4} templateColumns="repeat(auto-fit, minmax(170px, 1fr))" gap={4}>
                            <GridItem>
                                <FormControl>
                                    <MultiSelect
                                        size={'sm'}
                                        isMulti={true}
                                        className={styles.categoriesMultiSelect}
                                        isSearchable={true}
                                        onChange={(genders) => handleGenderChange(genders.map((gender) => gender.value))}
                                        placeholder="Gender"
                                        name="gender"
                                        options={[
                                            { label: 'Not specified', value: 0 },
                                            { label: 'Male', value: 1 },
                                            { label: 'Female', value: 2 },
                                        ]}
                                    />
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <MultiSelect
                                        size={'sm'}
                                        isMulti={true}
                                        className={styles.categoriesMultiSelect}
                                        isSearchable={true}
                                        onChange={(educations) => handleEducationChange(educations.map((education) => education.value))}
                                        placeholder="Education"
                                        name="education"
                                        options={educationOptions.map((option) => ({
                                            label: i18n?.language?.includes('en') ? option.name : i18n?.language?.includes('ar') ? option.nameAR : option.nameRUS,
                                            value: option.name,
                                        }))}
                                    />
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <Input type="number" name="min" placeholder="Min Experience" value={experienceRange.min} onChange={handleExperienceChange} bg="white" size={'sm'} />
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <Input type="number" name="max" placeholder="Max Experience" value={experienceRange.max} onChange={handleExperienceChange} bg="white" size={'sm'} />
                                </FormControl>
                            </GridItem>
                        </Grid>
                        <Flex style={{ paddingTop: 20, borderTopWidth: 2, borderStyle: 'solid', borderColor: '#d4d4d4' }} justifyContent={'flex-end'} gap={2} mt={4}>
                            <Button onClick={handleClearFilters} variant="outline" colorScheme="gray">
                                Clear
                            </Button>
                            <Button onClick={handleFilterSubmit} colorScheme="blue">
                                Apply Filters
                            </Button>
                        </Flex>
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
                            <Grid templateColumns="repeat(auto-fill, minmax(240px, 1fr))" gap={4}>
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
