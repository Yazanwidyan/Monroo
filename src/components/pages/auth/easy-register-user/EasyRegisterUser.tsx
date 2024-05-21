import { useContext, useMemo, useState } from 'react';
import { Box, FormControl, FormLabel, Input, Select, Textarea, Button, Grid, GridItem, Container } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import countryList from '../../../../constants/countries.json';
import { Select as MultiSelect } from 'chakra-react-select';
import styles from '../../../organisms/register-employer-form/RegisterEmployerForm.module.scss';
import { LookupsContext } from '../../../../contexts/LookupsContext';
import { UserContext } from '../../../../contexts/UserContext';
import authServices from '../../../../services/authServices';
import useCustomToast from '../../../../hooks/useCustomToast';

export default function EasyRegisterUserPage() {
    const countries: { name: string; code: string; flag: string }[] = useMemo(() => countryList.filter((country) => country.code !== 'IL'), []);
    const { categories } = useContext(LookupsContext);
    const location = useLocation();
    const { updateUser } = useContext(UserContext);

    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const { showToast } = useCustomToast();

    const [imageFile, setImageFile] = useState(location?.state?.formData?.profilePic || null);
    const [formData, setFormData] = useState({
        username: location?.state?.formData?.username,
        country: '',
        mobile: '',
        email: location?.state?.formData?.email,
        about: '',
        companyName: '',
        profilePic: location?.state?.formData?.profilePic || '',
        intrestedList: [],
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
            username: formData?.username,
            country: formData?.country,
            phone: formData?.mobile,
            email: formData?.email,
            about: formData?.about,
            companyName: formData?.companyName,
            intrestedList: formData?.intrestedList,
            name: formData?.username.split(' ')[0],
            profilePic: formData.profilePic,
        };

        const data = new FormData();
        data.append('profilePic', imageFile);
        data.append('data', JSON.stringify(payload));

        try {
            const res = await authServices.socialRegisterUser(data);
            updateUser(res.data);
            navigate('/home', { replace: true });
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
                            <FormLabel>{t('register.username')}</FormLabel>
                            <Input type="text" name="username" value={formData.username} onChange={handleChange} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>{t('register.country')}</FormLabel>
                            <Select required placeholder={t('register.select_country')} value={formData.country} onChange={handleChange} name="country">
                                {countries.map((country) => (
                                    <option key={country.code} value={country.name}>
                                        {country.name}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <FormControl isRequired mb={4}>
                            <FormLabel>{t('register.phone_number')}</FormLabel>
                            <Input type="text" name="mobile" value={formData.mobile} onChange={handleChange} />
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
                </Grid>
                <Button mb={5} type="submit" colorScheme="primary">
                    {t('common.submit')}
                </Button>
            </form>
        </Container>
    );
}
