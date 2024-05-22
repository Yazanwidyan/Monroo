import { Box, Text, Button, Avatar, Flex, Divider, Image } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import UserEventListModal from '../user-event-list-modal/UserEventListModal';
import userServices from '../../../services/userServices';
import { UserContext } from '../../../contexts/UserContext';
import useCustomToast from '../../../hooks/useCustomToast';
import { useNavigate } from 'react-router-dom';

const ServiceProviderCard = ({ experience, nationality, gender, bio, image, name, providerID }: any) => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useContext(UserContext);
    const { showToast } = useCustomToast();

    const [userEvents, setUserEvents] = useState<any>([]);

    const handleRequestPrivateEvent = () => {
        if (user && user?.isMainUser) {
            openModal();
        } else {
            navigate('/register');
        }
    };

    const handleShowProfile = () => {
        navigate(`/service-provider-profile-view/${providerID}`);
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
        <Box borderColor="#CBD5E0" borderWidth="2px" borderRadius={'md'} maxW="md" overflow="hidden">
            <Box height={'260'}>
                <Image src={image || '/assets/images/userprofile.jpg'} alt={name} style={{ cursor: 'pointer' }} boxSize={'100%'} onClick={handleShowProfile} />
            </Box>
            <Box p={3}>
                <Text fontSize="md">{name}</Text>
                <Text minH="3rem" fontSize="xs" color="gray.600">
                    {bio?.length > 66 ? bio?.substring(0, 60) + '...' : bio}
                </Text>
                <Divider />

                <Box fontSize="sm" color="gray.500">
                    <Flex align="center" gap={2}>
                        <Text fontSize={'xs'} fontWeight="bold">
                            experience:
                        </Text>
                        <Text> {experience ? experience : 'N/A'}</Text>
                    </Flex>
                    <Flex align="center" gap={2}>
                        <Text fontSize={'xs'} fontWeight="bold">
                            Nationality:
                        </Text>
                        <Text> {nationality ? nationality : 'N/A'}</Text>
                    </Flex>
                    <Flex align="center" gap={2}>
                        <Text fontSize={'xs'} fontWeight="bold">
                            Gender:
                        </Text>
                        <Text> {gender == 1 ? 'Male' : gender == 2 ? 'Female' : 'N/A'}</Text>
                    </Flex>
                </Box>
                <Divider my={3} />

                <Box>
                    <Button width={'100%'} variant={'outline'} textTransform={'uppercase'} fontSize="x-small" colorScheme="primary" mb="0" onClick={handleRequestPrivateEvent}>
                        Request Private Event
                    </Button>
                    <UserEventListModal providerID={providerID} isOpen={isModalOpen} onClose={closeModal} events={userEvents} />
                </Box>
            </Box>
        </Box>
    );
};

export default ServiceProviderCard;
