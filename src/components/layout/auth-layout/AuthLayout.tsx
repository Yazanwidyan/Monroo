import { useContext, useState } from 'react';
import { Flex, Box, Spacer, Link as ChakraLink, Button, Container, Image, Menu, MenuButton, MenuList, MenuItem, Text } from '@chakra-ui/react';
import LanguageSwitcher from '../../../Localization/LanguageSwitcher';
import { Outlet, Link as RouterLink, useNavigate } from 'react-router-dom';
import LoginModal from '../../organisms/login-modal/LoginModal';
import { AiOutlineLogin, AiOutlineUserAdd } from 'react-icons/ai'; // Import Chakra Icons
import Footer from '../footer/Footer';
import { useTranslation } from 'react-i18next';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { LookupsContext } from '../../../contexts/LookupsContext';

const menuItems = [
    {
        imageSrc: '/assets/images/charity.png',
        description: 'Talented individuals in hospitality.',
    },
    {
        imageSrc: '/assets/images/cinema.png',
        description: 'Entertainers and performers for events.',
    },
    {
        imageSrc: '/assets/images/marketing.png',
        description: 'Marketing experts to boost campaigns.',
    },
    {
        imageSrc: '/assets/images/diamond.png',
        description: 'Glamour professionals for fashion and beauty.',
    },
    {
        imageSrc: '/assets/images/casting.png',
        description: 'Casting talents for productions.',
    },
];

const AuthLayout = () => {
    const [isLoginOpen, setLoginOpen] = useState(false);
    const { categories } = useContext(LookupsContext);
    console.log('categories', categories);

    const newCategories = menuItems.map((menuItem, index) => {
        const category = categories[index];
        return { ...menuItem, ...category };
    });

    console.log(newCategories);

    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <Flex minHeight="100vh" flexDirection="column">
            <Box bg="white.100" px="4" py="2">
                <Container maxW={'7xl'}>
                    <Flex alignItems="center" fontSize="sm" fontWeight="bold" justifyContent={'space-between'}>
                        <ChakraLink as={RouterLink} to={'/'} fontSize="lg" fontWeight="bold" color={'black'} textDecoration="none" _hover={{ textDecoration: 'none' }}>
                            <Image src={'/assets/images/logo.png'} alt={'cc'} height={'70px'} width={'40px'} borderRadius="md" />
                        </ChakraLink>

                        <Menu>
                            <MenuButton fontSize={17.5} as={Button} size={'md'} fontWeight={700} variant={'ghost'} rightIcon={<ChevronDownIcon />}>
                                {t('common.find_talent')}
                            </MenuButton>
                            <MenuList p={8}>
                                <Text borderBottomWidth={2} borderBottomColor={'gray.300'} borderBottomStyle={'solid'} pb={4} mb={3} fontSize={'xl'}>
                                    Search our talent network
                                    <br />
                                    to find the perfect fit
                                </Text>

                                {newCategories.map((item) => (
                                    <MenuItem key={item.id} display={'flex'} alignItems={'center'} gap={4} as={RouterLink} to={`/search-stars/${item.id}`}>
                                        <Image boxSize={'52px'} src={item.imageSrc} alt={item.name} />
                                        <Box>
                                            <Text mt={2}>{item.name}</Text>
                                            <Text fontSize={'xs'} color={'gray.500'} fontWeight={400}>
                                                {item.description}
                                            </Text>
                                        </Box>
                                    </MenuItem>
                                ))}
                                <MenuItem
                                    bg={'primary.500'}
                                    textAlign={'center'}
                                    justifyContent={'center'}
                                    w={'80%'}
                                    borderRadius={10}
                                    color={'white'}
                                    as={RouterLink}
                                    to={`/search-stars/all`}
                                    mx={5}
                                    mt={5}
                                >
                                    Search Monroo Talents
                                </MenuItem>
                            </MenuList>
                        </Menu>

                        <ChakraLink mx={'1rem'} as={RouterLink} to={'/register'} textDecoration="none" _hover={{ textDecoration: 'none' }}>
                            {t('common.for_talent')}
                        </ChakraLink>
                        <ChakraLink mx={'1rem'} as={RouterLink} to={'/how-it-works'} textDecoration="none" _hover={{ textDecoration: 'none' }}>
                            {t('common.how_it_works')}
                        </ChakraLink>
                        <ChakraLink mx={'1rem'} as={RouterLink} to={'/about-us'} textDecoration="none" _hover={{ textDecoration: 'none' }}>
                            {t('common.about_us')}
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
