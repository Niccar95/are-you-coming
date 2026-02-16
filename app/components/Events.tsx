import { EventType } from "../lib/types";
import EventCard from "./EventCard";

interface EventListProps {
  allEvents: EventType[];
}

const Events = ({ allEvents }: EventListProps) => {
  if (allEvents.length === 0) {
    return <p className="text-meta">No events to show.</p>;
  }

  return (
    <>
      <h2 className="text-subtitle">My Events</h2>
      <div className="w-full flex gap-4 overflow-x-auto scrollbar-hide py-2">
        {allEvents.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            name={event.name}
            eventDate={event.eventDate}
            description={event.description}
            imageUrl={event.imageUrl}
          />
        ))}
      </div>
    </>
  );
};

export default Events;
