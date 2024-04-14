import { FormControl, FormLabel, Input, SimpleGrid, Button, Flex, Select, Textarea, InputGroup, InputRightElement, IconButton, Box } from '@chakra-ui/react';
import { Select as MultiSelect } from 'chakra-react-select';

import { RegisterEmployer } from '../../../models/RegisterEmployer';
import useRegisterEmployerForm from './useRegisterEmployerForm';
import styles from './RegisterEmployerForm.module.scss';
import { useTranslation } from 'react-i18next';
import usePasswordVisibility from '../../../hooks/usePasswordVisibility';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

export type RegisterEmployerFormProps = {
    onSubmit(registerEmployer: RegisterEmployer): Promise<void>;
    onBackClick(): void;
};

export default function RegisterEmployerForm(props: RegisterEmployerFormProps) {
    const state = useRegisterEmployerForm({ onSubmit: props.onSubmit });
    const { t, i18n } = useTranslation();

    const [passwordVisibility, togglePasswordVisibility] = usePasswordVisibility({
        password: false,
        confirmPassword: false,
    });

    return (
        <Box margin="auto" mt={8} width="5xl">
            <Box as="section">
                <form onSubmit={state.handleSubmit}>
                    <SimpleGrid columns={{ base: 1, md: 2 }} rowGap="20px" columnGap="20px">
                        <FormControl isRequired>
                            <FormLabel>{t('register.username')}</FormLabel>
                            <Input
                                type="text"
                                name="username"
                                placeholder={t('register.enter_username')}
                                value={state.registerEmployer.username}
                                onChange={state.handleRegisterEmployerChange}
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
                                        icon={passwordVisibility.password ? <ViewOffIcon /> : <ViewIcon />}
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
                                        icon={passwordVisibility.confirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                                        aria-label={passwordVisibility.confirmPassword ? 'Hide password' : 'Show password'}
                                    />
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
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
                            <FormLabel>{t('register.country')}</FormLabel>
                            <Select required placeholder={t('register.select_country')} value={state.registerEmployer.country} onChange={state.handleRegisterEmployerChange} name="country">
                                {state.countries.map((country) => (
                                    <option key={country.code} value={country.code}>
                                        {country.name}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel>{t('register.company_name')}</FormLabel>
                            <Input
                                type="text"
                                name="companyName"
                                placeholder={t('register.enter_company_name')}
                                value={state.registerEmployer.companyName}
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
                            <FormLabel>{t('register.preferred_categories')}</FormLabel>
                            <MultiSelect
                                required
                                className={styles.categoriesMultiSelect}
                                closeMenuOnSelect={false}
                                isSearchable={true}
                                isMulti={true}
                                onChange={(categories) => state.handleCategoriesChange(categories.map((category) => category.value))}
                                placeholder={t('register.select_category')}
                                name="categories"
                                options={state.categories.map((category) => ({
                                    label: i18n.language == 'en' ? category.name : i18n.language == 'ar' ? category.nameAR : category.nameRUS,
                                    value: category.id,
                                    catID: category.id,
                                    name: category.name,
                                    nameAR: category.nameAR,
                                    nameRUS: category.nameRUS,
                                }))}
                            />
                        </FormControl>
                        <FormControl gridColumn="1/-1">
                            <FormLabel>{t('register.about')}</FormLabel>
                            <Textarea
                                value={state.registerEmployer.about}
                                onChange={state.handleRegisterEmployerChange}
                                name="about"
                                maxLength={200}
                                placeholder={t('register.tell_us_more_about_yourself')}
                                rows={5}
                            />
                        </FormControl>
                    </SimpleGrid>
                    <Flex mb={8} marginTop="25px" justifyContent="space-between">
                        <Button fontSize="14px" variant="ghost" onClick={props.onBackClick} type="button">
                            {t('common.back')}
                        </Button>
                        <Button fontSize="14px" colorScheme="primary" type="submit">
                            {t('common.submit')}
                        </Button>
                    </Flex>
                </form>
            </Box>
        </Box>
    );
}
