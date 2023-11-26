import { useContext, useEffect, useState } from "react";
import { Box, Heading, Text, VStack, Divider, Image } from "@chakra-ui/react";
import providerServices from "../../../../services/providerServices";
import { UserContext } from "../../../../contexts/UserContext";
import useCustomToast from "../../../../hooks/useCustomToast";

const ServiceProviderProfile = () => {
  const { showToast } = useCustomToast();
  const { user } = useContext(UserContext);
  const [userProfile, setUserProfile] = useState<any>({});

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  const fetchData = async () => {
    try {
      const res = await providerServices.getAllProvider();
      const currentUser = res.data.find((users) => users.id === user.id);

      setUserProfile(currentUser || {});
    } catch (error) {
      showToast(error, { status: "error" });
    }
  };

  return (
    <Box p="4">
      <Heading as="h2" mb="4">
        Service Provider Profile
      </Heading>

      <VStack align="start" spacing="4">
        <Box w="100%">
          <Heading as="h3" fontSize="xl">
            Personal Information
          </Heading>
          <Text>Name: {`${userProfile.fname} ${userProfile.lname}`}</Text>
          <Text>Date of Birth: {userProfile.dob}</Text>
          <Text>
            Gender: {userProfile.gender === 0 ? "Not specified" : "Other"}
          </Text>
          <Text>Country of Residence: {userProfile.countryOfResidence}</Text>
          <Text>Nationality: {userProfile.nationality}</Text>
          <Text>Spoken Languages: {userProfile.spokenLanguage}</Text>
        </Box>

        <Divider />

        <Box w="100%">
          <Heading as="h3" fontSize="xl">
            Contact Information
          </Heading>
          <Text>Email: {userProfile.email}</Text>
          <Text>Phone: {userProfile.phone}</Text>
          <Text>Instagram: {userProfile.instagram}</Text>
        </Box>

        <Divider />

        <Box w="100%">
          <Heading as="h3" fontSize="xl">
            Professional Details
          </Heading>
          <Text>Experience: {userProfile.experience} years</Text>
          <Text>Education: Level {userProfile.education}</Text>
          <Text>Average Rate Per Hour: ${userProfile.averageRatePerHour}</Text>
          <Text>Visa Type: Type {userProfile.visaType}</Text>
          <Text>
            Open to Work in Country:{" "}
            {userProfile.openToWorkInCountry?.join(", ")}
          </Text>
        </Box>

        <Divider />

        <Box w="100%">
          <Heading as="h3" fontSize="xl">
            Portfolio
          </Heading>
          <Text>
            Introduction Video:{" "}
            <a href={userProfile.introductionVideoLink}>
              {userProfile.introductionVideoLink}
            </a>
          </Text>
          <Text>Videos:</Text>
          {userProfile.videos &&
            userProfile.videos.map((video: string, index: number) => (
              <Box key={index}>
                <Text>Video {index + 1}</Text>
                <video controls width="400" style={{ maxWidth: "100%" }}>
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Box>
            ))}
          <Text>Photos:</Text>
          <VStack align="start" spacing="2">
            {userProfile.photos &&
              userProfile.photos.map((photo: string, index: number) => (
                <Image
                  key={index}
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  maxW="400px"
                />
              ))}
          </VStack>
        </Box>

        <Divider />

        <Box w="100%">
          <Heading as="h3" fontSize="xl">
            Additional Information
          </Heading>
          <Text>
            Special Skills: {userProfile.specialSkills || "Not specified"}
          </Text>
          <Text>Bio: {userProfile.bio}</Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default ServiceProviderProfile;
