import EventTimelineCard from "../../../organisms/event-timeline-card/EventTimelineCard";

const Timeline = () => {
  const handlePoke = () => {
    // Logic for poking the author
  };

  const handleMessage = () => {
    // Logic for messaging the author
  };

  const handleSave = () => {
    // Logic for saving the event
  };
  return (
    <div>
      <EventTimelineCard
        image="https://m.media-amazon.com/images/I/71Ou-t-lBoL._AC_UF894,1000_QL80_.jpg"
        title="Event Title"
        name="Author Name"
        description="Event Description Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        onPoke={handlePoke}
        onMessage={handleMessage}
        onSave={handleSave}
      />
    </div>
  );
};

export default Timeline;
