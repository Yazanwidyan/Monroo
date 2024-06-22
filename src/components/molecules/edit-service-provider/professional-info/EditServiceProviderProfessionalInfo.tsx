import { Flex, FormControl, FormLabel, IconButton, Input, List, ListItem, Select, SimpleGrid, Text, Textarea } from '@chakra-ui/react';
import useEditServiceProviderProfessionalInfo from './useEditServiceProviderProfessionalInfo';
import { useTranslation } from 'react-i18next';
import { CloseIcon } from '@chakra-ui/icons';
import languagesList from '../../../../constants/languages.json';

export default function EditServiceProviderProfessionalInfo() {
    const state = useEditServiceProviderProfessionalInfo();
    const { t, i18n } = useTranslation();

    // const removeFile = () => {
    //   Logic to remove the selected file from state
    //   For example:
    //   updateState({ resumeFile: [], resumeInputKey: Date.now() });
    // };

    return (
        <SimpleGrid columns={{ base: 1, md: 2 }} rowGap="20px" columnGap="20px">
            <FormControl>
                <FormLabel>{t('register.email')}</FormLabel>
                <Input type="email" name="email" value={state.professionalInfo.email} onChange={state.handleProfessionalInfoChange} required />
            </FormControl>
            <FormControl>
                <FormLabel>{t('register.phone_number')}</FormLabel>
                <Input
                    type="tel"
                    value={state.professionalInfo.phone}
                    onChange={state.handleProfessionalInfoChange}
                    pattern="^(\+|00)[1-9][0-9 \-\(\)\.]{7,32}$"
                    name="phone"
                    placeholder="+971 XXX XXX XXX"
                    required
                    className="tel-rtl"
                />
            </FormControl>
            {state.registerServiceProviderLookup.averageRatePerHour && (
                <FormControl>
                    <FormLabel>{t('register.average_Rate_per_Hour')}</FormLabel>
                    <Input
                        type="number"
                        value={state.professionalInfo.averageRatePerHour}
                        onChange={state.handleProfessionalInfoChange}
                        name="averageRatePerHour"
                        placeholder={t('register.enter_your_average_rate_per_hour_in_AED ')}
                        required
                    />
                </FormControl>
            )}
            {state.registerServiceProviderLookup.openToWorkInCountry && (
                <FormControl>
                    <FormLabel>{t('register.Open_to_Work_in_Country')}</FormLabel>
                    <Select value={state.professionalInfo.openToWorkInCountry} onChange={state.handleProfessionalInfoChange} name="openToWorkInCountry">
                        {state.countries.map((country) => (
                            <option key={country.code} value={country.name}>
                                {country.name}
                            </option>
                        ))}
                    </Select>
                </FormControl>
            )}
            {state.registerServiceProviderLookup.countryOfResidence && (
                <FormControl>
                    <FormLabel>{t('register.Country_of_Residence')}</FormLabel>
                    <Select value={state.professionalInfo.countryOfResidence} onChange={state.handleProfessionalInfoChange} name="countryOfResidence">
                        {state.countries.map((country) => (
                            <option key={country.code} value={country.name}>
                                {country.name}
                            </option>
                        ))}
                    </Select>
                </FormControl>
            )}
            {state.registerServiceProviderLookup.education && (
                <FormControl>
                    <FormLabel>{t('register.Education')}</FormLabel>
                    <Select value={state.professionalInfo.education} onChange={state.handleProfessionalInfoChange} name="education">
                        {state.education.map((edu) => (
                            <option key={edu.code} value={i18n?.language?.includes('en') ? edu.name : i18n.language === 'ar' ? edu.nameAR : edu.nameRUS}>
                                {i18n?.language?.includes('en') ? edu.name : i18n.language === 'ar' ? edu.nameAR : edu.nameRUS}
                            </option>
                        ))}
                    </Select>
                </FormControl>
            )}
            {state.registerServiceProviderLookup.spokenLanguage && (
                <FormControl>
                    <FormLabel>{t('register.spoken_languages')}</FormLabel>
                    <Select value={state.professionalInfo.spokenLanguage} onChange={state.handleProfessionalInfoChange} name="spokenLanguage">
                        {languagesList.map((language) => (
                            <option key={language.code} value={i18n?.language?.includes('en') ? language.name.en : language.name.ar}>
                                {i18n?.language?.includes('en') ? language.name.en : language.name.ar}
                            </option>
                        ))}
                    </Select>
                </FormControl>
            )}
            <FormControl>
                <FormLabel>{t('register.years_of_experience')}</FormLabel>
                <Input type="number" value={state.professionalInfo.experience} onChange={state.handleProfessionalInfoChange} name="experience" required />
            </FormControl>
            {state.registerServiceProviderLookup.visaType && (
                <FormControl>
                    <FormLabel>{t('register.visa_type')}</FormLabel>
                    <Select value={state.professionalInfo.visaType} onChange={state.handleProfessionalInfoChange} name="visaType">
                        {state.visaType.map((visa) => (
                            <option key={visa.id} value={visa.id}>
                                {visa.name}
                            </option>
                        ))}
                    </Select>
                </FormControl>
            )}
            {state.registerServiceProviderLookup.height && (
                <FormControl>
                    <FormLabel>{t('register.height')}</FormLabel>
                    <Input type="number" value={state.professionalInfo.height} onChange={state.handleProfessionalInfoChange} name="height" required />
                </FormControl>
            )}
            {state.registerServiceProviderLookup.weight && (
                <FormControl>
                    <FormLabel>{t('register.weight')}</FormLabel>
                    <Input type="number" value={state.professionalInfo.weight} onChange={state.handleProfessionalInfoChange} name="weight" required />
                </FormControl>
            )}
            {state.registerServiceProviderLookup.instagram && (
                <FormControl>
                    <FormLabel>{t('register.instagram_account_URL')}</FormLabel>
                    <Input type="url" name="instagram" value={state.professionalInfo.instagram} onChange={state.handleProfessionalInfoChange} required />
                </FormControl>
            )}
            {state.registerServiceProviderLookup.introductionVideoLink && (
                <FormControl>
                    <FormLabel>{t('register.introduction_video_link')}</FormLabel>
                    <Input type="url" name="introductionVideoLink" value={state.professionalInfo.introductionVideoLink} onChange={state.handleProfessionalInfoChange} required />
                </FormControl>
            )}
            {state.registerServiceProviderLookup.resume && (
                <FormControl>
                    <FormLabel>
                        {t('register.resume')} <span style={{ fontSize: '14px', color: 'gray' }}>(Allowed types: .pdf )</span>
                    </FormLabel>
                    {state.resumeFile.length === 0 && <Input type="file" key={state.resumeInputKey} accept=".pdf" onChange={state.onResumeChange} />}
                    {state.resumeError && <Text fontSize="10px">{state.resumeError}</Text>}
                    {state.resumeFile.length > 0 && (
                        <Flex alignItems={'center'}>
                            <Text>{t('register.selected_files')}</Text>
                            <List mt={1} mx={2}>
                                {state.resumeFile.map((file) => (
                                    <ListItem key={file.name}>
                                        {file.name}
                                        <IconButton icon={<CloseIcon />} aria-label="Remove file" mx={2} size="xs" onClick={state.onResumeChange} />
                                    </ListItem>
                                ))}
                            </List>
                        </Flex>
                    )}
                </FormControl>
            )}
            {state.registerServiceProviderLookup.oneMinuteVideo && (
                <FormControl>
                    <FormLabel>
                        {t('register.elevator_pitch')} <span style={{ fontSize: '14px', color: 'gray' }}>(Allowed types: .mp4)</span>
                    </FormLabel>
                    {state.oneMinuteVideoFile.length === 0 && <Input type="file" key={state.oneMinuteVideoInputKey} accept=".mp4" onChange={state.onOneMinuteVideoChange} />}
                    {state.oneMinuteVideoError && <Text fontSize="10px">{state.oneMinuteVideoError}</Text>}
                    {state.oneMinuteVideoFile.length > 0 && (
                        <Flex alignItems={'center'}>
                            <Text>{t('register.selected_files')}</Text>
                            <List mt={1} mx={2}>
                                {state.oneMinuteVideoFile.map((file) => (
                                    <ListItem key={file.name}>
                                        {file.name}
                                        <IconButton icon={<CloseIcon />} aria-label="Remove file" mx={2} size="xs" onClick={state.onOneMinuteVideoChange} />
                                    </ListItem>
                                ))}
                            </List>
                        </Flex>
                    )}
                </FormControl>
            )}
            {state.registerServiceProviderLookup.demoReel && (
                <FormControl>
                    <FormLabel>
                        {t('register.reel')} <span style={{ fontSize: '14px', color: 'gray' }}>(Allowed types: .mp4)</span>
                    </FormLabel>
                    {state.demoReelFile.length === 0 && <Input type="file" key={state.demoReelInputKey} accept=".mp4" onChange={state.onDemoReelChange} />}
                    {state.demoReelError && <Text fontSize="10px">{state.demoReelError}</Text>}
                    {state.demoReelFile.length > 0 && (
                        <Flex alignItems={'center'}>
                            <Text>{t('register.selected_files')}</Text>
                            <List mt={1} mx={2}>
                                {state.demoReelFile.map((file) => (
                                    <ListItem key={file.name}>
                                        {file.name}
                                        <IconButton icon={<CloseIcon />} aria-label="Remove file" mx={2} size="xs" onClick={state.onDemoReelChange} />
                                    </ListItem>
                                ))}
                            </List>
                        </Flex>
                    )}
                </FormControl>
            )}
            {state.registerServiceProviderLookup.videos && (
                <FormControl>
                    <FormLabel>
                        {t('register.videos')} <span style={{ fontSize: '14px', color: 'gray' }}>(Allowed types: .mp4)</span>
                    </FormLabel>
                    {state.videosFile.length === 0 && <Input type="file" key={state.videosInputKey} accept=".mp4" onChange={state.onVideosChange} multiple />}
                    {state.videosError && <Text fontSize="10px">{state.videosError}</Text>}
                    {state.videosFile.length > 0 && (
                        <Flex alignItems={'center'}>
                            <Text>
                                {t('register.selected_files')} {state.videosFile.length}
                            </Text>
                            <IconButton icon={<CloseIcon />} aria-label="Remove file" mx={2} size="xs" onClick={state.onVideosChange} />
                        </Flex>
                    )}
                </FormControl>
            )}
            {state.registerServiceProviderLookup.audios && (
                <FormControl>
                    <FormLabel>
                        {t('register.audios')} <span style={{ fontSize: '14px', color: 'gray' }}>(Allowed types: .mp4)</span>
                    </FormLabel>
                    {state.audiosFile.length === 0 && <Input type="file" key={state.audiosInputKey} accept=".mp4" onChange={state.onAudiosChange} multiple />}
                    {state.audiosError && <Text fontSize="10px">{state.audiosError}</Text>}
                    {state.audiosFile.length > 0 && (
                        <Flex alignItems={'center'}>
                            <Text>
                                {t('register.selected_files')} {state.audiosFile.length}{' '}
                            </Text>
                            <IconButton icon={<CloseIcon />} aria-label="Remove file" mx={2} size="xs" onClick={state.onAudiosChange} />
                        </Flex>
                    )}
                </FormControl>
            )}
            {state.registerServiceProviderLookup.photos && (
                <FormControl>
                    <FormLabel>
                        {t('register.photos')} <span style={{ fontSize: '14px', color: 'gray' }}>(Allowed types: .png .jpeg)</span>
                    </FormLabel>

                    {state.imageFiles.length === 0 && <Input type="file" key={state.imagesInputKey} accept=".png, .jpeg" onChange={state.onImagesChange} multiple />}
                    {state.imagesError && <Text fontSize="10px">{state.imagesError}</Text>}
                    {state.imageFiles.length > 0 && (
                        <Flex alignItems={'center'}>
                            <Text>
                                {t('register.selected_files')} {state.imageFiles.length}{' '}
                            </Text>
                            <IconButton icon={<CloseIcon />} aria-label="Remove file" mx={2} size="xs" onClick={state.onImagesChange} />
                        </Flex>
                    )}
                </FormControl>
            )}
            {state.registerServiceProviderLookup.youtubeLink && (
                <FormControl>
                    <FormLabel>{t('register.youtube_url')}</FormLabel>
                    <Input type="url" name="youtubeLink" value={state.professionalInfo.youtubeLink} onChange={state.handleProfessionalInfoChange} />
                </FormControl>
            )}
            {state.registerServiceProviderLookup.linkedin && (
                <FormControl>
                    <FormLabel>{t('register.linkedin_account_url')}</FormLabel>
                    <Input type="url" name="linkedin" value={state.professionalInfo.linkedin} onChange={state.handleProfessionalInfoChange} required />
                </FormControl>
            )}

            {state.registerServiceProviderLookup.portfolio && (
                <FormControl>
                    <FormLabel>
                        {t('register.portfolio')} <span style={{ fontSize: '14px', color: 'gray' }}>(Allowed types: .pdf)</span>
                    </FormLabel>
                    {state.portfolioFile.length === 0 && <Input type="file" key={state.portfolioInputKey} accept=".pdf" onChange={state.onPortfolioChange} />}
                    {state.portfolioError && <Text fontSize="10px">{state.portfolioError}</Text>}
                    {state.portfolioFile.length > 0 && (
                        <Flex alignItems={'center'}>
                            <Text>{t('register.selected_files')} </Text>
                            <List mt={1} mx={2}>
                                {state.portfolioFile.map((file) => (
                                    <ListItem key={file.name}>
                                        {file.name}
                                        <IconButton icon={<CloseIcon />} aria-label="Remove file" mx={2} size="xs" onClick={state.onPortfolioChange} />
                                    </ListItem>
                                ))}
                            </List>
                        </Flex>
                    )}
                </FormControl>
            )}
            {state.registerServiceProviderLookup.musicalInstruments && (
                <FormControl>
                    <FormLabel>{t('register.musical_instruments')}</FormLabel>
                    <Select value={state.professionalInfo.musicalInstruments} onChange={state.handleProfessionalInfoChange} name="musicalInstruments">
                        {state.musicalInstruments.map((instrument) => (
                            <option key={instrument.id} value={instrument.id}>
                                {instrument.name}
                            </option>
                        ))}
                    </Select>
                </FormControl>
            )}
            {state.registerServiceProviderLookup.musicGenres && (
                <FormControl>
                    <FormLabel>{t('register.music_genres')}</FormLabel>
                    <Select value={state.professionalInfo.musicGenres} onChange={state.handleProfessionalInfoChange} name="musicGenres">
                        {state.musicGenres.map((genre) => (
                            <option key={genre.id} value={genre.id}>
                                {genre.name}
                            </option>
                        ))}
                    </Select>
                </FormControl>
            )}
            {state.registerServiceProviderLookup.specialSkills && (
                <FormControl>
                    <FormLabel>{t('register.special_skills')}</FormLabel>
                    <Input type="text" name="specialSkills" value={state.professionalInfo.specialSkills} onChange={state.handleProfessionalInfoChange} required />
                </FormControl>
            )}
            <FormControl>
                <FormLabel>
                    {t('register.profilepic')} <span style={{ fontSize: '14px', color: 'gray' }}>(Allowed types: .png .jpeg)</span>
                </FormLabel>
                {state.picFile.length === 0 && <Input type="file" key={state.picInputKey} accept=".png, .jpeg" onChange={state.onPicChange} />}
                {state.picError && <Text fontSize="10px">{state.picError}</Text>}
                {state.picFile.length > 0 && (
                    <Flex alignItems={'center'}>
                        <Text>{t('register.selected_files')}</Text>
                        <List mt={1} mx={2}>
                            {state.picFile.map((file) => (
                                <ListItem key={file.name}>
                                    {file.name}
                                    <IconButton icon={<CloseIcon />} aria-label="Remove file" mx={2} size="xs" onClick={state.onPicChange} />
                                </ListItem>
                            ))}
                        </List>
                    </Flex>
                )}
            </FormControl>
            {state.registerServiceProviderLookup.bio && (
                <FormControl>
                    <FormLabel>
                        {t('register.bio')} <span style={{ fontSize: '14px', color: 'gray' }}>(150 - 300 {t('register.words')})</span>
                    </FormLabel>
                    <Textarea name="bio" maxLength={300} minLength={150} value={state.professionalInfo.bio} onChange={state.handleProfessionalInfoChange} required />
                </FormControl>
            )}
        </SimpleGrid>
    );
}
