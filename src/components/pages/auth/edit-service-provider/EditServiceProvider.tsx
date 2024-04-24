import EditServiceProviderForm from '../../../organisms/edit-service-provider-form/editServiceProviderForm';
import useCustomToast from '../../../../hooks/useCustomToast';
import { useContext } from 'react';
import { UserContext } from '../../../../contexts/UserContext';
import EditServiceProviderContextProvider from '../../../../contexts/EditServiceProviderContext';
import providerServices from '../../../../services/providerServices';

export default function EditServiceProvider({ providerProfile, onClose }) {
    const { showToast } = useCustomToast();
    const { updateUser } = useContext(UserContext);

    return (
        <EditServiceProviderContextProvider providerProfile={providerProfile}>
            <EditServiceProviderForm
                handleSubmit={async (
                    selectedCategory,
                    selectedSubCategories,
                    personalInfo,
                    professionalInfo,
                    resumeFile,
                    imageFiles,
                    oneMinuteVideoFile,
                    demoReelFile,
                    portfolioFile,
                    videosFile,
                    audiosFile
                ) => {
                    const data = new FormData();
                    const otherData = {
                        ...personalInfo,
                        ...professionalInfo,
                        visaType: professionalInfo.visaType || 0,
                        catID: selectedCategory.value,
                        subCatID: selectedSubCategories,
                    };
                    console.log('otherData', otherData);

                    data.append('resumeCV', resumeFile[0]);
                    imageFiles.forEach((file) => {
                        data.append(`images`, file);
                    });
                    videosFile.forEach((file) => {
                        data.append(`videos`, file);
                    });
                    audiosFile.forEach((file) => {
                        data.append(`audios`, file);
                    });
                    data.append('onevideo', oneMinuteVideoFile[0]);
                    data.append('reel', demoReelFile[0]);
                    data.append('portfolio', portfolioFile[0]);
                    data.append('data', JSON.stringify(otherData));

                    try {
                        const res = await providerServices.updateProvider(data);

                        console.log('res', res.data);
                        const { token, ...userData } = res.data;
                        console.log('userData', userData);

                        updateUser(userData);
                        onClose();
                    } catch (error) {
                        onClose();
                        showToast(error, { status: 'error' });
                    }
                }}
            />
        </EditServiceProviderContextProvider>
    );
}
