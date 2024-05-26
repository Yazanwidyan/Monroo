import { FormControl, FormLabel, Input, SimpleGrid, Button, Flex, InputGroup, InputRightElement, IconButton, Box, Heading } from '@chakra-ui/react';

import { RegisterEmployer } from '../../../models/RegisterEmployer';
import useRegisterEmployerForm from './useRegisterEmployerForm';
import { useTranslation } from 'react-i18next';
import usePasswordVisibility from '../../../hooks/usePasswordVisibility';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

export type RegisterEmployerFormProps = {
    onSubmit(registerEmployer: RegisterEmployer, profilePic: any): Promise<void>;
    onBackClick(): void;
};

export default function RegisterEmployerForm(props: RegisterEmployerFormProps) {
    const state = useRegisterEmployerForm({ onSubmit: props.onSubmit });
    const { t } = useTranslation();

    const [passwordVisibility, togglePasswordVisibility] = usePasswordVisibility({
        password: false,
        confirmPassword: false,
    });

    return (
        <Box margin="auto" mt={8} p={6} px={12} width="5xl" borderColor={'gray.200'} borderRadius={14} borderWidth={1} borderStyle={'solid'}>
            <Heading as="h2" size="lg" textAlign="center" mb={6}>
                {/* {t('Register Scout')} */}
            </Heading>
            <Box as="section">
                <form onSubmit={state.handleSubmit}>
                    <SimpleGrid columns={{ base: 1, md: 2 }} rowGap="20px" columnGap="20px">
                        <FormControl>
                            <FormLabel>{t('register.first_last_name')}</FormLabel>
                            <Input
                                type="text"
                                name="name"
                                placeholder={t('register.enter_first_last_name')}
                                value={state.registerEmployer.name}
                                onChange={state.handleRegisterEmployerChange}
                                required
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>{t('register.phone_number')}</FormLabel>
                            <Input
                                type="tel"
                                value={state.registerEmployer.phone}
                                onChange={state.handleRegisterEmployerChange}
                                pattern="^(\+|00)[1-9][0-9 \-\(\)\.]{7,32}$"
                                maxLength={14}
                                name="phone"
                                placeholder="+971 XXX XXX XXX"
                                className="tel-rtl"
                                required
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>{t('register.email')}</FormLabel>
                            <Input type="email" name="email" placeholder={t('register.enter_email')} value={state.registerEmployer.email} onChange={state.handleRegisterEmployerChange} required />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>{t('register.password')}</FormLabel>
                            <InputGroup>
                                <Input
                                    type={passwordVisibility.password ? 'text' : 'password'}
                                    name="password"
                                    placeholder={t('register.enter_password')}
                                    value={state.registerEmployer.password}
                                    onChange={state.handleRegisterEmployerChange}
                                    maxLength={20}
                                    minLength={6}
                                    required
                                />
                                <InputRightElement width="2.8rem">
                                    <IconButton
                                        h="1.75rem"
                                        size="sm"
                                        onClick={() => togglePasswordVisibility('password')}
                                        icon={passwordVisibility.password ? <ViewIcon /> : <ViewOffIcon />}
                                        aria-label={passwordVisibility.password ? 'Hide password' : 'Show password'}
                                    />
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>{t('register.confirm_password')}</FormLabel>
                            <InputGroup>
                                <Input
                                    type={passwordVisibility.confirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    placeholder={t('register.confirm_password')}
                                    value={state.registerEmployer.confirmPassword}
                                    onChange={state.handleRegisterEmployerChange}
                                    maxLength={20}
                                    minLength={6}
                                    required
                                />
                                <InputRightElement width="2.8rem">
                                    <IconButton
                                        h="1.75rem"
                                        size="sm"
                                        onClick={() => togglePasswordVisibility('confirmPassword')}
                                        icon={passwordVisibility.confirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                                        aria-label={passwordVisibility.confirmPassword ? 'Hide password' : 'Show password'}
                                    />
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                    </SimpleGrid>
                    <Flex mb={8} marginTop="25px" justifyContent="space-between">
                        <Button variant="ghost" onClick={props.onBackClick} type="button">
                            {t('common.back')}
                        </Button>
                        <Button colorScheme="primary" type="submit">
                            {t('common.submit')}
                        </Button>
                    </Flex>
                </form>
            </Box>
        </Box>
    );
}
