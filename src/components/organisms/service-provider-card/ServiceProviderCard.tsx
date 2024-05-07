import { Box, Text, Button, Avatar, Flex, Divider } from '@chakra-ui/react';
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
        openModal();
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
        <Box borderColor="#CBD5E0" p={3} borderWidth="2px" borderRadius={'md'} maxW="md" overflow="hidden">
            <Flex gap={4} alignItems={'center'}>
                <Avatar cursor={'pointer'} onClick={handleShowProfile} name={name} src={image || '/assets/images/userprofile.jpg'} />
                <Text fontSize="md" mb={2}>
                    {name}
                </Text>
            </Flex>
            <Text minH="3rem" fontSize="xs" color="gray.600" mt={4} mb={2}>
                {bio?.length > 60 ? bio?.substring(0, 110) + '...' : bio}
            </Text>
            <Divider my={2} />

            <Flex align="center" justify="space-between" fontSize="sm" color="gray.500">
                <Flex direction="column" align="center">
                    <Text fontSize={'xs'} fontWeight="bold">
                        experience
                    </Text>
                    <Text> {experience ? experience : 'N/A'}</Text>
                </Flex>
                <Flex direction="column" align="center">
                    <Text fontSize={'xs'} fontWeight="bold">
                        Nationality
                    </Text>
                    <Text> {nationality ? nationality : 'N/A'}</Text>
                </Flex>
                <Flex direction="column" align="center">
                    <Text fontSize={'xs'} fontWeight="bold">
                        Gender
                    </Text>
                    <Text> {gender == 1 ? 'Male' : gender == 2 ? 'Female' : 'N/A'}</Text>
                </Flex>
            </Flex>
            <Divider my={3} />

            <Box>
                <Button width={'100%'} variant={'outline'} textTransform={'uppercase'} fontSize="x-small" colorScheme="primary" mb="0" onClick={handleRequestPrivateEvent}>
                    Request Private Event
                </Button>
                <UserEventListModal providerID={providerID} isOpen={isModalOpen} onClose={closeModal} events={userEvents} />
            </Box>
        </Box>
    );
};

export default ServiceProviderCard;
