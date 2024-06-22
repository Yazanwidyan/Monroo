import { useContext, useMemo, useState } from 'react';
import { Box, FormControl, FormLabel, Input, Select, Textarea, Button, SimpleGrid, Container, Image, Flex, Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import countryList from '../../../../constants/countries.json';
import { Select as MultiSelect } from 'chakra-react-select';
import { LookupsContext } from '../../../../contexts/LookupsContext';
import { UserContext } from '../../../../contexts/UserContext';
import useCustomToast from '../../../../hooks/useCustomToast';
import userServices from '../../../../services/userServices';

export default function EditUser({ onClose, title }) {
    const countries = useMemo(() => countryList.filter((country) => country.code !== 'IL'), []);
    const { categories } = useContext(LookupsContext);
    const { updateUser, user } = useContext(UserContext);

    const { t, i18n } = useTranslation();
    const { showToast } = useCustomToast();
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
                setImageFile(file);
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
    };

    return (
        <Container maxW="6xl">
            <Box py={7}>
                <Heading mb={4}>{t(`common.${title}`)}</Heading>
                <form onSubmit={handleSubmit}>
                    <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={4}>
                        <FormControl isRequired>
                            <FormLabel>{t('register.first_last_name')}</FormLabel>
                            <Input type="text" name="name" value={formData.name} onChange={handleChange} />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>{t('register.phone_number')}</FormLabel>
                            <Input type="text" name="mobile" value={formData.mobile} onChange={handleChange} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>{t('register.email')}</FormLabel>
                            <Input type="email" name="email" value={formData.email} onChange={handleChange} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>{t('register.company_name')}</FormLabel>
                            <Input type="text" name="companyName" value={formData.companyName} onChange={handleChange} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>{t('register.country')}</FormLabel>
                            <Select placeholder={t('register.select_country')} value={formData.country} onChange={handleChange} name="country">
                                {countries.map((country) => (
                                    <option key={country.code} value={country.name}>
                                        {country.name}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>{t('register.preferred_categories')}</FormLabel>
                            <MultiSelect
                                required
                                closeMenuOnSelect={false}
                                isSearchable
                                isMulti
                                onChange={handleCategoriesChange}
                                placeholder={t('register.select_category')}
                                name="categories"
                                value={categories
                                    .filter((category) => formData.intrestedList.includes(category.id))
                                    .map((category) => ({
                                        label: i18n.language.includes('en') ? category.name : i18n.language.includes('ar') ? category.nameAR : category.nameRUS,
                                        value: category.id,
                                    }))}
                                options={categories.map((category) => ({
                                    label: i18n.language.includes('en') ? category.name : i18n.language.includes('ar') ? category.nameAR : category.nameRUS,
                                    value: category.id,
                                }))}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>{t('Profile Picture')}</FormLabel>
                            {formData.profilePic ? (
                                <Flex direction="column" align="center">
                                    <Image borderRadius="full" boxSize="100px" src={formData.profilePic} alt="Profile" />
                                    <Button mt={2} onClick={() => setFormData({ ...formData, profilePic: '' })}>
                                        {t('Remove Picture')}
                                    </Button>
                                </Flex>
                            ) : (
                                <Input type="file" name="profilePic" onChange={handleChange} />
                            )}
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>{t('register.about')}</FormLabel>
                            <Textarea name="about" value={formData.about} onChange={handleChange} maxLength={200} placeholder={t('register.tell_us_more_about_yourself')} rows={5} />
                        </FormControl>
                    </SimpleGrid>
                    <Button mt={2} type="submit" colorScheme="teal">
                        {t('common.submit')}
                    </Button>
                </form>
            </Box>
        </Container>
    );
}
