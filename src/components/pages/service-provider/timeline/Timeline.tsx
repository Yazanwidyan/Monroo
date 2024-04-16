import { useContext, useEffect, useState } from 'react';
import EventTimelineCard from '../../../organisms/event-timeline-card/EventTimelineCard';
import providerServices from '../../../../services/providerServices';
import { UserContext } from '../../../../contexts/UserContext';
import { Box, Container, Grid, GridItem, Text } from '@chakra-ui/react';
import useCustomToast from '../../../../hooks/useCustomToast';

const Timeline = () => {
    const { user } = useContext(UserContext);
    const { showToast } = useCustomToast();

    const [eventsList, setEventsList] = useState<any>([]);

    const handleMessage = async (event) => {
        const payload = {
            eventID: event.id,
            userID: event.userID,
        };
        try {
            const res = await providerServices.requestConnection(payload);
            console.log('res from contact', res.data);
            showToast('Request send successfuly', { status: 'success' });
        } catch (error) {
            showToast(error, { status: 'error' });
        }
    };

    useEffect(() => {
        fetchData();
        return () => {};
    }, []);

    const fetchData = async () => {
        const payload = {
            userID: user.id,
        };
        try {
            const res = await providerServices.getProviderEvents(payload);
            setEventsList(res.data);
        } catch (error) {
            showToast(error, { status: 'error' });
        }
    };

    return (
        <>
            <Box mb={4} p={4}>
                <Container maxW="5xl">
                    <Text color={'gray.600'} textTransform={'capitalize'}>
                        Hi, {user.fname}
                    </Text>
                </Container>
            </Box>
            <Container mb={12} maxW={'5xl'}>
                <Grid templateColumns="repeat(auto-fill, minmax(400px, 1fr))" gap={4}>
                    {eventsList?.map((event, index) => (
                        <GridItem key={index}>
                            <EventTimelineCard
                                image={event.image}
                                title={event.title}
                                userName={event.userName}
                                duration={event.duration}
                                posted={event.createdDate}
                                description={event.desc}
                                country={event.country}
                                eventDate={event.eventDate}
                                averageCost={event.averageCost}
                                onMessage={() => handleMessage(event)}
                            />
                        </GridItem>
                    ))}
                </Grid>
            </Container>
        </>
    );
};

export default Timeline;
