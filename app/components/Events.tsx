import { EventType } from "../lib/types";

interface EventListProps {
  allEvents: EventType[];
}

const Events = ({ allEvents }: EventListProps) => {
  return (
    <>
      {allEvents.map((event) => (
        <article
          key={event.id}
          className="w-full max-w-2xl p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-lg"
        >
          <h3 className="text-lg font-semibold text-zinc-800 dark:text-white">
            {event.name}
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            {new Date(event.eventDate).toLocaleString()}
          </p>
          {event.description && (
            <p className="text-sm text-zinc-700 dark:text-zinc-300 mt-3">
              {event.description}
            </p>
          )}
        </article>
      ))}
    </>
  );
};

export default Events;
