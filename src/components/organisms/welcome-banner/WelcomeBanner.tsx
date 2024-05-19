import { useState, useEffect } from 'react';
import { Box, Image, Text, Button, Container } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const images = ['/assets/images/bg.jpg', 'https://d3uscstcbhvk7k.cloudfront.net/static/images/backstage_hero_feb.jpg'];

const WelcomeBanner = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [fadeIn, setFadeIn] = useState(true); // State to trigger fade animation

    const nextImage = () => {
        setFadeIn(false); // Trigger fade out animation
        setTimeout(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
            setFadeIn(true); // Trigger fade in animation
        }, 300); // Wait for the fade out animation to complete before changing the image
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            nextImage();
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <Box bg="white.100" py="2" px="4">
            <Container maxW={'7xl'}>
                <Box position="relative">
                    <Image
                        style={{ transition: 'opacity 0.5s ease-in-out' }} // Add transition CSS property
                        borderRadius={20}
                        src={images[currentImageIndex]}
                        alt="Welcome to UAE Staffing"
                        objectFit="cover"
                        w="100vw"
                        h="calc(100vh - 18vh)"
                        opacity={fadeIn ? 1 : 0.4} // Set opacity based on fade animation state
                    />

                    <Box
                        position="absolute"
                        top="0"
                        left="0"
                        width="100%"
                        borderRadius={20}
                        height="100%"
                        bg="rgba(0, 0, 0, 0.4)"
                        display="flex"
                        alignItems="center"
                        justifyContent="start"
                        textAlign="center"
                        color="white"
                        p="4"
                    >
                        <Box mx={20} maxW={'3xl'} textAlign={'initial'}>
                            <Box>
                                <Text lineHeight={'1'} mb={4} fontWeight={'900'} fontSize="6xl">
                                    <span style={{ fontSize: '42px' }}>Discover Your Next Opportunity with</span>
                                    <br />
                                    Monroo
                                </Text>
                                <Text fontSize="lg">Spark Your Passion. Own The Spotlight.</Text>
                            </Box>
                            <Button mt={4} size={'lg'} onClick={() => navigate('register')} colorScheme={'primary'}>
                                {t('common.join_now')}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default WelcomeBanner;
