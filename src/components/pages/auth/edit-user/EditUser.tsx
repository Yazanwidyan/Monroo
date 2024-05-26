import { useContext, useMemo, useState } from 'react';
import { Box, FormControl, FormLabel, Input, Select, Textarea, Button, Grid, GridItem, Container, InputGroup, InputRightElement, IconButton } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import countryList from '../../../../constants/countries.json';
import { Select as MultiSelect } from 'chakra-react-select';
import styles from '../../../organisms/register-employer-form/RegisterEmployerForm.module.scss';
import { LookupsContext } from '../../../../contexts/LookupsContext';
import { UserContext } from '../../../../contexts/UserContext';
import authServices from '../../../../services/authServices';
import useCustomToast from '../../../../hooks/useCustomToast';
import userServices from '../../../../services/userServices';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import usePasswordVisibility from '../../../../hooks/usePasswordVisibility';

export default function EditUser({ onClose }) {
    const countries: { name: string; code: string; flag: string }[] = useMemo(() => countryList.filter((country) => country.code !== 'IL'), []);
    const { categories } = useContext(LookupsContext);
    const { updateUser, user } = useContext(UserContext);

    const [passwordVisibility, togglePasswordVisibility] = usePasswordVisibility({
        password: false,
    });
    const { t, i18n } = useTranslation();
    const { showToast } = useCustomToast();

    console.log('user', user);

    const [imageFile, setImageFile] = useState(null);
    const [formData, setFormData] = useState({
        name: user?.name,
        country: user?.country,
        mobile: user?.phone,
        email: user?.email,
        about: user?.about,
        companyName: user?.companyName,
        profilePic: user?.profilePic,
        intrestedList: user?.intrestedList || [],
        password: '',
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'profilePic') {
            const file = files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    setFormData({ ...formData, [name]: event.target.result });
                };
                reader.readAsDataURL(file);
                setImageFile(files[0]);
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleCategoriesChange = (selectedOptions) => {
        const selectedCategories = selectedOptions.map((option) => option.value);
        setFormData({ ...formData, intrestedList: selectedCategories });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            id: user?.id,
            country: formData?.country,
            phone: formData?.mobile,
            email: formData?.email,
            about: formData?.about,
            companyName: formData?.companyName,
            intrestedList: formData?.intrestedList,
            name: formData?.name,
            profilePic: formData?.profilePic,
            password: formData.password,
        };

        const data = new FormData();
        data.append('profilePic', imageFile);
        data.append('data', JSON.stringify(payload));

        try {
            const res = await userServices.updateUser(data);
            updateUser(res.data);
            onClose();
        } catch (error) {
            showToast(error, { status: 'error' });
        }
        console.log(formData);
    };

    return (
        <Container maxW={'6xl'} mt={10}>
            <form onSubmit={handleSubmit}>
                <GridItem colSpan={2}>
                    <FormControl isRequired mb={4}>
                        <FormLabel>{t('Profile Picture')}</FormLabel>
                        {formData.profilePic ? (
                            <Box>
                                <img src={formData.profilePic} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '20px' }} />
                                <Button mt={2} onClick={() => setFormData({ ...formData, profilePic: '' })}>
                                    {t('Remove Picture')}
                                </Button>
                            </Box>
                        ) : (
                            <Input type="file" name="profilePic" onChange={handleChange} />
                        )}
                    </FormControl>
                </GridItem>
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <GridItem colSpan={1}>
                        <FormControl isRequired mb={4}>
                            <FormLabel>{t('register.first_last_name')}</FormLabel>
                            <Input type="text" name="name" value={formData.name} onChange={handleChange} />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>{t('register.preferred_categories')}</FormLabel>
                            <MultiSelect
                                required
                                className={styles.categoriesMultiSelect}
                                closeMenuOnSelect={false}
                                isSearchable={true}
                                isMulti={true}
                                onChange={handleCategoriesChange}
                                placeholder={t('register.select_category')}
                                name="categories"
                                value={categories
                                    .filter((category) => formData.intrestedList.includes(category.id))
                                    .map((category) => ({
                                        label: i18n?.language?.includes('en') ? category.name : i18n?.language?.includes('ar') ? category.nameAR : category.nameRUS,
                                        value: category.id,
                                        catID: category.id,
                                        name: category.name,
                                        nameAR: category.nameAR,
                                        nameRUS: category.nameRUS,
                                    }))}
                                options={categories.map((category) => ({
                                    label: i18n?.language?.includes('en') ? category.name : i18n?.language?.includes('ar') ? category.nameAR : category.nameRUS,
                                    value: category.id,
                                    catID: category.id,
                                    name: category.name,
                                    nameAR: category.nameAR,
                                    nameRUS: category.nameRUS,
                                }))}
                            />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <FormControl isRequired mb={4}>
                            <FormLabel>{t('register.country')}</FormLabel>
                            <Select required placeholder={t('register.select_country')} value={formData.country} onChange={handleChange} name="country">
                                {countries.map((country) => (
                                    <option key={country.code} value={country.name}>
                                        {country.name}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl isRequired mb={4}>
                            <FormLabel>{t('register.phone_number')}</FormLabel>
                            <Input type="text" name="mobile" value={formData.mobile} onChange={handleChange} />
                        </FormControl>{' '}
                    </GridItem>
                    <GridItem colSpan={1}>
                        <FormControl isRequired mb={4}>
                            <FormLabel>{t('register.email')}</FormLabel>
                            <Input type="email" name="email" value={formData.email} onChange={handleChange} />
                        </FormControl>
                        <FormControl isRequired mb={4}>
                            <FormLabel>{t('register.company_name')}</FormLabel>
                            <Input type="text" name="companyName" value={formData.companyName} onChange={handleChange} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <FormControl isRequired mb={4}>
                            <FormLabel>{t('register.about')}</FormLabel>
                            <Textarea name="about" value={formData.about} onChange={handleChange} maxLength={200} placeholder={t('register.tell_us_more_about_yourself')} rows={5} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={1} mb={6}>
                        <FormControl isRequired>
                            <FormLabel>{t('register.password')}</FormLabel>
                            <InputGroup>
                                <Input
                                    type={passwordVisibility.password ? 'text' : 'password'}
                                    name="password"
                                    placeholder={t('register.enter_password')}
                                    value={formData.password}
                                    onChange={handleChange}
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
                    </GridItem>
                </Grid>
                <Button mb={5} type="submit" colorScheme="primary">
                    {t('common.submit')}
                </Button>
            </form>
        </Container>
    );
}
