import {
  Box,
  FormControl,
  FormLabel,
  Input,
  List,
  ListItem,
  Select,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import useRegisterServiceProviderProfessionalInfo from "./useRegisterServiceProviderProfessionalInfo";
import { useTranslation } from "react-i18next";

export default function RegisterServiceProviderProfessionalInfo() {
  const state = useRegisterServiceProviderProfessionalInfo();
  const { i18n } = useTranslation();

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} rowGap="20px" columnGap="20px">
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          name="email"
          placeholder="Enter email"
          value={state.professionalInfo.email}
          onChange={state.handleProfessionalInfoChange}
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel>Phone Number</FormLabel>
        <Input
          type="tel"
          value={state.professionalInfo.phone}
          onChange={state.handleProfessionalInfoChange}
          pattern="^(\+|00)[1-9][0-9 \-\(\)\.]{7,32}$"
          name="phone"
          placeholder="+971 XXX XXX XXX"
          required
        />
      </FormControl>
      {state.registerServiceProviderLookup.averageRatePerHour && (
        <FormControl>
          <FormLabel>Average Rate per Hour</FormLabel>
          <Input
            type="number"
            value={state.professionalInfo.averageRatePerHour}
            onChange={state.handleProfessionalInfoChange}
            name="averageRatePerHour"
            placeholder="Enter your average rate per hour in AED"
            required
          />
        </FormControl>
      )}
      {state.registerServiceProviderLookup.openToWorkInCountry && (
        <FormControl>
          <FormLabel>Open to Work in Country</FormLabel>
          <Select
            placeholder="Select country"
            value={state.professionalInfo.openToWorkInCountry}
            onChange={state.handleProfessionalInfoChange}
            name="openToWorkInCountry"
          >
            {state.countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </Select>
        </FormControl>
      )}
      {state.registerServiceProviderLookup.countryOfResidence && (
        <FormControl>
          <FormLabel>Country of Residence</FormLabel>
          <Select
            placeholder="Select country"
            value={state.professionalInfo.countryOfResidence}
            onChange={state.handleProfessionalInfoChange}
            name="countryOfResidence"
          >
            {state.countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </Select>
        </FormControl>
      )}
      {state.registerServiceProviderLookup.education && (
        <FormControl>
          <FormLabel>Education</FormLabel>
          <Select
            placeholder="Select education"
            value={state.professionalInfo.education}
            onChange={state.handleProfessionalInfoChange}
            name="education"
          >
            {state.education.map((edu) => (
              <option key={edu.code} value={edu.code}>
                {i18n.language === "en"
                  ? edu.name
                  : i18n.language === "ar"
                  ? edu.nameAR
                  : edu.nameRUS}
              </option>
            ))}
          </Select>
        </FormControl>
      )}
      {state.registerServiceProviderLookup.spokenLanguage && (
        <FormControl>
          <FormLabel>Spoken Languages</FormLabel>
          <Input
            type="text"
            name="spokenLanguages"
            placeholder="Enter spoken languages"
            value={state.professionalInfo.spokenLanguages}
            onChange={state.handleProfessionalInfoChange}
            required
          />
        </FormControl>
      )}
      <FormControl>
        <FormLabel>Years of Experience</FormLabel>
        <Input
          type="number"
          value={state.professionalInfo.experience}
          onChange={state.handleProfessionalInfoChange}
          name="experience"
          placeholder="Enter your years of experience"
          required
        />
      </FormControl>
      {state.registerServiceProviderLookup.visaType && (
        <FormControl>
          <FormLabel>Visa Type</FormLabel>
          <Select
            placeholder="Select your visa type"
            value={state.professionalInfo.visaType}
            onChange={state.handleProfessionalInfoChange}
            name="visaType"
          >
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
          <FormLabel>Height</FormLabel>
          <Input
            type="number"
            value={state.professionalInfo.height}
            onChange={state.handleProfessionalInfoChange}
            name="height"
            placeholder="Enter your height"
            required
          />
        </FormControl>
      )}
      {state.registerServiceProviderLookup.weight && (
        <FormControl>
          <FormLabel>Weight</FormLabel>
          <Input
            type="number"
            value={state.professionalInfo.weight}
            onChange={state.handleProfessionalInfoChange}
            name="weight"
            placeholder="Enter your height"
            required
          />
        </FormControl>
      )}
      {state.registerServiceProviderLookup.instagram && (
        <FormControl>
          <FormLabel>Instagram Account URL</FormLabel>
          <Input
            type="url"
            name="instagram"
            placeholder="Enter your instagram account URL"
            value={state.professionalInfo.instagram}
            onChange={state.handleProfessionalInfoChange}
            required
          />
        </FormControl>
      )}
      {state.registerServiceProviderLookup.introductionVideoLink && (
        <FormControl>
          <FormLabel>introduction video link</FormLabel>
          <Input
            type="url"
            name="introductionVideoLink"
            placeholder="Enter your introduction video link"
            value={state.professionalInfo.instagram}
            onChange={state.handleProfessionalInfoChange}
            required
          />
        </FormControl>
      )}
      {state.registerServiceProviderLookup.resume && (
        <FormControl>
          <FormLabel>Resume</FormLabel>
          <Input
            type="file"
            key={state.resumeInputKey}
            accept=".pdf"
            placeholder="Upload your resume"
            onChange={state.onResumeChange}
          />
          {state.resumeError && (
            <Text fontSize="10px">{state.resumeError}</Text>
          )}
          {state.resumeFile.length > 0 && (
            <Box>
              <Text>Selected Files:</Text>
              <List>
                {state.resumeFile.map((file) => (
                  <ListItem key={file.name}>{file.name}</ListItem>
                ))}
              </List>
            </Box>
          )}
        </FormControl>
      )}
      {state.registerServiceProviderLookup.oneMinuteVideo && (
        <FormControl>
          <FormLabel>Elevator Pitch</FormLabel>
          <Input
            type="file"
            key={state.oneMinuteVideoInputKey}
            accept=".mp4"
            placeholder="Upload your elevator pitch"
            onChange={state.onOneMinuteVideoChange}
          />
          {state.oneMinuteVideoError && (
            <Text fontSize="10px">{state.oneMinuteVideoError}</Text>
          )}
          {state.oneMinuteVideoFile.length > 0 && (
            <Box>
              <Text>Selected Files:</Text>
              <List>
                {state.oneMinuteVideoFile.map((file) => (
                  <ListItem key={file.name}>{file.name}</ListItem>
                ))}
              </List>
            </Box>
          )}
        </FormControl>
      )}
      {state.registerServiceProviderLookup.videos && (
        <FormControl>
          <FormLabel>Videos</FormLabel>
          <Input
            type="file"
            key={state.videosInputKey}
            accept=".mp4"
            placeholder="Upload your elevator pitch"
            onChange={state.onVideosChange}
          />
          {state.videosError && (
            <Text fontSize="10px">{state.videosError}</Text>
          )}
          {state.videosFile.length > 0 && (
            <Box>
              <Text>Selected Files:</Text>
              <List>
                {state.videosFile.map((file) => (
                  <ListItem key={file.name}>{file.name}</ListItem>
                ))}
              </List>
            </Box>
          )}
        </FormControl>
      )}
      {state.registerServiceProviderLookup.audios && (
        <FormControl>
          <FormLabel>audios</FormLabel>
          <Input
            type="file"
            key={state.audiosInputKey}
            accept=".mp4"
            placeholder="Upload your elevator pitch"
            onChange={state.onAudiosChange}
          />
          {state.audiosError && (
            <Text fontSize="10px">{state.audiosError}</Text>
          )}
          {state.audiosFile.length > 0 && (
            <Box>
              <Text>Selected Files:</Text>
              <List>
                {state.audiosFile.map((file) => (
                  <ListItem key={file.name}>{file.name}</ListItem>
                ))}
              </List>
            </Box>
          )}
        </FormControl>
      )}
      {state.registerServiceProviderLookup.photos && (
        <FormControl>
          <FormLabel>Photos</FormLabel>
          <Input
            type="file"
            key={state.imagesInputKey}
            accept=".png, .jpeg"
            placeholder="Upload four photos of you"
            onChange={state.onImagesChange}
          />
          {state.imagesError && (
            <Text fontSize="10px">{state.imagesError}</Text>
          )}
          {state.imageFiles.length > 0 && (
            <Box>
              <Text>Selected Files:</Text>
              <List>
                {state.imageFiles.map((file) => (
                  <ListItem key={file.name}>{file.name}</ListItem>
                ))}
              </List>
            </Box>
          )}
        </FormControl>
      )}
      {/* <FormControl>
        <FormLabel>Resume</FormLabel>
        <Input
          type="file"
          key={state.resumeInputKey}
          accept=".pdf"
          placeholder="Upload your resume"
          onChange={state.onResumeChange}
        />
        {state.resumeError && <Text fontSize="10px">{state.resumeError}</Text>}
        {state.resumeFile.length > 0 && (
          <Box>
            <Text>Selected Files:</Text>
            <List>
              {state.resumeFile.map((file) => (
                <ListItem key={file.name}>{file.name}</ListItem>
              ))}
            </List>
          </Box>
        )}
      </FormControl> */}
      {state.registerServiceProviderLookup.youtubeLink && (
        <FormControl>
          <FormLabel>Youtube URL</FormLabel>
          <Input
            type="url"
            name="youtubeLink"
            placeholder="Enter youtube channel URL"
            value={state.professionalInfo.youtubeLink}
            onChange={state.handleProfessionalInfoChange}
          />
        </FormControl>
      )}
      {state.registerServiceProviderLookup.linkedin && (
        <FormControl>
          <FormLabel>LinkedIn Account URL</FormLabel>
          <Input
            type="url"
            name="linkedin"
            placeholder="Enter your linkedin account URL"
            value={state.professionalInfo.linkedin}
            onChange={state.handleProfessionalInfoChange}
            required
          />
        </FormControl>
      )}

      {state.registerServiceProviderLookup.portfolio && (
        <FormControl>
          <FormLabel>Portfolio URL</FormLabel>
          <Input
            type="url"
            name="portfolio"
            placeholder="Enter your portfolio URL"
            value={state.professionalInfo.portfolio}
            onChange={state.handleProfessionalInfoChange}
            required
          />
        </FormControl>
      )}
      {state.registerServiceProviderLookup.bio && (
        <FormControl>
          <FormLabel>Bio</FormLabel>
          <Input
            type="text"
            name="bio"
            placeholder="Enter bio"
            value={state.professionalInfo.bio}
            onChange={state.handleProfessionalInfoChange}
            required
          />
        </FormControl>
      )}
      {state.registerServiceProviderLookup.musicalInstruments && (
        <FormControl>
          <FormLabel>Musical Instruments</FormLabel>
          <Select
            placeholder="Select instrument"
            value={state.professionalInfo.musicalInstruments}
            onChange={state.handleProfessionalInfoChange}
            name="musicalInstruments"
          >
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
          <FormLabel>Music Genres</FormLabel>
          <Select
            placeholder="Select music genres"
            value={state.professionalInfo.musicGenres}
            onChange={state.handleProfessionalInfoChange}
            name="musicGenres"
          >
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
          <FormLabel>Special Skills</FormLabel>
          <Input
            type="text"
            name="specialSkills"
            placeholder="Enter your special skills"
            value={state.professionalInfo.specialSkills}
            onChange={state.handleProfessionalInfoChange}
            required
          />
        </FormControl>
      )}
    </SimpleGrid>
  );
}
