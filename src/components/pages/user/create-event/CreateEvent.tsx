import { CreateEvent } from '../../../../models/CreateEvent';

import CreateEventForm from '../../../organisms/create-event-form/CreateEventForm';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import userServices from '../../../../services/userServices';
import useCustomToast from '../../../../hooks/useCustomToast';

export default function CreateEventPage({ isOpen, onClose }) {
    const { showToast } = useCustomToast();

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent minW={1000}>
                <ModalHeader>Create an event </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <CreateEventForm
                        onSubmit={async (createEvent: CreateEvent) => {
                            console.log('createEvent', createEvent);

                            const { selectedCategory, selectedSubCategories, eventDate, eventEndDate, ...rest } = createEvent;
                            const today = new Date();

                            const eventDateTimestamp = Math.floor(new Date(eventDate).getTime() / 1000);
                            const eventEndDateTimestamp = Math.floor(new Date(eventEndDate).getTime() / 1000);
                            const todayTimestamp = Math.floor(new Date(today).getTime() / 1000);

                            const payload = {
                                ...rest,
                                createdDate: todayTimestamp,
                                eventDate: eventDateTimestamp,
                                eventEndDate: eventEndDateTimestamp,
                                catID: createEvent.selectedCategory.value,
                                subCatID: createEvent.selectedSubCategories.value,
                            };

                            try {
                                const res = await userServices.createEvent(payload);
                                console.log(res);

                                showToast('Event created successfully', {
                                    title: '',
                                    status: 'success',
                                });
                                onClose();
                            } catch (error) {
                                showToast(error, { status: 'error' });
                            }
                        }}
                    />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
