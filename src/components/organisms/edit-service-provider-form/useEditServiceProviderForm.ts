import { useSteps } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { LookupsContext } from '../../../contexts/LookupsContext';
import commonService from '../../../services/commonServices';
import useCustomToast from '../../../hooks/useCustomToast';
import { useTranslation } from 'react-i18next';
import useEditServiceProviderCategories from '../../molecules/edit-service-provider/categories/useEditServiceProviderCategories';
import useEditServiceProviderPersonalInfo from '../../molecules/edit-service-provider/personal-info/useEditServiceProviderPersonalInfo';
import useEditServiceProviderProfessionalInfo from '../../molecules/edit-service-provider/professional-info/useEditServiceProviderProfessionalInfo';

export default function useEditServiceProviderForm(props) {
    const { t } = useTranslation();

    const steps = [
        { title: t('register.first_step'), description: t('register.personal_info') },
        {
            title: t('register.second_step'),
            description: t('register.professional_info'),
        },
    ];

    const stepsState = useSteps({
        index: 1,
        count: steps.length,
    });

    const { updateRegisterServiceProviderLookup } = useContext(LookupsContext);

    const state1 = useEditServiceProviderCategories();
    const state2 = useEditServiceProviderPersonalInfo();
    const state3 = useEditServiceProviderProfessionalInfo();

    const { showToast } = useCustomToast();
    const navigate = useNavigate();

    async function handleNextClick(): Promise<void> {
        const payload = {
            catID: state1.selectedCategory.value,
            subCatID: state1.selectedSubCategories.value,
        };
        try {
            const res = await commonService.getProviderlookups(payload);
            updateRegisterServiceProviderLookup(res.data);
        } catch (error) {
            showToast(error, { status: 'error' });
        }
    }

    function handleBackClick(): void {
        const isFirstStep = stepsState.activeStep === 1;
        console.log('ccc', stepsState.activeStep);

        if (isFirstStep) {
            navigate('/register');
            return;
        }

        stepsState.goToPrevious();
    }

    function handleSubmit(e): void {
        e.preventDefault();
        const isSecondStep = stepsState.activeStep === 1;
        isSecondStep && handleNextClick();
        stepsState.goToNext();
        stepsState.activeStep === 2 &&
            props.handleSubmit(
                state1.selectedCategory,
                state1.selectedSubCategories,
                state2.personalInfo,
                state3.professionalInfo,
                state3.resumeFile,
                state3.imageFiles,
                state3.oneMinuteVideoFile,
                state3.demoReelFile,
                state3.portfolioFile,
                state3.videosFile,
                state3.audiosFile
            );
    }

    return {
        stepsState,
        steps,
        handleNextClick,
        handleBackClick,
        handleSubmit,
    };
}
