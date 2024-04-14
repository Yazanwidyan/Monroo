import { useState } from 'react';
import { Flex, Box, Spacer, Link as ChakraLink, Button, Container } from '@chakra-ui/react';
import LanguageSwitcher from '../../../Localization/LanguageSwitcher';
import { Outlet, Link as RouterLink, useNavigate } from 'react-router-dom';
import LoginModal from '../../organisms/login-modal/LoginModal';
import { AiOutlineLogin, AiOutlineUserAdd } from 'react-icons/ai'; // Import Chakra Icons
import Footer from '../footer/Footer';
import { useTranslation } from 'react-i18next';

const AuthLayout = () => {
    const [isLoginOpen, setLoginOpen] = useState(false);

    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <Flex minHeight="100vh" flexDirection="column">
            <Box borderBottomWidth={1} bg="white.100" py="3" px="4">
                <Container maxW={'5xl'}>
                    <Flex alignItems="center" fontSize="sm" fontWeight="bold" textTransform={'uppercase'} justifyContent={'space-between'}>
                        <ChakraLink as={RouterLink} to={'/'} fontSize="lg" fontWeight="bold" color={'black'} textDecoration="none" _hover={{ textDecoration: 'none' }}>
                            Monroo
                        </ChakraLink>

                        <Spacer />
                        <ChakraLink mx={'1rem'} as={RouterLink} to={'/how-it-works'} textDecoration="none" _hover={{ textDecoration: 'none' }}>
                            {t('common.how_it_works')}
                        </ChakraLink>

                        <LanguageSwitcher />

                        <Button
                            mx={'1rem'}
                            onClick={() => navigate('register')}
                            leftIcon={<AiOutlineUserAdd size={20} color={'primary.500'} />}
                            fontSize={'small'}
                            size={'sm'}
                            fontWeight={500}
                            colorScheme={'primary'}
                        >
                            {t('common.join_us')}
                        </Button>
                        <Button
                            onClick={() => setLoginOpen(true)}
                            leftIcon={<AiOutlineLogin size={20} color={'primary.500'} />}
                            size={'sm'}
                            variant={'ghost'}
                            fontWeight={500}
                            fontSize={'small'}
                            borderColor="black"
                            color={'black'}
                            _hover={{
                                borderColor: 'black',
                            }}
                        >
                            {t('common.login')}
                        </Button>
                    </Flex>
                </Container>
            </Box>
            <main style={{ flex: 1 }}>
                <Outlet />
            </main>
            <Footer />

            <LoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} />
        </Flex>
    );
};

export default AuthLayout;
