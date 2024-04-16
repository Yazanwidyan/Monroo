import { useContext, useEffect, useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Container, Image, Text } from '@chakra-ui/react';
import EventBookingCard from '../../../organisms/event-booking-card/EventBookingCard';
import { UserContext } from '../../../../contexts/UserContext';
import providerServices from '../../../../services/providerServices';
import useCustomToast from '../../../../hooks/useCustomToast';
import userServices from '../../../../services/userServices';

const UserBooking = () => {
    const [comingEvents, setComingEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [selectedTab, setSelectedTab] = useState('coming'); // Default selected tab

    const { user } = useContext(UserContext);

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
        console.log(status);
        setSelectedTab(status);

        try {
            const res = await userServices.getBookings();
            console.log('resoooo', res.data);
            setComingEvents(res.data);
        } catch (error) {
            showToast(error, { status: 'error' });
        }
    };

    return (
        <Container maxW={'5xl'}>
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
                                            <EventBookingCard
                                                key={event.id}
                                                eventID={event.id}
                                                title={event.title}
                                                description={event.desc}
                                                cost={event.dealCost}
                                                date={event.eventDate}
                                                location={event.location}
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
                                            <EventBookingCard
                                                key={event.id}
                                                eventID={event.id}
                                                title={event.title}
                                                description={event.desc}
                                                cost={event.dealCost}
                                                date={event.eventDate}
                                                location={event.location}
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
