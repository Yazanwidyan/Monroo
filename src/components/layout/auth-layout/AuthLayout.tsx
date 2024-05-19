import { useState } from 'react';
import { Flex, Box, Spacer, Link as ChakraLink, Button, Container, Image, Menu, MenuButton, MenuList, MenuItem, Text } from '@chakra-ui/react';
import LanguageSwitcher from '../../../Localization/LanguageSwitcher';
import { Outlet, Link as RouterLink, useNavigate } from 'react-router-dom';
import LoginModal from '../../organisms/login-modal/LoginModal';
import { AiOutlineLogin, AiOutlineUserAdd } from 'react-icons/ai'; // Import Chakra Icons
import Footer from '../footer/Footer';
import { useTranslation } from 'react-i18next';
import { ChevronDownIcon } from '@chakra-ui/icons';

const menuItems = [
    {
        id: 'hospitality',
        label: 'Hospitality',
        imageSrc: '/assets/images/charity.png',
        description: 'Talented individuals in hospitality.',
        to: '/talent-category-1',
    },
    {
        id: 'entertainment',
        label: 'Entertainment',
        imageSrc: '/assets/images/cinema.png',
        description: 'Entertainers and performers for events.',
        to: '/talent-category-2',
    },
    {
        id: 'marketing',
        label: 'Marketing',
        imageSrc: '/assets/images/marketing.png',
        description: 'Marketing experts to boost campaigns.',
        to: '/talent-category-3',
    },
    {
        id: 'glamour',
        label: 'Glamour',
        imageSrc: '/assets/images/diamond.png',
        description: 'Glamour professionals for fashion and beauty.',
        to: '/talent-category-4',
    },
    {
        id: 'casting',
        label: 'Casting',
        imageSrc: '/assets/images/casting.png',
        description: 'Casting talents for productions.',
        to: '/talent-category-5',
    },
];

const AuthLayout = () => {
    const [isLoginOpen, setLoginOpen] = useState(false);

    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <Flex minHeight="100vh" flexDirection="column">
            <Box bg="white.100" px="4">
                <Container maxW={'7xl'} px={0}>
                    <Flex alignItems="center" fontSize="sm" fontWeight="bold" justifyContent={'space-between'}>
                        <ChakraLink as={RouterLink} to={'/'} fontSize="lg" fontWeight="bold" color={'black'} textDecoration="none" _hover={{ textDecoration: 'none' }}>
                            <Image src={'/assets/images/logo.png'} alt={'cc'} boxSize="80px" borderRadius="md" />
                        </ChakraLink>

                        <Menu>
                            <MenuButton as={Button} mx={'4px'} size={'sm'} fontWeight={900} variant={'ghost'} rightIcon={<ChevronDownIcon />}>
                                {t('common.find_talent')}
                            </MenuButton>
                            <MenuList p={8}>
                                <Text borderBottomWidth={2} borderBottomColor={'gray.300'} borderBottomStyle={'solid'} pb={4} mb={3} fontSize={'xl'} maxW={400}>
                                    Search our talent network to find the perfect fit
                                </Text>

                                {menuItems.map((item) => (
                                    <MenuItem key={item.id} display={'flex'} alignItems={'center'} gap={4} as={RouterLink} to={item.to}>
                                        <Image boxSize={'52px'} src={item.imageSrc} alt={item.label} />
                                        <Box>
                                            <Text mt={2}>{item.label}</Text>
                                            <Text fontSize={'xs'} color={'gray.500'} fontWeight={400}>
                                                {item.description}
                                            </Text>
                                        </Box>
                                    </MenuItem>
                                ))}
                            </MenuList>
                        </Menu>

                        <ChakraLink mx={'1rem'} as={RouterLink} to={'/how-it-works'} textDecoration="none" _hover={{ textDecoration: 'none' }}>
                            {t('common.how_it_works')}
                        </ChakraLink>
                        <Spacer />

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
