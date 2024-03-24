import { useState } from 'react';
import { Box, Flex, Text, Modal, ModalOverlay, ModalContent, ModalBody, Image } from '@chakra-ui/react';

const AudiosGallery = ({ audioSrc, title }) => {
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
                _hover={{ bg: 'primary.400' }}
                onClick={openModal}
            >
                <Box mr={2} w="30px" h="30px" borderRadius="md" overflow="hidden">
                    <Image src={'/assets/images/music.png'} alt="Audio Thumbnail" />
                </Box>
                <Text fontSize="sm" fontWeight="bold" isTruncated>
                    {title || 'Audio'}
                </Text>
            </Flex>

            <Modal isOpen={isModalOpen} onClose={closeModal} size="lg">
                <ModalOverlay />
                <ModalContent bg="transparent" boxShadow="none">
                    <ModalBody>
                        <audio controls style={{ width: '100%' }}>
                            <source src={audioSrc} />
                            Your browser does not support the audio element.
                        </audio>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AudiosGallery;
