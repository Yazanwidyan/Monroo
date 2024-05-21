import { useContext, useState } from 'react';
import { Flex, Box, Link as ChakraLink, Button, Container, Spacer, Image } from '@chakra-ui/react';
import { Outlet, Link as RouterLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../contexts/UserContext';
import Footer from '../footer/Footer';
import { FaPlusCircle, FaSignOutAlt, FaUserAlt } from 'react-icons/fa';
import CreateEventPage from '../../pages/user/create-event/CreateEvent';
import LanguageSwitcher from '../../../Localization/LanguageSwitcher';

const HomeLayout = () => {
    const navigate = useNavigate();
    const { user, updateUser } = useContext(UserContext);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleLogout = () => {
        navigate('/');
        updateUser(null);
    };

    const openDialog = () => {
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    return (
        <Flex minHeight="100vh" flexDirection="column">
            <Box bg="white.100">
                <Container maxW="5xl" px={4} py={2}>
                    <Flex alignItems="center" fontSize="sm" fontWeight="bold" textTransform={'uppercase'} justifyContent={'space-between'}>
                        <ChakraLink
                            as={RouterLink}
                            to={user.isMainUser ? '/home' : '/timeline'}
                            fontSize="lg"
                            fontWeight="bold"
                            color={'black'}
                            textDecoration="none"
                            _hover={{ textDecoration: 'none' }}
                        >
                            <Image src={'/assets/images/logo.png'} alt={'cc'} height={'75px'} width={'45px'} borderRadius="md" />
                        </ChakraLink>
                        <LanguageSwitcher />
                        <Spacer />

                        <Flex align="center">
                            {user.isMainUser && (
                                <>
                                    <Button
                                        mx={'1rem'}
                                        onClick={openDialog}
                                        leftIcon={<FaPlusCircle size={20} color={'primary.500'} />}
                                        color={'white'}
                                        bg={'black'}
                                        _hover={{
                                            bg: 'primary.500',
                                        }}
                                    >
                                        Post an Event
                                    </Button>
                                </>
                            )}
                            <ChakraLink as={RouterLink} to={!user.isMainUser ? '/events' : '/user-booking'} mx="0.5rem" textDecoration="none" _hover={{ textDecoration: 'none' }}>
                                Booking
                            </ChakraLink>
                            <ChakraLink as={RouterLink} to="/inbox" mx="0.5rem" textDecoration="none" _hover={{ textDecoration: 'none' }}>
                                Inbox
                            </ChakraLink>
                            {!user.isMainUser && (
                                <ChakraLink as={RouterLink} to={'/service-provider-profile'} mx="0.5rem" textDecoration="none" _hover={{ textDecoration: 'none' }}>
                                    Profile
                                </ChakraLink>
                            )}
                            {/* <ChakraLink as={RouterLink} to={user.isMainUser ? '/payment' : '/payment'} mx="0.5rem" textDecoration="none" _hover={{ textDecoration: 'none' }}>
                                Payment
                            </ChakraLink> */}
                            {user.isMainUser && (
                                <ChakraLink as={RouterLink} to={'/user-profile'} mx="0.5rem" textDecoration="none" _hover={{ textDecoration: 'none' }}>
                                    <FaUserAlt />
                                </ChakraLink>
                            )}
                            <Button onClick={handleLogout} px={0} colorScheme="primary.500" size="sm" variant={'ghost'} leftIcon={<FaSignOutAlt />}></Button>
                        </Flex>
                    </Flex>
                    <CreateEventPage isOpen={isDialogOpen} onClose={closeDialog} />
                </Container>
            </Box>
            <main style={{ flex: 1 }}>
                <Outlet />
            </main>
            <Footer />
        </Flex>
    );
};

export default HomeLayout;
