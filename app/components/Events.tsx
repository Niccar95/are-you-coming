import { EventType } from "../lib/types";
import Event from "./Event";

interface EventListProps {
  allEvents: EventType[];
}

const Events = ({ allEvents }: EventListProps) => {
  if (allEvents.length === 0) {
    return <p className="text-sm text-zinc-500">No events to show.</p>;
  }

  return (
    <>
      <h2 className="text-lg font-semibold text-zinc-800 dark:text-white">My Events</h2>
      <div className="w-full flex gap-4 overflow-x-auto scrollbar-hide py-2">
        {allEvents.map((event) => (
          <Event
            key={event.id}
            id={event.id}
            name={event.name}
            eventDate={event.eventDate}
            description={event.description}
          />
        ))}
      </div>
    </>
  );
};

export default Events;
