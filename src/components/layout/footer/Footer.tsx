import { Box, Flex, Text, Link, HStack, Image, Link as ChakraLink } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { UserContext } from '../../../contexts/UserContext';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import userServices from '../../../services/userServices';
import providerServices from '../../../services/providerServices';

const Footer = () => {
    const navigate = useNavigate();

    const { user, updateUser } = useContext(UserContext);

    useEffect(() => {
        if (user?.isMainUser) {
            fetchUserData();
        } else {
            fetchProviderData();
        }
    }, []);

    const fetchUserData = async () => {
        const payload = {
            userID: user.id,
        };
        try {
            const res = await userServices.getListProviders(payload);
            console.log(res);
        } catch (error) {
            updateUser(null);
            navigate('/');
        }
    };
    const fetchProviderData = async () => {
        const payload = {
            userID: user.id,
        };
        try {
            const res = await providerServices.getProviderEvents(payload);
            console.log(res);
        } catch (error) {
            updateUser(null);
            navigate('/');
        }
    };

    return (
        <Box as="footer" py="4" bg="black" color="white">
            <Flex maxW="6xl" mx="auto" px="4" justify="space-between" alignItems="center" flexDirection={{ base: 'column', md: 'row' }}>
                <ChakraLink as={RouterLink} to={'/'} fontSize="lg" fontWeight="bold" color={'black'} textDecoration="none" _hover={{ textDecoration: 'none' }}>
                    <Image src={'/assets/images/logo.png'} alt={'MONROO Logo'} height={'70px'} width={'40px'} borderRadius="md" />
                </ChakraLink>
                <HStack spacing="4" mt={{ base: '4', md: '0' }}>
                    <Link href="https://www.facebook.com/profile.php?id=100094690136465" target="_blank" fontSize="xl">
                        <FaFacebook />
                    </Link>
                    <Link href="https://www.instagram.com/monroo.x?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" fontSize="xl">
                        <FaInstagram />
                    </Link>
                </HStack>
                <HStack spacing="4" mt={{ base: '4', md: '0' }} alignItems="center">
                    <ChakraLink as={RouterLink} to={'/FAQs'} fontSize="sm" textDecoration="none" _hover={{ textDecoration: 'none' }}>
                        FAQs
                    </ChakraLink>
                    <ChakraLink as={RouterLink} to={'/privacy-policy'} fontSize="sm" textDecoration="none" _hover={{ textDecoration: 'none' }}>
                        Privacy Policy
                    </ChakraLink>
                    <ChakraLink as={RouterLink} to={'/terms-of-use'} fontSize="sm" textDecoration="none" _hover={{ textDecoration: 'none' }}>
                        Terms of Use
                    </ChakraLink>
                    <ChakraLink as={RouterLink} to={'/contact-us'} fontSize="sm" textDecoration="none" _hover={{ textDecoration: 'none' }}>
                        Contact
                    </ChakraLink>
                    <ChakraLink as={RouterLink} to={'/about-us'} fontSize="sm" textDecoration="none" _hover={{ textDecoration: 'none' }}>
                        About
                    </ChakraLink>
                </HStack>

                <Box>
                    {/* <Box mb={2}>Get the app</Box> */}
                    <Flex gap={2}>
                        <Link href="https://www.apple.com/app-store/" target="_blank" fontSize="sm" alignItems="center">
                            <Image src={'/assets/images/ios.svg'} alt={'iOS Download'} height={'33'} width={'170'} />
                        </Link>
                        <Link href="https://www.playstore.com/app-store/" target="_blank" fontSize="sm" alignItems="center">
                            <Image src={'/assets/images/googlePlay.png'} alt={'android Download'} borderRadius={7} height={'33'} width={'170'} />
                        </Link>
                    </Flex>
                </Box>
            </Flex>

            <Text textAlign="center" color="gray.500" fontSize="xs">
                © {new Date().getFullYear()} MONROO. All Rights Reserved
            </Text>
        </Box>
    );
};

export default Footer;
