import { useState } from "react";
import {
  Box,
  Text,
  Grid,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const PhotosGallery = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const displayPhotos = photos.slice(0, 4); // Limit to 4 photos

  const openModal = (photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
    setIsModalOpen(false);
  };

  return (
    <Box mt={6}>
      <Text fontWeight="bold" fontSize="xl" mb={4}>
        Photos
      </Text>
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        {displayPhotos.map((photo, index) => (
          <Box key={index} onClick={() => openModal(photo)}>
            <Image
              src={photo}
              alt={`Photo ${index + 1}`}
              boxSize="100%"
              objectFit="cover"
              cursor="pointer"
              transition="transform 0.3s ease-in-out"
              _hover={{ transform: "scale(1.05)" }}
            />
          </Box>
        ))}
      </Grid>

      {/* Modal for displaying enlarged photo */}
      <Modal isOpen={isModalOpen} onClose={closeModal} size="full">
        <ModalOverlay />
        <ModalContent bg="transparent" boxShadow="none">
          <ModalCloseButton color="white" />
          <ModalBody
            p={0}
            bg="black"
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {selectedPhoto && (
              <Image
                src={selectedPhoto}
                alt="Enlarged"
                width="100%"
                maxHeight="80vh"
                objectFit="contain"
                mx="auto"
                my="auto"
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PhotosGallery;
