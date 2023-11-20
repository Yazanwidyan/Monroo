import {
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Select,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import useRegisterServiceProviderPersonalInfo from "./useRegisterServiceProviderPersonalInfo";

export default function RegisterServiceProviderPersonalInfo() {
  const state = useRegisterServiceProviderPersonalInfo();

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} rowGap="20px" columnGap="20px">
      <FormControl>
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
      <FormControl>
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
      <FormControl>
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
      <FormControl>
        <FormLabel>Nationality</FormLabel>
        <Select
          placeholder="Select country"
          value={state.personalInfo.nationality}
          onChange={state.handlePersonalInfoChange}
          name="nationality"
        >
          {state.countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl>
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
      <FormControl>
        <FormLabel>Birthday</FormLabel>
        <Input
          type="date"
          name="dob"
          placeholder="Enter birthday"
          value={state.personalInfo.dob}
          onChange={state.handlePersonalInfoChange}
          max={new Date().toISOString().split("T")[0]}
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          name="password"
          placeholder="Enter password"
          value={state.personalInfo.password}
          onChange={state.handlePersonalInfoChange}
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel>Confirm Password</FormLabel>
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={state.personalInfo.confirmPassword}
          onChange={state.handlePersonalInfoChange}
          required
        />
      </FormControl>
    </SimpleGrid>
  );
}
