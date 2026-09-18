import { EventType } from "../lib/types";
import EventCard from "./EventCard";

interface PastEventsProps {
  events: EventType[];
}

const PastEvents = ({ events }: PastEventsProps) => {
  return events.length === 0 ? (
    <p className="text-meta">No past events to show.</p>
  ) : (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 list-none">
      {events.map((event) => (
        <li key={event.id} className="grayscale opacity-80">
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
  );
};

export default PastEvents;
