import { Button, Box, FormControl, FormLabel, Select, Image, Text } from '@chakra-ui/react';
import { UserTypes } from '../../../../models/UserTypes';
import useRegisterUserPage from './useRegisterUser';
import { useTranslation } from 'react-i18next';
import { GoogleAuthProvider, FacebookAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import authServices from '../../../../services/authServices';
import { useContext } from 'react';
import { UserContext } from '../../../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

export default function RegisterUserPage() {
    const auth = getAuth();
    const google_provider = new GoogleAuthProvider();
    const facebook_provider = new FacebookAuthProvider();
    const { updateUser } = useContext(UserContext);
    const navigate = useNavigate();

    const state = useRegisterUserPage();
    const { t } = useTranslation();

    const logGoogleUser = async () => {
        const response = await signInWithPopup(auth, google_provider);
        try {
            const payload = {
                username: response?.user?.email,
            };

            if (state.userType == 0) {
                const res = await authServices.socialLoginUser(payload);
                updateUser(res.data);
                navigate('/home', { replace: true });
            } else {
                const res = await authServices.socialLoginProvider(payload);
                updateUser(res.data);
                navigate('/timeline', { replace: true });
            }
        } catch (error) {
            const formData = {
                username: response?.user?.displayName,
                email: response?.user?.email,
                profilePic: response?.user?.photoURL,
            };
            if (state.userType == 0) {
                navigate('/user-register', { state: { formData }, replace: true });
            } else {
                navigate('/provider-register', { state: { formData }, replace: true });
            }
        }
    };

    const logFacebookUser = async () => {
        try {
            const response = await signInWithPopup(auth, facebook_provider);
            console.log(response);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <Box p={4} maxW="400px" mt={12} mx="auto">
            <FormControl>
                <FormLabel>{t('register.whoAreYou')}</FormLabel>
                <Select value={state.userType} onChange={state.handleUserTypeChange} mb={4}>
                    <option value={UserTypes.User}>User</option>
                    <option value={UserTypes.ServiceProvider}>Service provider</option>
                </Select>
            </FormControl>
            <Button colorScheme="primary" width="100%" onClick={state.handleNextClick}>
                {t('common.next')}
            </Button>

            <Text textAlign={'center'} my={2}>
                Or
            </Text>
            <Button width="100%" mt={2} onClick={logGoogleUser} _hover={{ borderColor: 'gray.400', bg: 'gray.50' }} _active={{ bg: 'gray.100' }}>
                <Image width={5} src={'/assets/images/google.png'} />
                <Text mx={4}>Sign In With Google</Text>
            </Button>
            <Button width="100%" mt={2} onClick={logFacebookUser} _hover={{ borderColor: 'gray.400', bg: 'gray.50' }} _active={{ bg: 'gray.100' }}>
                <Image width={5} src={'/assets/images/facebook.png'} />
                <Text mx={4}>Sign In With Facebook</Text>
            </Button>
        </Box>
    );
}
