import { getEvents } from "../services/eventService";
import EventCard from "../components/EventCard";
import SortControls from "../components/SortControls";
import { Suspense } from "react";
import { sortByDate } from "../utils/eventSorting";
import { filterUpcomingEvents, filterPastEvents } from "../utils/eventFiltering";

const EventsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ sortUpcomingEvent?: string; sortPastEvent?: string }>;
}) => {
  const { sortUpcomingEvent = "asc", sortPastEvent = "desc" } =
    await searchParams;
  const events = await getEvents();

  const allEvents = events.map((event) => ({
    id: event.id,
    name: event.name,
    eventDate: event.eventDate.toISOString(),
    description: event.description,
    imageUrl: event.imageUrl,
  }));

  const upcomingEvents = filterUpcomingEvents(allEvents);
  const pastEvents = filterPastEvents(allEvents);

  sortByDate(upcomingEvents, sortUpcomingEvent);
  sortByDate(pastEvents, sortPastEvent);

  return (
    <div className="flex flex-col gap-12 max-w-4xl mx-auto">
      <Suspense>
        <SortControls />
      </Suspense>
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
