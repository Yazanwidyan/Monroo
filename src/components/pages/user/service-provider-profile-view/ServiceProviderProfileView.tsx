import {
  Box,
  Text,
  Link,
  VStack,
  Divider,
  Grid,
  GridItem,
  Container,
  Image,
  Flex,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa"; // Import social media icons
import PhotosGallery from "../../../organisms/photos-gallery/PhotosGallery";
import VideoGallery from "../../../organisms/vidoes-gallery/VideosGallery";

const personalVidoes = ["sjjj", "jjj"];

const renderOptionalField = (label, value) => {
  if (value) {
    return (
      <Box mb={2}>
        <Text fontWeight="400" fontSize="xs">
          {label}:
        </Text>
        {label.toLowerCase().includes("link") ? (
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
        <VideoGallery title={""} key={index} videoSrc={video} />
      ))}
    </Grid>
  </Box>
);

const AudiosSection = ({ audios }) => (
  <Box mt={6}>
    <Text fontWeight="bold" fontSize="xl">
      Videos:
    </Text>
    <Grid templateColumns="repeat(3, 1fr)" gap={4} mt={4}>
      {audios.map((audio, index) => (
        <Box key={index}>
          {/* Render video thumbnails or video player */}
          <iframe
            src={audio}
            title={`Video ${index + 1}`}
            width="300"
            height="200"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </Box>
      ))}
    </Grid>
  </Box>
);
const SocialMediaLinks = ({ instagram, linkedin, youtubelink }) => (
  <Box mt={2} mb={4}>
    <Text fontSize={"md"} fontWeight="bold" mb={4}>
      Social Media
    </Text>
    <Box display="flex" alignItems="center">
      {instagram && (
        <Link href={instagram} target="_blank" mx={2}>
          <FaInstagram size={24} />
        </Link>
      )}
      {linkedin && (
        <Link href={linkedin} target="_blank" mx={2}>
          <FaLinkedin size={24} />
        </Link>
      )}
      {youtubelink && (
        <Link href={youtubelink} target="_blank" mx={2}>
          <FaYoutube size={24} />
        </Link>
      )}
      {/* Add more social media icons and links as needed */}
    </Box>
  </Box>
);

const PersonalInfo = ({
  dob,
  email,
  phone,
  nationality,
  resume,
  gender,
  height,
  weight,
}) => (
  <Box>
    <Text fontSize="md" fontWeight="bold" mb={2}>
      Personal Information
    </Text>
    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
      <Box>
        {renderOptionalField("Email", email)}
        {renderOptionalField("Date of Birth", dob)}
        {renderOptionalField("Phone", phone)}
        {renderOptionalField("Nationality", nationality)}
      </Box>
      <Box>
        {renderOptionalField("Gender", gender === 1 ? "Male" : "Female")}
        {renderOptionalField("Height", `${height} cm`)}
        {renderOptionalField("Weight", `${weight} kg`)}
      </Box>
    </Grid>
  </Box>
);

const AdditionalInfo = ({
  education,
  introductionVideoLink,
  demoReel,
  youtubelink,
  oneMinuteVideo,
  visaType,
  openToWorkInCountry,
  spokenLanguage,
  specialSkills,
  musicalInstruments,
  musicGenres,
  experience,
  averageRatePerHour,
}) => (
  <Box>
    <Text fontSize={"md"} fontWeight="bold" mb={2}>
      Additional Information
    </Text>
    <Grid templateColumns="repeat(2, 1fr)" gap={2}>
      <Box>
        {renderOptionalField("Education", education)}
        {renderOptionalField("Average Rate Per Hour", averageRatePerHour)}
        {renderOptionalField("Experience", experience)}
        {renderOptionalField("MusicGenres", musicGenres)}
        {renderOptionalField("Musical Instruments", musicalInstruments)}
        {renderOptionalField("Special Skills", specialSkills)}
        {renderOptionalField("Spoken Language", spokenLanguage)}
      </Box>
      <Box>
        {renderOptionalField("Introduction Video Link", introductionVideoLink)}
        {renderOptionalField("Demo Reel", demoReel)}
        {renderOptionalField("YouTube Link", youtubelink)}
        {renderOptionalField("One Minute Video", oneMinuteVideo)}
        {renderOptionalField("Visa Type", visaType)}
        {renderOptionalField(
          "Open to Work In Country",
          openToWorkInCountry.join(", ")
        )}
      </Box>
    </Grid>
  </Box>
);

const ServiceProviderProfileView = () => {
  const location = useLocation();

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
    workLink,
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
    catID,
    subCatID,
    videos,
    audios,
    photos,
  } = location.state;

  console.log("location.state", location.state);

  return (
    <Box bg="gray.200" p="4">
      <Container maxW={"6xl"}>
        <Grid templateColumns="1fr 3fr" gap={8}>
          <GridItem colSpan={1}>
            <Box>
              <Image
                borderRadius={"xl"}
                src={
                  profilePic ||
                  "https://www.zica.co.zm/wp-content/uploads/2021/02/dummy-profile-image.png"
                }
                alt={`${fname} ${lname}`}
                boxSize={"100%"}
              />
            </Box>
            {photos.length > 0 && <PhotosSection photos={photos} />}
            {videos.length > 0 && <VideosSection videos={videos} />}
            {audios.length > 0 && <AudiosSection audios={audios} />}
          </GridItem>
          {/* Basic details section ends */}

          {/* Profile sections */}
          <GridItem colSpan={1}>
            <Text fontWeight="bold" fontSize="3xl">
              {fname} {lname}
            </Text>
            <Text fontSize="md">{bio}</Text>
            <SocialMediaLinks
              instagram={instagram}
              linkedin={linkedin}
              youtubelink={youtubelink}
            />
            <Divider my={2} />
            <Flex gap={4}>
              {personalVidoes.map((video, index) => (
                <VideoGallery
                  title={"Intro video"}
                  key={index}
                  videoSrc={video}
                />
              ))}
            </Flex>
            <Divider my={2} />

            <PersonalInfo
              dob={dob}
              email={email}
              phone={phone}
              nationality={nationality}
              gender={gender}
              height={height}
              weight={weight}
              resume={resume}
              // Other personal info props...
            />
            <Divider my={2} />

            <AdditionalInfo
              demoReel={demoReel}
              introductionVideoLink={introductionVideoLink}
              oneMinuteVideo={oneMinuteVideo}
              openToWorkInCountry={openToWorkInCountry}
              visaType={visaType}
              youtubelink={youtubelink}
              education={education}
              spokenLanguage={spokenLanguage}
              specialSkills={specialSkills}
              averageRatePerHour={averageRatePerHour}
              experience={experience}
              musicGenres={musicGenres}
              musicalInstruments={musicalInstruments}

              // Other additional info props...
            />
            {/* Other sections/components */}
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default ServiceProviderProfileView;
