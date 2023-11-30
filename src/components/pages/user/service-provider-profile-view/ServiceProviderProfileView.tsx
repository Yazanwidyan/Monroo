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
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa"; // Import social media icons

const profileData = {
  audios: [],
  averageRatePerHour: "20",
  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  catID: "8347abe2-11ed-4e13-b0c4-5df0e7c9368c",
  countryOfResidence: "US",
  demoReel: "https://www.demoreel.com/",
  dob: "1990-05-15",
  education: "Bachelor's Degree",
  email: "example@email.com",
  experience: "8",
  fcmToken: "FCM_TOKEN_HERE",
  fname: "John",
  gender: 1,
  height: "175",
  id: "f89b0e63-d1c1-455c-831d-4d2c679efe6b",
  instagram: "https://www.instagram.com/example/",
  introductionVideoLink: "https://www.introvideo.com/",
  isActive: true,
  isAmodel: false,
  linkedin: "https://www.linkedin.com/in/example/",
  lname: "Doe",
  musicGenres: ["Pop", "Rock"],
  musicalInstruments: ["Guitar", "Piano"],
  nationality: "US",
  oneMinuteVideo: "https://www.oneminutevideo.com/",
  openToWorkInCountry: ["US", "CA"],
  password: "PASSWORD_HASH_HERE",
  phone: "+1234567890",
  photos: [
    "../../src/assets/images/model.jpeg",
    "../../src/assets/images/model.jpeg",
  ],
  portfolio: "https://www.portfolio.com/",
  profilePic: "../../src/assets/images/model.jpeg",
  registerDate: "2023-11-28",
  resume: "https://www.resume.com/",
  specialSkills: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  spokenLanguage: "English",
  subCatID: [
    {
      id: "ecd45956-b1bb-4b4b-bdfb-b3c81597e53e",
      name: "Makeup Artist",
      nameAR: "خبيرة تجميل",
    },
  ],
  token: "TOKEN_HERE",
  username: "johndoe",
  videos: [
    "https://www.youtube.com/watch?v=D0UnqGm_miA&ab_channel=SolutionsForAll",
  ],
  visaType: "Work Visa",
  weight: "70",
  workLink: "https://www.worklink.com/",
  youtubelink: "https://www.youtube.com/",
};

const renderOptionalField = (label, value) => {
  if (value) {
    return (
      <Box>
        <Text fontWeight="bold">{label}:</Text>
        {label.toLowerCase().includes("link") ? (
          <Link href={value} target="_blank">
            {value}
          </Link>
        ) : (
          <Text>{value}</Text>
        )}
      </Box>
    );
  }
  return null;
};

const PhotosSection = ({ photos }) => (
  <Box mt={6}>
    <Text fontWeight="bold" fontSize="xl">
      Photos:
    </Text>
    <Grid templateColumns="repeat(4, 1fr)" gap={4} mt={4}>
      {photos.map((photo, index) => (
        <Box key={index}>
          <Image src={photo} alt={`Photo ${index + 1}`} />
        </Box>
      ))}
    </Grid>
  </Box>
);

const VideosSection = ({ videos }) => (
  <Box mt={6}>
    <Text fontWeight="bold" fontSize="xl">
      Videos:
    </Text>
    <Grid templateColumns="repeat(3, 1fr)" gap={4} mt={4}>
      {videos.map((video, index) => (
        <Box key={index}>
          {/* Render video thumbnails or video player */}
          <iframe
            src={video}
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
  <Box mt={4}>
    <Text fontWeight="bold">Social Media:</Text>
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
  phone,
  nationality,
  linkedin,
  resume,
  gender,
  height,
  weight,
}) => (
  <Box>
    <Text fontSize="xl" fontWeight="bold" mb={4}>
      Personal Information:
    </Text>
    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
      <Box>
        {renderOptionalField("Date of Birth", dob)}
        {renderOptionalField("Phone", phone)}
        {renderOptionalField("Nationality", nationality)}
        {renderOptionalField("LinkedIn", linkedin)}
        {renderOptionalField("Resume", resume)}
      </Box>
      <Box>
        <Text fontWeight="bold">Gender:</Text>
        <Text>{gender === 1 ? "Male" : "Female"}</Text>
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
}) => (
  <Box>
    <Text fontSize={"xl"} fontWeight="bold" mb={4}>
      Additional Information:
    </Text>
    <Grid templateColumns="repeat(2, 1fr)" gap={2}>
      <Box>
        {renderOptionalField("Education", education)}
        {renderOptionalField("Introduction Video Link", introductionVideoLink)}
        {renderOptionalField("Demo Reel", demoReel)}
        {renderOptionalField("YouTube Link", youtubelink)}
        {renderOptionalField("One Minute Video", oneMinuteVideo)}
      </Box>
      <Box>
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
    registerDate,
    isActive,
    isAmodel,
    fcmToken,
    catID,
    subCatID,
    id,
    token,
    videos,
    audios,
    photos,
    password,
  } = location.state;

  console.log("location.state", location.state);

  return (
    <Box bg="gray.200" p="4">
      <Container maxW={"8xl"}>
        <Grid templateColumns="1fr 3fr" gap={4}>
          {/* Profile Picture and basic details */}
          <GridItem colSpan={1}>
            <Box>
              <Image
                borderRadius={"xl"}
                src={
                  profilePic
                    ? profilePic
                    : "https://www.zica.co.zm/wp-content/uploads/2021/02/dummy-profile-image.png"
                }
                alt={`${fname} ${lname}`}
                style={{ maxWidth: "350px", height: "auto" }} // Adjust the maxWidth for the desired size
              />
            </Box>
            {photos.length > 0 && <PhotosSection photos={photos} />}
            {/* Videos Section */}
            {videos.length > 0 && <VideosSection videos={videos} />}
          </GridItem>
          {/* Basic details section ends */}

          {/* Profile sections */}
          <GridItem colSpan={1}>
            <Text fontWeight="bold" fontSize="3xl">
              {fname} {lname}
            </Text>
            <Text fontWeight="300" fontSize="md">
              {email}
            </Text>
            <Text fontSize="lg">{bio}</Text>
            <SocialMediaLinks
              instagram={instagram}
              linkedin={linkedin}
              youtubelink={youtubelink}
            />
            <Divider my={4} />
            <PersonalInfo
              dob={dob}
              phone={phone}
              nationality={nationality}
              gender={gender}
              height={height}
              weight={weight}
              linkedin={linkedin}
              resume={resume}
              // Other personal info props...
            />
            <Divider my={4} />

            <AdditionalInfo
              demoReel={demoReel}
              introductionVideoLink={introductionVideoLink}
              oneMinuteVideo={oneMinuteVideo}
              openToWorkInCountry={openToWorkInCountry}
              visaType={visaType}
              youtubelink={youtubelink}
              education={education}
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
