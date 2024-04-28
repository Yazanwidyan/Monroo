import { useContext, useMemo, useState } from 'react';
import { FormControl, FormLabel, Input, Button, Container, SimpleGrid, Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import countryList from '../../../../constants/countries.json';
import { Select as MultiSelect } from 'chakra-react-select';
import { LookupsContext } from '../../../../contexts/LookupsContext';
import { UserContext } from '../../../../contexts/UserContext';
import authServices from '../../../../services/authServices';
import useCustomToast from '../../../../hooks/useCustomToast';

export default function EasyRegisterProviderPage() {
    const { categories, subCategories } = useContext(LookupsContext);
    const location = useLocation();
    const { updateUser } = useContext(UserContext);

    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const { showToast } = useCustomToast();

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategories, setSelectedSubCategories] = useState(null);

    const [imageFile, setImageFile] = useState(location?.state?.formData?.profilePic || null);
    const [formData, setFormData] = useState({
        firstName: location?.state?.formData?.username.split(' ')[0],
        lastName: location?.state?.formData?.username.split(' ')[1],
        username: location?.state?.formData?.email,
        mobile: '',
        email: location?.state?.formData?.email,
        profilePic: location?.state?.formData?.profilePic || '',
        catID: null,
        subCatID: null,
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

    const handleCategoriesChange = (selectedOption) => {
        const selectedCategoryId = selectedOption.value;
        setSelectedCategory(selectedCategoryId);
        setFormData({ ...formData, catID: selectedCategoryId });
        setSelectedSubCategories(null);
    };

    const handleSubCategoriesChange = (selectedOption) => {
        const selectedSubCategoryId = selectedOption;
        setSelectedSubCategories(selectedSubCategoryId);

        setFormData({ ...formData, subCatID: selectedSubCategoryId });
    };
    const filteredSubCategories = useMemo(() => {
        if (selectedCategory) {
            return subCategories.filter((subCategory) => subCategory.categoryId === selectedCategory);
        }
        return [];
    }, [selectedCategory, subCategories]);
    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            fname: formData.firstName,
            lname: formData.lastName,
            username: formData.username,
            phone: formData.mobile,
            email: formData.email,
            catID: formData.catID,
            subCatID: formData.subCatID,
            profilePic: formData.profilePic,
            visaType: 0,
        };

        const data = new FormData();
        data.append('profilePic', imageFile);
        data.append('data', JSON.stringify(payload));

        try {
            const res = await authServices.socialRegisterProvider(data);
            updateUser(res.data);
            navigate('/timeline', { replace: true });
        } catch (error) {
            showToast(error, { status: 'error' });
        }
        console.log(formData);
    };

    return (
        <Container maxW={'5xl'} mt={10}>
            <form onSubmit={handleSubmit}>
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
                <SimpleGrid columns={{ base: 1, md: 2 }} rowGap="20px" columnGap="20px">
                    <FormControl isRequired mb={4}>
                        <FormLabel>{t('Category')}</FormLabel>
                        <MultiSelect
                            required
                            onChange={handleCategoriesChange}
                            placeholder={t('Select Category')}
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
                    <FormControl isRequired mb={4} isDisabled={!selectedCategory}>
                        <FormLabel>{t('Subcategory')}</FormLabel>
                        <MultiSelect
                            required
                            value={selectedSubCategories}
                            onChange={handleSubCategoriesChange}
                            placeholder={t('Select Subcategory')}
                            name="subCategories"
                            options={filteredSubCategories.map((category) => ({
                                label: i18n?.language?.includes('en') ? category.name : i18n?.language?.includes('ar') ? category.nameAR : category.nameRUS,
                                value: category.id,
                                id: category.id,
                                catID: category.categoryId,
                                name: category.name,
                                nameAR: category.nameAR,
                                nameRUS: category.nameRUS,
                            }))}
                        />
                    </FormControl>
                    <FormControl isRequired mb={4}>
                        <FormLabel>{t('First Name')}</FormLabel>
                        <Input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                    </FormControl>
                    <FormControl isRequired mb={4}>
                        <FormLabel>{t('Last Name')}</FormLabel>
                        <Input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                    </FormControl>
                    <FormControl isRequired mb={4}>
                        <FormLabel>{t('Mobile')}</FormLabel>
                        <Input type="text" name="mobile" value={formData.mobile} onChange={handleChange} />
                    </FormControl>
                    <FormControl isRequired mb={4}>
                        <FormLabel>{t('Email')}</FormLabel>
                        <Input type="email" name="email" value={formData.email} onChange={handleChange} />
                    </FormControl>
                </SimpleGrid>
                <Button mb={5} type="submit" colorScheme="primary">
                    {t('Submit')}
                </Button>
            </form>
        </Container>
    );
}
