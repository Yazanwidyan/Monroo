import { FormControl, FormLabel, Input, SimpleGrid, Button, Flex, Select } from '@chakra-ui/react';
import { Select as MultiSelect } from 'chakra-react-select';

import { CreateEvent } from '../../../models/CreateEvent';
import styles from './CreateEventForm.module.scss';
import useCreateEventForm from './useCreateEventForm';
import { useTranslation } from 'react-i18next';

export type CreateEventFormProps = {
    onSubmit(createEvent: CreateEvent): Promise<void>;
};

export default function CreateEventForm(props: CreateEventFormProps) {
    const state = useCreateEventForm({ onSubmit: props.onSubmit });
    const { i18n } = useTranslation();

    return (
        <form onSubmit={state.handleSubmit}>
            <SimpleGrid columns={{ base: 1, md: 2 }} rowGap="20px" columnGap="20px">
                <FormControl>
                    <FormLabel>Select Category</FormLabel>
                    <MultiSelect
                        value={state.selectedCategory}
                        className={styles.categoriesMultiSelect}
                        isSearchable={true}
                        onChange={state.handleCategoryChange}
                        placeholder="Select category"
                        required
                        name="catID"
                        options={state.categories.map((category) => ({
                            label: i18n.language == 'en' ? category.name : i18n.language == 'ar' ? category.nameAR : category.nameRUS,
                            value: category.id,
                            catID: category.id,
                            name: category.name,
                            nameAR: category.nameAR,
                            nameRUS: category.nameRUS,
                        }))}
                    />
                </FormControl>
                <FormControl isDisabled={!state.selectedCategory}>
                    <FormLabel>Select Sub-Categories</FormLabel>
                    <MultiSelect
                        value={state.selectedSubCategories}
                        className={styles.subCategoriesMultiSelect}
                        isSearchable={true}
                        onChange={state.handleSubCategoriesChange}
                        placeholder="Select sub-categories"
                        name="subCatID"
                        required
                        options={state.filteredSubCategories.map((category) => ({
                            label: i18n.language == 'en' ? category.name : i18n.language == 'ar' ? category.nameAR : category.nameRUS,
                            value: category.id,
                            catID: category.id,
                            name: category.name,
                            nameAR: category.nameAR,
                            nameRUS: category.nameRUS,
                        }))}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>title</FormLabel>
                    <Input type="text" name="title" placeholder="Enter title" value={state.createEvent.title} onChange={state.handleCreateEventChange} required />
                </FormControl>
                <FormControl>
                    <FormLabel>description</FormLabel>
                    <Input type="text" name="desc" placeholder="Enter description" value={state.createEvent.desc} onChange={state.handleCreateEventChange} required />
                </FormControl>
                <FormControl>
                    <FormLabel>cost</FormLabel>
                    <Input type="number" name="averageCost" placeholder="Enter cost" value={state.createEvent.averageCost} onChange={state.handleCreateEventChange} required />
                </FormControl>
                <FormControl>
                    <FormLabel>Location</FormLabel>
                    <Input type="text" name="location" placeholder="Enter location" value={state.createEvent.location} onChange={state.handleCreateEventChange} required />
                </FormControl>
                <FormControl>
                    <FormLabel>Gender</FormLabel>
                    <Select onChange={state.handleCreateEventChange} placeholder="Select option">
                        <option value="-1">Not specified</option>
                        <option value="0">Male</option>
                        <option value="1">Female</option>
                    </Select>
                </FormControl>

                <FormControl>
                    <FormLabel>start date</FormLabel>
                    <Input
                        type="date"
                        name="eventDate"
                        placeholder="Enter start date"
                        value={state.createEvent.eventDate}
                        onChange={state.handleCreateEventChange}
                        min={new Date().toISOString().split('T')[0]}
                        max={'2050-01-01'}
                        className="date-rtl"
                        required
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>end date</FormLabel>
                    <Input
                        type="date"
                        name="eventEndDate"
                        placeholder="Enter end date"
                        value={state.createEvent.eventEndDate}
                        onChange={state.handleCreateEventChange}
                        min={new Date().toISOString().split('T')[0]}
                        max={'2050-01-01'}
                        className="date-rtl"
                        required
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Event duration, hrs</FormLabel>
                    <Input type="number" name="duration" placeholder="Enter duration" value={state.createEvent.duration} onChange={state.handleCreateEventChange} required />
                </FormControl>
            </SimpleGrid>
            <Flex marginTop="38px" justifyContent="flex-end">
                <Button fontSize="14px" colorScheme="primary" type="submit">
                    Submit
                </Button>
            </Flex>
        </form>
    );
}
