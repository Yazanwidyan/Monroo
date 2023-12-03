import { useState } from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const VideoGallery = ({ videoSrc, title }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Flex
        align="center"
        bg="white"
        color="white.800"
        borderRadius="full"
        px={3}
        py={1}
        maxW="200px"
        cursor="pointer"
        transition="background-color 0.3s"
        _hover={{ bg: "primary.400" }}
        onClick={openModal}
      >
        <Box mr={2} w="30px" h="30px" borderRadius="md" overflow="hidden">
          <Image src={"src/assets/images/play.png"} alt="Video Thumbnail" />
        </Box>
        <Text fontSize="sm" fontWeight="bold" isTruncated>
          {title || "Video"}
        </Text>
      </Flex>

      <Modal isOpen={isModalOpen} onClose={closeModal} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <iframe
              width="100%"
              height="400px"
              src={videoSrc}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default VideoGallery;
