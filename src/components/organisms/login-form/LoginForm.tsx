import { FormControl, FormLabel, Input, Button, Container, Link as ChakraLink, Flex, InputRightElement, IconButton, InputGroup, Text, Image, Divider } from '@chakra-ui/react';
import useLoginForm from './useLoginForm';
import { useTranslation } from 'react-i18next';
import { LoginInput } from '../../../models/LoginInput';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import usePasswordVisibility from '../../../hooks/usePasswordVisibility';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import authServices from '../../../services/authServices';
import { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';

export type LoginFormProps = {
    handleSubmit(loginInput: LoginInput): void;
    onClose: () => void;
    selectedTab: string;
};

export default function LoginForm(props: LoginFormProps) {
    const state = useLoginForm({ onSubmit: props.handleSubmit });
    const { t } = useTranslation();
    const auth = getAuth();
    const google_provider = new GoogleAuthProvider();
    const { updateUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [passwordVisibility, togglePasswordVisibility] = usePasswordVisibility({
        password: false,
    });
    const logFacebookUser = () => {};

    const logGoogleUser = async () => {
        const response = await signInWithPopup(auth, google_provider);
        try {
            const payload = {
                username: response?.user?.email,
            };

            if (props.selectedTab == 'user') {
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
            if (props.selectedTab == 'user') {
                navigate('/user-register', { state: { formData }, replace: true });
            } else {
                navigate('/provider-register', { state: { formData }, replace: true });
            }
        }
    };

    return (
        <Container maxW="md" p="4">
            <form onSubmit={state.handleSubmit}>
                <FormControl mb="4">
                    <FormLabel htmlFor="email">{t('login.username')}</FormLabel>
                    <Input
                        type="text"
                        id="username"
                        name="username"
                        placeholder={t('login.enter_emailOrusername')}
                        value={state.login.username}
                        onChange={state.handleLoginChange}
                        variant="filled"
                        borderRadius="md"
                        required
                    />
                </FormControl>
                <FormControl mb="4">
                    <FormLabel htmlFor="password">{t('login.password')}</FormLabel>
                    <InputGroup>
                        <Input
                            type={passwordVisibility.password ? 'text' : 'password'}
                            id="password"
                            name="password"
                            placeholder={t('login.enter_password')}
                            value={state.login.password}
                            onChange={state.handleLoginChange}
                            variant="filled"
                            borderRadius="md"
                            required
                        />
                        <InputRightElement width="3rem">
                            <IconButton
                                h="1.5rem"
                                size="sm"
                                onClick={() => togglePasswordVisibility('password')}
                                icon={passwordVisibility.password ? <ViewIcon /> : <ViewOffIcon />}
                                aria-label={passwordVisibility.password ? 'Hide password' : 'Show password'}
                                variant="ghost"
                            />
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <Button fontSize="md" colorScheme="primary" type="submit" width="full" textTransform="capitalize" borderRadius="md">
                    {t('login.login')}
                </Button>
            </form>
            <Text textAlign={'center'} mt={5}>
                Or login with
            </Text>
            <Flex width="100%" gap={8} justifyContent={'space-evenly'} my="2">
                <Button width="100%" mt={2} onClick={logGoogleUser} _hover={{ borderColor: 'gray.400', bg: 'gray.50' }} _active={{ bg: 'gray.100' }}>
                    <Image width={5} src={'/assets/images/google.png'} />
                    {/* <Text mx={4}> Google</Text> */}
                </Button>
                <Button width="100%" mt={2} onClick={logFacebookUser} _hover={{ borderColor: 'gray.400', bg: 'gray.50' }} _active={{ bg: 'gray.100' }}>
                    <Image width={5} src={'/assets/images/facebook.png'} />
                    {/* <Text mx={4}>Facebook</Text> */}
                </Button>
            </Flex>
            <Divider />
            <Flex width="100%" justifyContent="center" mt="2">
                <Text>{t('login.dont_have_account')}</Text>
                <ChakraLink onClick={props.onClose} as={RouterLink} to="/register" href="/register" color="primary.500" textDecoration="none" _hover={{ textDecoration: 'underline' }}>
                    {t('login.create_account')}
                </ChakraLink>
            </Flex>
        </Container>
    );
}
