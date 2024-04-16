import { Box, Text, Flex, Button, Stack, Divider } from '@chakra-ui/react';
import { FaRegCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const EventBookingCard: React.FC<{
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
            <Text fontSize="lg" fontWeight="bold" mb={2}>
                {title}
            </Text>
            <Text fontSize="sm" fontWeight="bold" mb={2}>
                {description}
            </Text>
            <Flex align="center" justify="space-between" mb={2}>
                <Text fontSize="sm">
                    Cost: <span style={{ fontWeight: 'bold' }}>{cost}</span>
                </Text>
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
                <Box bg={status === 1 ? '#0eb546' : '#ff5454'} display={'flex'} borderRadius={'md'} p={2} alignItems={'center'} justifyContent={'center'}>
                    <Text color={'white'} fontSize={'sm'}>
                        {status == 1 ? 'Booked' : 'Canceled'}
                    </Text>
                </Box>
                {status === 1 && oncancel && (
                    <Button fontSize={'sm'} bg={'primary.500'} color={'white'} onClick={() => onCancel(eventID)} type="button">
                        cancel event
                    </Button>
                )}
            </Stack>
        </Box>
    );
};

export default EventBookingCard;
