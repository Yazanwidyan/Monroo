import { useState } from 'react';
import { Box, Text, Grid, Image, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const PhotosGallery = ({ photos }) => {
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const displayPhotos = photos.slice(0, 4); // Limit to 4 photos

    const openModal = (index) => {
        setSelectedPhotoIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedPhotoIndex(null);
        setIsModalOpen(false);
    };

    const showPrevPhoto = () => {
        setSelectedPhotoIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : photos.length - 1));
    };

    const showNextPhoto = () => {
        setSelectedPhotoIndex((prevIndex) => (prevIndex < photos.length - 1 ? prevIndex + 1 : 0));
    };

    return (
        <Box mt={6}>
            <Text fontWeight="bold" fontSize="xl" mb={4}>
                Photos
            </Text>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                {displayPhotos.map((photo, index) => (
                    <Box key={index} onClick={() => openModal(index)}>
                        <Image src={photo} alt={`Photo ${index + 1}`} boxSize="100%" objectFit="cover" cursor="pointer" transition="transform 0.3s ease-in-out" _hover={{ transform: 'scale(1.05)' }} />
                    </Box>
                ))}
            </Grid>

            {/* Modal for displaying enlarged photo */}
            <Modal isOpen={isModalOpen} onClose={closeModal} size="full">
                <ModalOverlay />
                <ModalContent bg="transparent" boxShadow="none">
                    <ModalCloseButton color="white" />
                    <ModalBody p={0} bg="black" display="flex" justifyContent="center" alignItems="center" position="relative">
                        {selectedPhotoIndex !== null && (
                            <>
                                <IconButton
                                    aria-label="Previous photo"
                                    icon={<ChevronLeftIcon />}
                                    position="absolute"
                                    left={4}
                                    top="50%"
                                    transform="translateY(-50%)"
                                    onClick={showPrevPhoto}
                                    colorScheme="whiteAlpha"
                                    bg="transparent"
                                    _hover={{ bg: 'whiteAlpha.300' }}
                                />
                                <Image src={photos[selectedPhotoIndex]} alt={`Photo ${selectedPhotoIndex + 1}`} width="100%" maxHeight="80vh" objectFit="contain" mx="auto" my="auto" />
                                <IconButton
                                    aria-label="Next photo"
                                    icon={<ChevronRightIcon />}
                                    position="absolute"
                                    right={4}
                                    top="50%"
                                    transform="translateY(-50%)"
                                    onClick={showNextPhoto}
                                    colorScheme="whiteAlpha"
                                    bg="transparent"
                                    _hover={{ bg: 'whiteAlpha.300' }}
                                />
                            </>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default PhotosGallery;
