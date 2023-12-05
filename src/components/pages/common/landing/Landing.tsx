import { Box } from "@chakra-ui/react";
import WelcomeBanner from "../../../organisms/welcome-banner/WelcomeBanner";
import Benefits from "../../../organisms/benefits/Benefits";
import ApplyBanner from "../../../organisms/apply-banner-2/ApplyBanner";

const Landing = () => {
  return (
    <Box>
      <WelcomeBanner />
      <ApplyBanner />
      <Benefits />
    </Box>
  );
};

export default Landing;
