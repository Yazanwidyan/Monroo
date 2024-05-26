import { useContext, useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button, Grid, GridItem, Container, Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../../contexts/UserContext';
import authServices from '../../../../services/authServices';
import useCustomToast from '../../../../hooks/useCustomToast';

export default function EasyRegisterUserPage() {
    const location = useLocation();
    const { updateUser } = useContext(UserContext);

    const navigate = useNavigate();
    const { t } = useTranslation();
    const { showToast } = useCustomToast();

    const [formData, setFormData] = useState({
        name: location?.state?.formData?.username.split(' ')[0],
        mobile: '',
        email: location?.state?.formData?.email,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            phone: formData?.mobile,
            email: formData?.email,
            name: formData?.name,
        };

        const data = new FormData();
        data.append('data', JSON.stringify(payload));

        try {
            const res = await authServices.socialRegisterUser(data);
            updateUser(res.data);
            navigate('/home', { replace: true });
        } catch (error) {
            showToast(error, { status: 'error' });
        }
    };

    return (
        <Container maxW="lg">
            <Heading mt={10} as="h2" size="xl" textAlign="center" mb={6}>
                {t('register.continue_registration')}
            </Heading>
            <Box p={8} borderColor="gray.200" borderRadius="lg" borderWidth={1} boxShadow="lg">
                <form onSubmit={handleSubmit}>
                    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
                        <GridItem>
                            <FormControl isRequired>
                                <FormLabel>{t('register.first_last_name')}</FormLabel>
                                <Input type="text" name="name" placeholder={t('register.enter_first_last_name')} value={formData.name} onChange={handleChange} required />
                            </FormControl>
                        </GridItem>
                        <GridItem>
                            <FormControl isRequired>
                                <FormLabel>{t('register.phone_number')}</FormLabel>
                                <Input type="text" name="mobile" placeholder={t('register.enter_phone_number')} value={formData.mobile} onChange={handleChange} required />
                            </FormControl>
                        </GridItem>
                        <GridItem colSpan={{ base: 1, md: 2 }}>
                            <FormControl isRequired>
                                <FormLabel>{t('register.email')}</FormLabel>
                                <Input type="email" name="email" placeholder={t('register.enter_email')} value={formData.email} onChange={handleChange} required />
                            </FormControl>
                        </GridItem>
                    </Grid>
                    <Button mt={6} type="submit" colorScheme="primary" width="full" size="lg">
                        {t('common.submit')}
                    </Button>
                </form>
            </Box>
        </Container>
    );
}
