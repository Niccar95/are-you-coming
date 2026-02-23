import { getEvents } from "../services/eventService";
import EventCard from "../components/EventCard";
import { Event } from "../lib/models/Event";

export const revalidate = 0;

const EventsPage = async () => {
  const events = await getEvents();

  const allEvents = events.map((event) => ({
    id: event.id,
    name: event.name,
    eventDate: event.eventDate.toISOString(),
    description: event.description,
    imageUrl: event.imageUrl,
  }));

  const upcomingEvents = allEvents.filter(
    (event) => new Date(event.eventDate).getTime() >= new Date().getTime(),
  );

  const pastEvents = allEvents.filter(
    (event) => new Date(event.eventDate).getTime() < new Date().getTime(),
  );

  return (
    <div className="flex flex-col gap-12 max-w-4xl mx-auto">
      <section className="flex flex-col gap-4">
        <h1 className="text-subtitle">Upcoming Events</h1>
        {upcomingEvents.length === 0 ? (
          <p className="text-meta">No upcoming events to show.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 list-none">
            {upcomingEvents.map((event) => (
              <li key={event.id}>
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
        )}
      </section>

      <section className="flex flex-col gap-4">
        <h1 className="text-subtitle">Past Events</h1>
        {pastEvents.length === 0 ? (
          <p className="text-meta">No past events to show.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 list-none">
            {pastEvents.map((event) => (
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
        )}
      </section>
    </div>
  );
};

export default EventsPage;
