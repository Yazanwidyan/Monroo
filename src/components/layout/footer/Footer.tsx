import { Box, Flex, Text, Link, HStack } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { UserContext } from '../../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
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
            <Flex maxW="5xl" mx="auto" px="4" justify="space-between" alignItems="center" flexDirection={{ base: 'column', md: 'row' }}>
                <Text fontWeight="bold" fontSize="lg" mb={{ base: '2', md: '0' }}>
                    MONROO
                </Text>
                <HStack spacing="4" mt={{ base: '4', md: '0' }}>
                    <Link href="#" fontSize="sm">
                        FAQs
                    </Link>
                    <Link href="#" fontSize="sm">
                        Privacy Policy
                    </Link>
                    <Link href="#" fontSize="sm">
                        Terms & Conditions
                    </Link>
                    <Link href="#" fontSize="sm">
                        Contact
                    </Link>
                </HStack>
                <HStack spacing="4" mt={{ base: '4', md: '0' }}>
                    <Link href="#" fontSize="xl">
                        <FaFacebook />
                    </Link>
                    <Link href="#" fontSize="xl">
                        <FaTwitter />
                    </Link>
                    <Link href="#" fontSize="xl">
                        <FaInstagram />
                    </Link>
                </HStack>
            </Flex>
            <Text textAlign="center" color="gray.500" fontSize="sm">
                © {new Date().getFullYear()} MONROO. All Rights Reserved
            </Text>
        </Box>
    );
};

export default Footer;
