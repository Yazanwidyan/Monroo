import { useContext, useEffect, useState } from "react";
import EventTimelineCard from "../../../organisms/event-timeline-card/EventTimelineCard";
import { useSnackBar } from "../../../../contexts/SnackbarContext";
import providerServices from "../../../../services/providerServices";
import { UserContext } from "../../../../contexts/UserContext";
import { Grid, GridItem } from "@chakra-ui/react";

const Timeline = () => {
  const { openSnackBar } = useSnackBar();
  const { user } = useContext(UserContext);

  const [eventsList, setEventsList] = useState<any>([]);

  const handlePoke = () => {
    // Logic for poking the author
  };

  const handleMessage = async (event) => {
    const payload = {
      eventID: event.id,
      msg: "hello",
      userID: event.userID,
      providerID: user.id,
      senderID: user.id,
      type: 2,
    };
    try {
      const res = await providerServices.sendMessage(payload);
      console.log("res from message", res);
    } catch (error) {
      openSnackBar(error, "error");
    }
  };

  const handleSave = () => {
    // Logic for saving the event
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
      setEventsList(res);
    } catch (error) {
      openSnackBar(error, "error");
    }
  };

  return (
    <div>
      <Grid templateColumns="repeat(auto-fill, minmax(500px, 1fr))" gap={4}>
        {eventsList.map((event, index) => (
          <GridItem key={index}>
            <EventTimelineCard
              image={event.image}
              title={event.title}
              name={"event"}
              duration={event.duration}
              posted={event.eventDate}
              description={event.desc}
              onPoke={handlePoke}
              onMessage={() => handleMessage(event)}
              onSave={handleSave}
            />
          </GridItem>
        ))}
      </Grid>
    </div>
  );
};

export default Timeline;
