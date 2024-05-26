import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import EditUser from '../../auth/edit-user/EditUser';

const EditProfileModal = ({ isOpen, onClose }) => {
    return (
        <Modal size={'full'} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Profile</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <EditUser onClose={onClose} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default EditProfileModal;
