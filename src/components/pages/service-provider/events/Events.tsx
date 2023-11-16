import React, { useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from "@chakra-ui/react";
import EventBookingCard from "../../../organisms/event-booking-card/EventBookingCard";

const Events = () => {
  const [comingEvents, setComingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("coming"); // Default selected tab

  const handleCancel = () => {
    console.log("cancel event");
  };

  const fetchEvents = (status) => {
    setIsLoading(true);
    // Simulating API call delay with setTimeout
    setTimeout(() => {
      setIsLoading(false);
      if (status === "coming") {
        setComingEvents([
          {
            id: 1,
            title: "Workshop: Introduction to Web Development",
            description:
              "Join us for an interactive workshop covering the basics of web development.",
            cost: "$10",
            date: "November 25, 2023",
            location: "Tech Hub, San Francisco",
            duration: "3 hours",
            status: "confirmed",
          },
          {
            id: 2,
            title: "Networking Event: Tech Meetup",
            description:
              "Connect with industry professionals and expand your network in the tech field.",
            cost: "Free",
            date: "December 5, 2023",
            location: "Startup Center, New York",
            duration: "2 hours",
            status: "pending",
          },
        ]);
      } else {
        setPastEvents([
          {
            id: 3,
            title: "Conference: AI and Future Technologies",
            description:
              "A conference discussing the advancements and future of AI technologies.",
            cost: "$50",
            date: "October 20, 2023",
            location: "Convention Center, Los Angeles",
            duration: "Full day",
            status: "completed",
          },
          {
            id: 4,
            title: "Workshop: UX Design Essentials",
            description:
              "A workshop focusing on essential principles and practices of UX design.",
            cost: "$15",
            date: "November 10, 2023",
            location: "Design Studio, Chicago",
            duration: "4 hours",
            status: "completed",
          },
        ]);
      }
    }, 1000); // Simulating API delay
    setSelectedTab(status);
  };

  return (
    <Box p={4}>
      <Tabs variant="soft-rounded" colorScheme="teal">
        <TabList>
          <Tab onClick={() => fetchEvents("coming")}>Coming Events</Tab>
          <Tab onClick={() => fetchEvents("past")}>Past Events</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {selectedTab === "coming" && (
              <>
                {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  comingEvents.map((event) => (
                    <EventBookingCard
                      key={event.id}
                      title={event.title}
                      description={event.description}
                      cost={event.cost}
                      date={event.date}
                      location={event.location}
                      duration={event.duration}
                      status={event.status}
                      onCancel={handleCancel} // handleCancel function to cancel the event
                    />
                  ))
                )}
              </>
            )}
          </TabPanel>
          <TabPanel>
            {selectedTab === "past" && (
              <>
                {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  pastEvents.map((event) => (
                    <EventBookingCard
                      key={event.id}
                      title={event.title}
                      description={event.description}
                      cost={event.cost}
                      date={event.date}
                      location={event.location}
                      duration={event.duration}
                      status={event.status}
                    />
                  ))
                )}
              </>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Events;
