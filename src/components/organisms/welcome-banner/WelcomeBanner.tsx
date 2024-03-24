import { Box, Image, Text } from '@chakra-ui/react';

const WelcomeBanner = () => {
    return (
        <Box position="relative">
            <Image
                src="/assets/images/bg.jpg"
                alt="Welcome to UAE Staffing"
                objectFit="cover"
                w="100vw"
                h="calc(100vh - 30vh)" // Adjust this value to accommodate any header/navbar height
            />

            <Box
                position="absolute"
                top="0"
                left="0"
                width="100%"
                height="100%"
                bg="rgba(0, 0, 0, 0.5)" // Adjust the opacity (0.5 for 50% opacity)
                display="flex"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                color="white"
                p="4"
            >
                <Box maxW={'3xl'}>
                    <Text lineHeight={'1'} mb={4} fontWeight={'900'} fontSize="8xl">
                        <span style={{ fontSize: '50px' }}>WELCOME TO</span>
                        <br />
                        MONROO
                    </Text>
                    <Text fontSize="md">
                        Postulet declarant senserit convincere T quisque emolumenti declarant senserit convincere T quisque emolumenti convenire esset severa vidit Romanum postremo postulet vos.
                    </Text>
                </Box>
            </Box>
        </Box>
    );
};

export default WelcomeBanner;
