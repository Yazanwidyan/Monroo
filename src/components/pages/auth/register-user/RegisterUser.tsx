import { Button, Box, FormControl, FormLabel, Select, Image, Text } from '@chakra-ui/react';
import { UserTypes } from '../../../../models/UserTypes';
import useRegisterUserPage from './useRegisterUser';
import { useTranslation } from 'react-i18next';
import { GoogleAuthProvider, FacebookAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';

export default function RegisterUserPage() {
    const auth = getAuth();
    const google_provider = new GoogleAuthProvider();
    const facebook_provider = new FacebookAuthProvider();

    const state = useRegisterUserPage();
    const { t } = useTranslation();

    const logGoogleUser = async () => {
        const response = await signInWithPopup(auth, google_provider);
        console.log(response);
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
