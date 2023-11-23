import {
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Button,
  Flex,
  Heading,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { Select as MultiSelect } from "chakra-react-select";

import { RegisterEmployer } from "../../../models/RegisterEmployer";
import useRegisterEmployerForm from "./useRegisterEmployerForm";
import styles from "./RegisterEmployerForm.module.scss";
import { useTranslation } from "react-i18next";

export type RegisterEmployerFormProps = {
  onSubmit(registerEmployer: RegisterEmployer): Promise<void>;
  onBackClick(): void;
};

export default function RegisterEmployerForm(props: RegisterEmployerFormProps) {
  const state = useRegisterEmployerForm({ onSubmit: props.onSubmit });
  const { i18n } = useTranslation();

  return (
    <Card margin="auto" width="80%">
      <CardHeader as="section" textAlign="center">
        <Heading as="h2" color="blackAlpha.700" fontSize="19px">
          Register Employer
        </Heading>
      </CardHeader>
      <CardBody as="section">
        <form onSubmit={state.handleSubmit}>
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            rowGap="20px"
            columnGap="20px"
          >
            <FormControl>
              <FormLabel>First & last name</FormLabel>
              <Input
                type="text"
                name="name"
                placeholder="Enter First & last name"
                value={state.registerEmployer.name}
                onChange={state.handleRegisterEmployerChange}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                name="username"
                placeholder="Enter username"
                value={state.registerEmployer.username}
                onChange={state.handleRegisterEmployerChange}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                placeholder="Enter email"
                value={state.registerEmployer.email}
                onChange={state.handleRegisterEmployerChange}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                placeholder="Enter password"
                value={state.registerEmployer.password}
                onChange={state.handleRegisterEmployerChange}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={state.registerEmployer.confirmPassword}
                onChange={state.handleRegisterEmployerChange}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Country</FormLabel>
              <Select
                placeholder="Select country"
                value={state.registerEmployer.country}
                onChange={state.handleRegisterEmployerChange}
                name="country"
              >
                {state.countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Company Name</FormLabel>
              <Input
                type="text"
                name="companyName"
                placeholder="Enter company name"
                value={state.registerEmployer.companyName}
                onChange={state.handleRegisterEmployerChange}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Phone Number</FormLabel>
              <Input
                type="tel"
                value={state.registerEmployer.phone}
                onChange={state.handleRegisterEmployerChange}
                pattern="^(\+|00)[1-9][0-9 \-\(\)\.]{7,32}$"
                name="phone"
                placeholder="+971 XXX XXX XXX"
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Preferred Categories</FormLabel>
              <MultiSelect
                className={styles.categoriesMultiSelect}
                closeMenuOnSelect={false}
                isSearchable={true}
                isMulti={true}
                onChange={(categories) =>
                  state.handleCategoriesChange(
                    categories.map((category) => category.value)
                  )
                }
                placeholder="Select categories"
                name="categories"
                options={state.categories.map((category) => ({
                  label:
                    i18n.language == "en"
                      ? category.name
                      : i18n.language == "ar"
                      ? category.nameAR
                      : category.nameRUS,
                  value: category.id,
                  catID: category.id,
                  name: category.name,
                  nameAR: category.nameAR,
                  nameRUS: category.nameRUS,
                }))}
              />
            </FormControl>
            <FormControl gridColumn="1/-1">
              <FormLabel>About</FormLabel>
              <Textarea
                value={state.registerEmployer.about}
                onChange={state.handleRegisterEmployerChange}
                name="about"
                maxLength={255}
                placeholder="Tell us more about yourself"
                rows={5}
              />
            </FormControl>
          </SimpleGrid>
          <Flex marginTop="25px" justifyContent="space-between">
            <Button
              fontSize="14px"
              variant="ghost"
              onClick={props.onBackClick}
              type="button"
            >
              Back
            </Button>
            <Button fontSize="14px" colorScheme="telegram" type="submit">
              Submit
            </Button>
          </Flex>
        </form>
      </CardBody>
    </Card>
  );
}
