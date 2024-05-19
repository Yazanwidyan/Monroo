import { Button, Box, FormControl, FormLabel, Image, Text, VStack, Flex } from '@chakra-ui/react';
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
    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();
    const { updateUser } = useContext(UserContext);
    const navigate = useNavigate();

    const state = useRegisterUserPage();
    const { t } = useTranslation();

    const logGoogleUser = async () => {
        const response = await signInWithPopup(auth, googleProvider);
        try {
            const payload = {
                username: response?.user?.email,
            };

            if (state.userType === UserTypes.User) {
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
            if (state.userType === UserTypes.User) {
                navigate('/user-register', { state: { formData }, replace: true });
            } else {
                navigate('/provider-register', { state: { formData }, replace: true });
            }
        }
    };

    const logFacebookUser = async () => {
        try {
            const response = await signInWithPopup(auth, facebookProvider);
            console.log(response);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <Box p={4} maxW="600px" mt={7} mx="auto">
            <FormControl>
                <FormLabel fontSize={'sm'} textAlign={'center'} mb={5}>
                    Create your account regarding to your needs, you can register as a scout or as a star
                </FormLabel>
                <Flex justifyContent="space-around" mb={4}>
                    <Button
                        variant="outline"
                        onClick={() => state.handleUserTypeChange({ target: { value: UserTypes.User } })}
                        borderColor={state.userType === UserTypes.User ? 'primary.500' : 'gray.300'}
                        bg={state.userType === UserTypes.User ? 'primary.50' : 'white'}
                        _hover={{ bg: 'primary.100' }}
                        _active={{ bg: 'primary.200' }}
                        width="45%"
                        height={'100%'}
                        p={8}
                        flexDirection="column"
                        alignItems="center"
                    >
                        <Image boxSize="50px" src="/assets/images/thought-leadership.png" alt="User" mb={2} />
                        <Text>{t('register.scouts')}</Text>
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => state.handleUserTypeChange({ target: { value: UserTypes.ServiceProvider } })}
                        borderColor={state.userType === UserTypes.ServiceProvider ? 'primary.500' : 'gray.300'}
                        bg={state.userType === UserTypes.ServiceProvider ? 'primary.50' : 'white'}
                        _hover={{ bg: 'primary.100' }}
                        _active={{ bg: 'primary.200' }}
                        width="45%"
                        height={'100%'}
                        p={8}
                        flexDirection="column"
                        alignItems="center"
                    >
                        <Image boxSize="50px" src="/assets/images/teamwork.png" alt="Service Provider" mb={2} />
                        <Text>{t('register.become_a_star')}</Text>
                    </Button>
                </Flex>
            </FormControl>
            <Button colorScheme="primary" width="100%" mt={4} onClick={state.handleNextClick}>
                {t('common.getting_started')}
            </Button>

            <Text textAlign="center" my={2}>
                Or
            </Text>
            <Button width="100%" mt={0} onClick={logGoogleUser} variant="outline" _hover={{ borderColor: 'gray.400', bg: 'gray.50' }} _active={{ bg: 'gray.100' }}>
                <Image width={5} src="/assets/images/google.png" alt="Google" />
                <Text mx={4}>Sign up With Google</Text>
            </Button>
            {/* <Button width="100%" mt={2} onClick={logFacebookUser} variant="outline" _hover={{ borderColor: 'gray.400', bg: 'gray.50' }} _active={{ bg: 'gray.100' }}>
                <Image width={5} src="/assets/images/facebook.png" alt="Facebook" />
                <Text mx={4}>Sign In With Facebook</Text>
            </Button> */}
        </Box>
    );
}
