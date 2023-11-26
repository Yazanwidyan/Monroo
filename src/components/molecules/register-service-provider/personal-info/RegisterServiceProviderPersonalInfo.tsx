import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
  Select,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import useRegisterServiceProviderPersonalInfo from "./useRegisterServiceProviderPersonalInfo";
import usePasswordVisibility from "../../../../hooks/usePasswordVisibility";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const maxDateFor18YearsOld = new Date(
  new Date().setFullYear(new Date().getFullYear() - 18)
)
  .toISOString()
  .split("T")[0];

export default function RegisterServiceProviderPersonalInfo() {
  const state = useRegisterServiceProviderPersonalInfo();
  const [passwordVisibility, togglePasswordVisibility] = usePasswordVisibility({
    password: false,
    confirmPassword: false,
  });

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} rowGap="20px" columnGap="20px">
      <FormControl isRequired>
        <FormLabel>First Name</FormLabel>
        <Input
          type="text"
          name="fname"
          placeholder="Enter first name"
          value={state.personalInfo.fname}
          onChange={state.handlePersonalInfoChange}
          required
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Last Name</FormLabel>
        <Input
          type="text"
          name="lname"
          placeholder="Enter last name"
          value={state.personalInfo.lname}
          onChange={state.handlePersonalInfoChange}
          required
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Gender</FormLabel>
        <RadioGroup
          onChange={(value) =>
            state.handlePersonalInfoChange(null, "gender", value)
          }
          value={state.personalInfo.gender}
          name="gender"
        >
          <Stack gap="20px" direction="row">
            <Radio value="0">Male</Radio>
            <Radio value="1">Female</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Nationality</FormLabel>
        <Select
          placeholder="Select country"
          value={state.personalInfo.nationality}
          onChange={state.handlePersonalInfoChange}
          name="nationality"
          required
        >
          {state.countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Username</FormLabel>
        <Input
          type="text"
          name="username"
          placeholder="Enter username"
          value={state.personalInfo.username}
          onChange={state.handlePersonalInfoChange}
          required
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Date of Birth</FormLabel>
        <Input
          type="date"
          name="dob"
          placeholder="Enter Date of Birth"
          value={state.personalInfo.dob}
          onChange={state.handlePersonalInfoChange}
          max={maxDateFor18YearsOld}
          className="date-rtl"
          required
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={passwordVisibility.password ? "text" : "password"}
            name="password"
            placeholder="Enter password"
            value={state.personalInfo.password}
            onChange={state.handlePersonalInfoChange}
            maxLength={20}
            minLength={6}
            required
          />
          <InputRightElement width="2.8rem">
            <IconButton
              h="1.75rem"
              size="sm"
              onClick={() => togglePasswordVisibility("password")}
              icon={
                passwordVisibility.password ? <ViewOffIcon /> : <ViewIcon />
              }
              aria-label={
                passwordVisibility.password ? "Hide password" : "Show password"
              }
            />
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={passwordVisibility.confirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm password"
            value={state.personalInfo.confirmPassword}
            onChange={state.handlePersonalInfoChange}
            maxLength={20}
            minLength={6}
            required
          />
          <InputRightElement width="2.8rem">
            <IconButton
              h="1.75rem"
              size="sm"
              onClick={() => togglePasswordVisibility("confirmPassword")}
              icon={
                passwordVisibility.confirmPassword ? (
                  <ViewOffIcon />
                ) : (
                  <ViewIcon />
                )
              }
              aria-label={
                passwordVisibility.confirmPassword
                  ? "Hide password"
                  : "Show password"
              }
            />
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </SimpleGrid>
  );
}
