import { Box, Image, Text, Link, VStack } from "@chakra-ui/react";

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
  photos: [],
  portfolio: "https://www.portfolio.com/",
  profilePic: "https://www.profilepic.com/",
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
  videos: [],
  visaType: "Work Visa",
  weight: "70",
  workLink: "https://www.worklink.com/",
  youtubelink: "https://www.youtube.com/",
};

const ServiceProviderProfileView = () => {
  const {
    audios,
    averageRatePerHour,
    bio,
    catID,
    countryOfResidence,
    demoReel,
    dob,
    education,
    email,
    experience,
    fcmToken,
    fname,
    gender,
    height,
    id,
    instagram,
    introductionVideoLink,
    isActive,
    isAmodel,
    linkedin,
    lname,
    musicGenres,
    musicalInstruments,
    nationality,
    oneMinuteVideo,
    openToWorkInCountry,
    password,
    phone,
    photos,
    portfolio,
    profilePic,
    registerDate,
    resume,
    specialSkills,
    spokenLanguage,
    subCatID,
    token,
    username,
    videos,
    visaType,
    weight,
    workLink,
    youtubelink,
  } = profileData;

  return (
    <VStack spacing="4" align="flex-start">
      <Box>
        <Text fontWeight="bold">First Name:</Text>
        <Text>{fname}</Text>
      </Box>
      <Box>
        <Text fontWeight="bold">Last Name:</Text>
        <Text>{lname}</Text>
      </Box>
      <Box>
        <Text fontWeight="bold">Email:</Text>
        <Text>{email}</Text>
      </Box>
      {/* Display other necessary fields similarly */}

      {/* Optional Fields */}
      {bio && (
        <Box>
          <Text fontWeight="bold">Bio:</Text>
          <Text>{bio}</Text>
        </Box>
      )}
      {instagram && (
        <Box>
          <Text fontWeight="bold">Instagram:</Text>
          <Link href={instagram} target="_blank">
            {instagram}
          </Link>
        </Box>
      )}
      {/* Display other optional fields similarly */}
    </VStack>
  );
};

export default ServiceProviderProfileView;
