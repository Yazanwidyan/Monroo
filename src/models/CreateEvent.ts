import { MultiSelectOption } from '../components/organisms/create-event-form/useCreateEventForm';

export type CreateEvent = {
    selectedCategory: MultiSelectOption;
    selectedSubCategories: MultiSelectOption;
    title: string;
    desc: string;
    averageCost: string;
    duration: string;
    eventDate: string;
    eventEndDate: string;
    location: string;
};
