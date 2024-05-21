import { Box, Text, Link, Grid, GridItem, Container, Image, Flex, Button, Icon } from '@chakra-ui/react';

import { FaFileDownload, FaInstagram, FaLinkedin, FaPencilAlt, FaYoutube } from 'react-icons/fa'; // Import social media icons
import PhotosGallery from '../../../organisms/photos-gallery/PhotosGallery';
import VideoGallery from '../../../organisms/vidoes-gallery/VideosGallery';
import EducationLookup from '../../../molecules/education-lookup/EducationLookup';
import MusicGenreLookup from '../../../molecules/music-genre-lookup/MusicGenreLookup';
import MusicalInstrumentLookup from '../../../molecules/musical-instrument-lookup/MusicalInstrumentLookup';
import VisaTypeLookup from '../../../molecules/visa-type-lookup/VisaTypeLookup';
import AudiosGallery from '../../../organisms/audios-gallery/AudiosGallery';
// import userServices from '../../../../services/userServices';
import { useContext, useEffect, useState } from 'react';
import StarRating from '../../../molecules/star-rating/StarRating';
import { UserContext } from '../../../../contexts/UserContext';
import providerServices from '../../../../services/providerServices';
import EditProfileModal from './EditProfileModal';

const headerHeight = 70; // Height of the header in pixels
const footerHeight = 100; // Height of the footer in pixels

const minHeight = `calc(100vh - ${headerHeight}px - ${footerHeight}px)`;

const renderOptionalField = (label, value) => {
    if (value !== undefined && value !== null && value !== 'null' && value?.length > 0 && value[0] !== null && value !== '0') {
        return (
            <Box mb={2}>
                <Text fontWeight="400" fontSize="xs">
                    {label}:
                </Text>
                {Array.isArray(value) ? (
                    <Box>
                        {value.map((item, index) => (
                            <Text key={index} fontSize="sm" fontWeight={600}>
                                {item}
                            </Text>
                        ))}
                    </Box>
                ) : label.toLowerCase().includes('link') ? (
                    <Link href={value} target="_blank" fontSize="sm" color="blue.500">
                        {value}
                    </Link>
                ) : (
                    <Text fontSize="sm" fontWeight={600}>
                        {value}
                    </Text>
                )}
            </Box>
        );
    }
    return null;
};

const PhotosSection = ({ photos }) => <PhotosGallery photos={photos} />;

const VideosSection = ({ videos }) => (
    <Box mt={6}>
        <Text fontWeight="bold" fontSize="xl">
            Videos
        </Text>
        <Grid templateColumns="repeat(1, 1fr)" gap={4} mt={4}>
            {videos.map((video, index) => (
                <VideoGallery title={''} key={index} videoSrc={video} />
            ))}
        </Grid>
    </Box>
);

const AudiosSection = ({ audios }) => (
    <Box mt={6}>
        <Text fontWeight="bold" fontSize="xl">
            audios
        </Text>
        <Grid templateColumns="repeat(1, 1fr)" gap={4} mt={4}>
            {audios.map((audio, index) => (
                <AudiosGallery title={''} key={index} audioSrc={audio} />
            ))}
        </Grid>
    </Box>
);
const SocialMediaLinks = ({ instagram, linkedin, youtubelink }) => (
    <Box mt={2} mb={4}>
        <Text fontSize={'md'} fontWeight="bold" mb={2}>
            Social Media
        </Text>
        <Box display="flex" alignItems="center">
            {instagram && (
                <Link href={`https://www.instagram.com/${instagram}`} target="_blank" mx={2}>
                    <FaInstagram size={24} />
                </Link>
            )}
            {linkedin && (
                <Link href={`https://www.linkedin.com/in/${linkedin}`} target="_blank" mx={2}>
                    <FaLinkedin size={24} />
                </Link>
            )}
            {youtubelink && (
                <Link href={`https://www.youtube.com/channel/${youtubelink}`} target="_blank" mx={2}>
                    <FaYoutube size={24} />
                </Link>
            )}
        </Box>
    </Box>
);

