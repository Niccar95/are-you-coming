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
    <section className="w-full">
      <h2 className="text-subtitle mb-4">My Events</h2>
      <ul className="flex gap-4 overflow-x-auto scrollbar-hide list-none p-2">
        {allEvents.map((event) => (
          <li key={event.id} className="w-[300px] shrink-0">
            <EventCard
              id={event.id}
              name={event.name}
              eventDate={event.eventDate}
              description={event.description}
              imageUrl={event.imageUrl}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Events;
