import { Box, Text, Flex, Button, Stack, Divider } from '@chakra-ui/react';
import { FaRegCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const UserEventBookingCard: React.FC<{
    title: string;
    eventID: string;
    description: string;
    cost: string;
    date: string;
    location: string;
    duration: string;
    status: number;
    onCancel?: (param: any) => void;
}> = ({ eventID, title, description, cost, date, location, duration, status, onCancel }) => {
    return (
        <Box borderWidth="1px" mb={4} borderRadius="sm" p={4} boxShadow="base">
            <Flex justifyContent={'space-between'}>
                <Text fontSize="lg" fontWeight="bold" mb={2}>
                    {title}
                </Text>
                <Box bg={status === 0 ? '#2173A5' : status === 1 ? '#0eb546' : '#ff5454'} display={'flex'} borderRadius={'md'} p={2} alignItems={'center'} justifyContent={'center'}>
                    <Text color={'white'} fontSize={'sm'}>
                        {status == 0 ? 'Pending' : status == 1 ? 'Booked' : 'Canceled'}
                    </Text>
                </Box>
            </Flex>
            <Text fontSize="sm" fontWeight="bold" mb={2}>
                {description}
            </Text>
            <Flex align="center" justify="space-between" mb={2}>
                {cost && (
                    <Text fontSize="sm">
                        Cost: <span style={{ fontWeight: 'bold' }}>{cost}</span>
                    </Text>
                )}
                <Text fontSize="sm">
                    Date: <span style={{ fontWeight: 'bold' }}>{date}</span>
                </Text>
            </Flex>
            <Flex align="center" justify="space-between" mb={2}>
                <Flex align="center">
                    <FaMapMarkerAlt />
                    <Text ml={2} fontSize="sm">
                        Location: <span style={{ fontWeight: 'bold' }}>{location}</span>
                    </Text>
                </Flex>
                <Flex align="center">
                    <FaRegCalendarAlt />
                    <Text ml={2} fontSize="sm">
                        Duration: <span style={{ fontWeight: 'bold' }}>{duration}</span>
                    </Text>
                </Flex>
            </Flex>
            <Divider my={3} />
            <Stack direction="row" spacing={4}>
                {status === 1 && (
                    <Button fontSize={'sm'} colorScheme={'primary'} onClick={() => onCancel(eventID)} type="button">
                        Cancel event
                    </Button>
                )}
            </Stack>
        </Box>
    );
};

export default UserEventBookingCard;