const PersonalInfo = ({ dob, email, phone, nationality, countryOfResidence, gender, height, weight }) => (
    <Box mb={4}>
        <Text fontSize="md" fontWeight="bold" mb={2}>
            Personal Information
        </Text>
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <Box>
                {renderOptionalField('Email', email)}
                {renderOptionalField('Date of birth', dob)}
                {renderOptionalField('Nationality', nationality)}
                {renderOptionalField('Height', `${height}`)}
            </Box>
            <Box>
                {renderOptionalField('Phone', phone)}
                {renderOptionalField('Gender', gender == 1 ? 'Male' : gender == 2 ? 'Female' : '')}
                {renderOptionalField('Country of residence', countryOfResidence)}
                {renderOptionalField('Weight', `${weight}`)}
            </Box>
        </Grid>
    </Box>
);

const AdditionalInfo = ({
    education,
    introductionVideoLink,
    visaType,
    openToWorkInCountry,
    spokenLanguage,
    specialSkills,
    musicalInstruments,
    musicGenres,
    experience,
    averageRatePerHour,
    resume,
    portfolio,
}) => (
    <Box mb={4}>
        <Text fontSize={'md'} fontWeight="bold" mb={2}>
            Additional Information
        </Text>
        <Grid templateColumns="repeat(2, 1fr)" gap={2}>
            <Box>
                {visaType ? <VisaTypeLookup value={visaType} /> : null}
                {renderOptionalField('Open to work in countries', openToWorkInCountry?.[0])}
                {renderOptionalField('Average rate per hour', averageRatePerHour)}
                {renderOptionalField('Experience', experience)}
                {renderOptionalField('Special skills', specialSkills)}
                {musicGenres?.length && musicGenres?.[0] !== null ? <MusicGenreLookup value={musicGenres} /> : null}
                {musicalInstruments?.length && musicalInstruments?.[0] !== null ? <MusicalInstrumentLookup value={musicalInstruments} /> : null}
            </Box>
            <Box>
                {education && <EducationLookup value={education} />}

                {resume && (
                    <>
                        <Text fontWeight="400" fontSize="xs">
                            Resume:
                        </Text>
                        <Button variant={'icon'} p={0} h={30} onClick={() => downloadResume(resume)} size="md" leftIcon={<Icon as={FaFileDownload} />}></Button>
                    </>
                )}
                {portfolio && (
                    <>
                        <Text fontWeight="400" fontSize="xs">
                            Portfolio:
                        </Text>
                        <Button variant={'icon'} p={0} h={30} onClick={() => downloadResume(portfolio)} size="md" leftIcon={<Icon as={FaFileDownload} />}></Button>
                    </>
                )}
                {renderOptionalField('Spoken language', spokenLanguage)}
                {renderOptionalField('Introduction video link', introductionVideoLink)}
            </Box>
        </Grid>
    </Box>
);

const downloadResume = (resume) => {
    const fileUrl = resume;
    const fileName = 'file.pdf';

    fetch(fileUrl)
        .then((response) => response.blob())
        .then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        })
        .catch((error) => console.error('Error downloading the file:', error));
};

