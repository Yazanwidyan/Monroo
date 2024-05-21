import { useEffect, useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Container, Text } from '@chakra-ui/react';
import UserEventBookingCard from '../../../organisms/user-event-booking-card/UserEventBookingCard';
import useCustomToast from '../../../../hooks/useCustomToast';
import userServices from '../../../../services/userServices';

const UserBooking = () => {
    const [comingEvents, setComingEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [selectedTab, setSelectedTab] = useState('coming'); // Default selected tab

    const { showToast } = useCustomToast();

    const handleCancel = async (eventID) => {
        const payload = {
            eventID,
        };
        try {
            await userServices.cancelEvent(payload);
            showToast('event canceled successfuly', { status: 'success' });
            fetchData('coming');
        } catch (error) {
            showToast(error, { status: 'error' });
        }
    };

    useEffect(() => {
        fetchData('coming');

        return () => {};
    }, []);

    const fetchData = async (status) => {
        setSelectedTab(status);

        try {
            const res = await userServices.getBookings();
            const events = res.data;
            if (status === 'coming') {
                // Filter events based on status
                const comingEventsData = events.filter((event) => event.status === 1);
                setComingEvents(comingEventsData);
            } else if (status === 'past') {
                // Filter events based on status
                const pastEventsData = events.filter((event) => event.status !== 1);
                setPastEvents(pastEventsData);
            }
        } catch (error) {
            showToast(error, { status: 'error' });
        }
    };

    return (
        <Container maxW={'6xl'} px={0}>
            <Box mt={5}>
                <Tabs variant="soft-rounded" colorScheme="primary">
                    <TabList>
                        <Tab onClick={() => fetchData('coming')}>Coming Events</Tab>
                        <Tab onClick={() => fetchData('past')}>Past Events</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel px={0}>
                            {selectedTab === 'coming' && (
                                <>
                                    {comingEvents.length ? (
                                        comingEvents.map((event) => (
                                            <UserEventBookingCard
                                                key={event.id}
                                                eventID={event.id}
                                                title={event.title}
                                                description={event.desc}
                                                cost={event.dealCost}
                                                date={event.eventDate}
                                                location={event.country}
                                                duration={event.duration}
                                                status={event.status}
                                                onCancel={handleCancel} // handleCancel function to cancel the event
                                            />
                                        ))
                                    ) : (
                                        <Box textAlign={'center'} display={'flex'} flexDirection={'column'} alignContent={'center'} justifyContent={'center'}>
                                            {/* <Image src={'/assets/images/calendar.png'} alt="Hire Staff" boxSize="150px" /> */}
                                            <Text>No events found</Text>
                                        </Box>
                                    )}
                                </>
                            )}
                        </TabPanel>
                        <TabPanel>
                            {selectedTab === 'past' && (
                                <>
                                    {pastEvents.length ? (
                                        pastEvents.map((event) => (
                                            <UserEventBookingCard
                                                key={event.id}
                                                eventID={event.id}
                                                title={event.title}
                                                description={event.desc}
                                                cost={event.dealCost}
                                                date={event.eventDate}
                                                location={event.country}
                                                duration={event.duration}
                                                status={event.status}
                                                onCancel={handleCancel} // handleCancel function to cancel the event
                                            />
                                        ))
                                    ) : (
                                        <Box textAlign={'center'} display={'flex'} flexDirection={'column'} alignContent={'center'} justifyContent={'center'}>
                                            {/* <Image src={'/assets/images/calendar.png'} alt="Hire Staff" boxSize="150px" /> */}
                                            <Text>No events found</Text>
                                        </Box>
                                    )}
                                </>
                            )}
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    );
};

export default UserBooking;
