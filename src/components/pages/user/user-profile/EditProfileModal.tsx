import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import EditUser from '../../auth/edit-user/EditUser';

const EditProfileModal = ({ isOpen, onClose, title }) => {
    return (
        <Modal size={'5xl'} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalBody>
                    <EditUser onClose={onClose} title={title} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default EditProfileModal;
