import { Box } from '@chakra-ui/react';
import WelcomeBanner from '../../../organisms/welcome-banner/WelcomeBanner';
import Benefits from '../../../organisms/benefits/Benefits';
import ApplyBanner from '../../../organisms/apply-banner-2/ApplyBanner';
// import ShowCategories from '../../../organisms/show-categories/ShowCategories';

const Landing = () => {
    return (
        <Box>
            <WelcomeBanner />
            {/* <ShowCategories /> */}
            <ApplyBanner />
            <Benefits />
        </Box>
    );
};

export default Landing;
