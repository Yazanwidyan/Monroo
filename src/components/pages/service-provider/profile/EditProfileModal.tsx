import { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, Textarea, Select } from '@chakra-ui/react';

const EditProfileModal = ({ isOpen, onClose, providerProfile, onSave }) => {
    const [editedProfile, setEditedProfile] = useState(providerProfile);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProfile({ ...editedProfile, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editedProfile);
    };

    return (
        <Modal size={'full'} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Profile</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form onSubmit={handleSubmit}>
                        <FormControl mb={4}>
                            <FormLabel htmlFor="fname">First Name</FormLabel>
                            <Input type="text" id="fname" name="fname" value={editedProfile.fname} onChange={handleInputChange} />
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel htmlFor="lname">Last Name</FormLabel>
                            <Input type="text" id="lname" name="lname" value={editedProfile.lname} onChange={handleInputChange} />
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Input type="email" id="email" name="email" value={editedProfile.email} onChange={handleInputChange} />
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel htmlFor="bio">Bio</FormLabel>
                            <Textarea id="bio" name="bio" value={editedProfile.bio} onChange={handleInputChange} />
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel htmlFor="phone">Phone</FormLabel>
                            <Input type="tel" id="phone" name="phone" value={editedProfile.phone} onChange={handleInputChange} />
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel htmlFor="nationality">Nationality</FormLabel>
                            <Input type="text" id="nationality" name="nationality" value={editedProfile.nationality} onChange={handleInputChange} />
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel htmlFor="countryOfResidence">Country of Residence</FormLabel>
                            <Input type="text" id="countryOfResidence" name="countryOfResidence" value={editedProfile.countryOfResidence} onChange={handleInputChange} />
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel htmlFor="gender">Gender</FormLabel>
                            <Select id="gender" name="gender" value={editedProfile.gender} onChange={handleInputChange}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </Select>
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel htmlFor="height">Height</FormLabel>
                            <Input type="text" id="height" name="height" value={editedProfile.height} onChange={handleInputChange} />
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel htmlFor="weight">Weight</FormLabel>
                            <Input type="text" id="weight" name="weight" value={editedProfile.weight} onChange={handleInputChange} />
                        </FormControl>
                        {/* Add more fields as needed */}
                        <Button type="submit">Save Changes</Button>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default EditProfileModal;
