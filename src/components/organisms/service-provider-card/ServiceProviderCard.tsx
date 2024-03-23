import { Box, Image, Text, Button } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import UserEventListModal from '../user-event-list-modal/UserEventListModal';
import userServices from '../../../services/userServices';
import { UserContext } from '../../../contexts/UserContext';
import useCustomToast from '../../../hooks/useCustomToast';
import { useNavigate } from 'react-router-dom';

const ServiceProviderCard = ({ image, name, providerID, userProfile }) => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useContext(UserContext);
    const { showToast } = useCustomToast();

    const [isHovered, setIsHovered] = useState(false);

    const [userEvents, setUserEvents] = useState<any>([]);

    const handleRequestPrivateEvent = () => {
        openModal();
    };
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleShowProfile = () => {
        navigate('/service-provider-profile-view', { state: userProfile });
    };

    const openModal = async () => {
        setIsModalOpen(true);
        const payload = {
            userID: user.id,
        };
        try {
            const res = await userServices.getUserEvents(payload);
            setUserEvents(res.data);
        } catch (error) {
            showToast(error, { status: 'error' });
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <Box borderRadius={'md'} maxW="md" overflow="hidden">
            <Box onClick={handleShowProfile} position="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} cursor={'pointer'}>
                <Image
                    h={350}
                    position="relative"
                    src={image ? image : 'https://www.zica.co.zm/wp-content/uploads/2021/02/dummy-profile-image.png'}
                    alt={name}
                    height={320}
                    width="100%"
                    objectFit="cover"
                />
                {isHovered && (
                    <Box
                        position="absolute"
                        top="0"
                        left="0"
                        w="100%"
                        h="100%"
                        bg="rgba(0, 0, 0, 0.5)" // Adjust opacity here (0.5 for 50% opacity)
                        zIndex="1"
                        opacity="0"
                        transition="opacity 0.3s ease" // Transition for opacity change
                        _hover={{ opacity: 1 }}
                    >
                        <Button
                            variant={'ghost'}
                            colorScheme="white"
                            color={'white'}
                            position="absolute"
                            top="50%"
                            left="50%"
                            transform="translate(-50%, -50%)"
                            transition="opacity 0.3s ease" // Transition for opacity change
                        >
                            Show Profile
                        </Button>
                    </Box>
                )}
            </Box>

            <Box>
                <Text textTransform={'capitalize'} fontSize={'lg'} fontWeight="600" letterSpacing={2} my="2">
                    {name}
                </Text>

                <Button variant={'outline'} textTransform={'uppercase'} fontSize="x-small" colorScheme="primary.500" mb="2" onClick={handleRequestPrivateEvent}>
                    Request Private Event
                </Button>
                <UserEventListModal providerID={providerID} isOpen={isModalOpen} onClose={closeModal} events={userEvents} />
            </Box>
        </Box>
    );
};

export default ServiceProviderCard;
