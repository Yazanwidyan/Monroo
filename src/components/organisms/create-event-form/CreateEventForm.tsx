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

import { CreateEvent } from "../../../models/CreateEvent";
import styles from "./CreateEventForm.module.scss";
import useCreateEventForm from "./useCreateEventForm";

export type CreateEventFormProps = {
  onSubmit(createEvent: CreateEvent): Promise<void>;
  onBackClick(): void;
};

export default function CreateEventForm(props: CreateEventFormProps) {
  const state = useCreateEventForm({ onSubmit: props.onSubmit });

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
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                name="username"
                placeholder="Enter username"
                value={state.createEvent.username}
                onChange={state.handleCreateEventChange}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                placeholder="Enter email"
                value={state.createEvent.email}
                onChange={state.handleCreateEventChange}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                placeholder="Enter password"
                value={state.createEvent.password}
                onChange={state.handleCreateEventChange}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={state.createEvent.confirmPassword}
                onChange={state.handleCreateEventChange}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Country</FormLabel>
              <Select
                placeholder="Select country"
                value={state.createEvent.country}
                onChange={state.handleCreateEventChange}
                name="country"
              >
                {state.countries.map((country) => (
                  <option key={country.value} value={country.value}>
                    {country.label}
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
                value={state.createEvent.companyName}
                onChange={state.handleCreateEventChange}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Phone Number</FormLabel>
              <Input
                type="tel"
                value={state.createEvent.phone}
                onChange={state.handleCreateEventChange}
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
                  label: category.name,
                  value: category.id,
                }))}
              />
            </FormControl>
            <FormControl gridColumn="1/-1">
              <FormLabel>About</FormLabel>
              <Textarea
                value={state.createEvent.about}
                onChange={state.handleCreateEventChange}
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