const ServiceProviderProfileView = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to manage modal open/close
    const [providerProfile, setProviderProfile] = useState({});
    const [starsAvarage, setStarsAvarage] = useState(null);

    const { user } = useContext(UserContext);

    const openEditModal = () => {
        setIsEditModalOpen(true);
    };

    // Function to close the edit modal
    const closeEditModal = () => {
        setIsEditModalOpen(false);
        fetchProviderProfile();
    };

    window.scrollTo(0, 0);

    const fetchProviderProfile = async () => {
        try {
            const res = await providerServices.getAllProvider();
            const currentUser = res.data.find((users) => users.id === user.id);
            setProviderProfile(currentUser);
        } catch (error) {
            console.log(error);
        }
    };
    const fetchReviews = async () => {
        try {
            const res = await providerServices.getMyReviews();
            const totalStars = res?.data?.reduce((acc, review) => acc + review?.stars, 0);
            const averageRating = totalStars / res?.data?.length;
            setStarsAvarage(averageRating);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProviderProfile();
        fetchReviews();
    }, []);

    const {
        fname,
        lname,
        email,
        bio,
        instagram,
        dob,
        education,
        phone,
        nationality,
        countryOfResidence,
        linkedin,
        portfolio,
        resume,
        introductionVideoLink,
        demoReel,
        youtubelink,
        oneMinuteVideo,
        profilePic,
        averageRatePerHour,
        experience,
        gender,
        height,
        weight,
        musicGenres,
        musicalInstruments,
        specialSkills,
        spokenLanguage,
        visaType,
        openToWorkInCountry,
        videos,
        audios,
        photos,
    } = providerProfile as any;

    const personalVidoes = [demoReel, oneMinuteVideo];

    return (
        <Box bg="primary.50" p="4" pb={8} minHeight={minHeight}>
            <Container maxW={'6xl'}>
                <Box textAlign={'end'} mb={'-10'}>
                    <Button leftIcon={<FaPencilAlt />} color={'black'} bg={'white'} onClick={openEditModal}>
                        <Text fontSize={'sm'}>Edit my profile</Text>
                    </Button>
                </Box>
                <Grid templateColumns="1fr 3fr" gap={8}>
                    <GridItem colSpan={1}>
                        <Box>
                            <Image
                                height={260}
                                width={'100%'}
                                borderRadius={'xl'}
                                src={profilePic || 'https://www.zica.co.zm/wp-content/uploads/2021/02/dummy-profile-image.png'}
                                alt={`${fname} ${lname}`}
                            />
                        </Box>
                        {photos?.length > 0 && <PhotosSection photos={photos} />}
                        {videos?.length > 0 && <VideosSection videos={videos} />}
                        {audios?.length > 0 && <AudiosSection audios={audios} />}
                    </GridItem>
                    {/* Basic details section ends */}

                    {/* Profile sections */}
                    <GridItem colSpan={1}>
                        <Text fontWeight="bold" fontSize="3xl">
                            {fname} {lname}
                        </Text>
                        {<StarRating rating={starsAvarage ? starsAvarage : 0} />}
                        <Text mb={2} fontSize="md">
                            {bio}
                        </Text>
                        {instagram || linkedin || youtubelink ? <SocialMediaLinks instagram={instagram} linkedin={linkedin} youtubelink={youtubelink} /> : null}
                        {(personalVidoes[0] || personalVidoes[1]) && (
                            <Flex mb={4} gap={4}>
                                {personalVidoes.map((video, index) => video && <VideoGallery title={'Video'} key={index} videoSrc={video} />)}
                            </Flex>
                        )}
                        <PersonalInfo
                            dob={dob}
                            email={email}
                            phone={phone}
                            nationality={nationality}
                            countryOfResidence={countryOfResidence}
                            gender={gender}
                            height={height}
                            weight={weight}

                            // Other personal info props...
                        />

                        <AdditionalInfo
                            introductionVideoLink={introductionVideoLink}
                            openToWorkInCountry={openToWorkInCountry}
                            visaType={visaType}
                            spokenLanguage={spokenLanguage}
                            specialSkills={specialSkills}
                            averageRatePerHour={averageRatePerHour}
                            experience={experience}
                            musicGenres={musicGenres}
                            musicalInstruments={musicalInstruments}
                            education={education}
                            resume={resume}
                            portfolio={portfolio}
                        />
                    </GridItem>
                </Grid>
            </Container>
            <EditProfileModal isOpen={isEditModalOpen} onClose={closeEditModal} providerProfile={providerProfile} />
        </Box>
    );
};

export default ServiceProviderProfileView;
