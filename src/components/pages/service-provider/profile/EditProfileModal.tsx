import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import EditServiceProvider from '../../auth/edit-service-provider/EditServiceProvider';

const EditProfileModal = ({ isOpen, onClose, providerProfile }) => {
    return (
        <Modal size={'full'} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Profile</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <EditServiceProvider onClose={onClose} providerProfile={providerProfile} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default EditProfileModal;
