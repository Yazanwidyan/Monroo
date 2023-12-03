import {
  Box,
  Text,
  Link,
  Divider,
  Grid,
  GridItem,
  Container,
  Image,
  Flex,
  Button,
  Icon,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

import {
  FaFileDownload,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa"; // Import social media icons
import PhotosGallery from "../../../organisms/photos-gallery/PhotosGallery";
import VideoGallery from "../../../organisms/vidoes-gallery/VideosGallery";
import EducationLookup from "../../../molecules/education-lookup/EducationLookup";
import MusicGenreLookup from "../../../molecules/music-genre-lookup/MusicGenreLookup";
import MusicalInstrumentLookup from "../../../molecules/musical-instrument-lookup/MusicalInstrumentLookup";
import VisaTypeLookup from "../../../molecules/visa-type-lookup/VisaTypeLookup";
import CountryLookup from "../../../molecules/country-lookup/CountryLookup";

const renderOptionalField = (label, value) => {
  if (
    value !== undefined &&
    value !== null &&
    value.length > 0 &&
    value[0] !== null
  ) {
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
        ) : label.toLowerCase().includes("link") ? (
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
  countryOfResidence,
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
        <CountryLookup countryCode={nationality} />
        {countryOfResidence && (
          <CountryLookup countryCode={countryOfResidence} />
        )}
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
  youtubelink,
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
  <Box>
    <Text fontSize={"md"} fontWeight="bold" mb={2}>
      Additional Information
    </Text>
    <Grid templateColumns="repeat(2, 1fr)" gap={2}>
      <Box>
        {education && <EducationLookup value={education} />}
        {musicGenres[0] !== null && <MusicGenreLookup value={musicGenres} />}
        {musicalInstruments[0] !== null && (
          <MusicalInstrumentLookup value={musicalInstruments} />
        )}
        {visaType && <VisaTypeLookup value={visaType} />}
        <Text fontWeight="400" fontSize="xs">
          resume:
        </Text>
        <Button
          variant={"ghost"}
          px={0}
          onClick={() => downloadResume(resume)}
          size="md"
          leftIcon={<Icon as={FaFileDownload} />}
        >
          Download Resume
        </Button>
        {renderOptionalField("Average Rate Per Hour", averageRatePerHour)}
        {renderOptionalField("Experience", experience)}
        {renderOptionalField("Special Skills", specialSkills)}
        {renderOptionalField("Spoken Language", spokenLanguage)}
      </Box>
      <Box>
        {renderOptionalField("Introduction Video Link", introductionVideoLink)}
        {renderOptionalField("YouTube Link", youtubelink)}
        {renderOptionalField("Portfolio", portfolio)}
        {openToWorkInCountry[0] !== "" && (
          <CountryLookup countryCode={openToWorkInCountry} />
        )}
      </Box>
    </Grid>
  </Box>
);

const downloadResume = (resume) => {
  const fileUrl = resume;
  const fileName = "resume.pdf";

  fetch(fileUrl)
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    })
    .catch((error) => console.error("Error downloading the file:", error));
};

const ServiceProviderProfileView = () => {
  const location = useLocation();
  window.scrollTo(0, 0);

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
    catID,
    subCatID,
    videos,
    audios,
    photos,
  } = location.state;

  const personalVidoes = [demoReel, oneMinuteVideo];

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
              {personalVidoes.map(
                (video, index) =>
                  video && (
                    <VideoGallery
                      title={"Video"}
                      key={index}
                      videoSrc={video}
                    />
                  )
              )}
            </Flex>
            <Divider my={2} />

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
            <Divider my={2} />

            <AdditionalInfo
              introductionVideoLink={introductionVideoLink}
              openToWorkInCountry={openToWorkInCountry}
              visaType={visaType}
              youtubelink={youtubelink}
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
    </Box>
  );
};

export default ServiceProviderProfileView;
