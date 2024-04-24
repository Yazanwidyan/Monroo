import { useContext, useMemo } from 'react';
import countryList from '../../../../constants/countries.json';
import musicalInstrumentsList from '../../../../constants/instruments.json';
import musicGenresList from '../../../../constants/music_genres.json';
import educationList from '../../../../constants/education.json';
import visaTypeList from '../../../../constants/visa.json';

import { EditServiceProviderContext } from '../../../../contexts/EditServiceProviderContext';
import { LookupsContext } from '../../../../contexts/LookupsContext';

export default function useEditServiceProviderProfessionalInfo() {
    const {
        professionalInfo,
        handleProfessionalInfoChange,
        resumeError,
        picError,
        resumeFile,
        picFile,
        resumeInputKey,
        picInputKey,
        onResumeChange,
        onPicChange,
        oneMinuteVideoFile,
        demoReelFile,
        portfolioFile,
        videosFile,
        audiosFile,
        audiosInputKey,
        oneMinuteVideoInputKey,
        demoReelInputKey,
        portfolioInputKey,
        videosInputKey,
        onOneMinuteVideoChange,
        onDemoReelChange,
        onPortfolioChange,
        onVideosChange,
        onAudiosChange,
        oneMinuteVideoError,
        demoReelError,
        portfolioError,
        audiosError,
        videosError,
        imageFiles,
        imagesInputKey,
        onImagesChange,
        imagesError,
    } = useContext(EditServiceProviderContext);

    const { registerServiceProviderLookup } = useContext(LookupsContext);

    const countries: { name: string; code: string }[] = useMemo(() => countryList.filter((country) => country.code !== 'IL'), []);

    const musicalInstruments: { name: string; id: number }[] = useMemo(() => musicalInstrumentsList, []);

    const musicGenres: { name: string; id: number }[] = useMemo(() => musicGenresList, []);

    const education: {
        name: string;
        nameAR: string;
        nameRUS: string;
        code: string;
    }[] = useMemo(() => educationList, []);

    const visaType: { name: string; id: number }[] = useMemo(() => visaTypeList, []);

    return {
        professionalInfo,
        handleProfessionalInfoChange,
        countries,
        musicalInstruments,
        musicGenres,
        education,
        visaType,
        resumeError,
        picError,
        resumeFile,
        picFile,
        resumeInputKey,
        picInputKey,
        onResumeChange,
        onPicChange,
        oneMinuteVideoFile,
        demoReelFile,
        portfolioFile,
        videosFile,
        audiosFile,
        oneMinuteVideoInputKey,
        demoReelInputKey,
        portfolioInputKey,
        videosInputKey,
        audiosInputKey,
        onOneMinuteVideoChange,
        onDemoReelChange,
        onPortfolioChange,
        onVideosChange,
        onAudiosChange,
        oneMinuteVideoError,
        demoReelError,
        portfolioError,
        videosError,
        audiosError,
        imageFiles,
        imagesInputKey,
        onImagesChange,
        imagesError,
        registerServiceProviderLookup,
    };
}
