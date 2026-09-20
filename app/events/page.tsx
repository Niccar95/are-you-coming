import { getEvents } from "../services/eventService";
import SortControls from "../components/SortControls";
import { Suspense } from "react";
import { sortByDate } from "../utils/eventSorting";
import {
  filterUpcomingEvents,
  filterPastEvents,
} from "../utils/eventFiltering";
import UpcomingEvents from "../components/UpcomingEvents";
import { toPlainObjects } from "../utils/toPlainObject";
import PastEvents from "../components/PastEvents";

const EventsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ sortUpcomingEvent?: string; sortPastEvent?: string }>;
}) => {
  const { sortUpcomingEvent = "asc", sortPastEvent = "desc" } =
    await searchParams;
  const events = await getEvents();

  const allEvents = toPlainObjects(events);

  const upcomingEvents = filterUpcomingEvents(allEvents);
  const pastEvents = filterPastEvents(allEvents);

  sortByDate(upcomingEvents, sortUpcomingEvent);
  sortByDate(pastEvents, sortPastEvent);

  return (
    <div className="flex flex-col gap-12 max-w-3xl mx-auto">
      <section className="flex flex-col gap-6">
        <h1 className="text-title">Upcoming Events</h1>
        <Suspense>
          <SortControls section="upcoming" />
        </Suspense>
        <UpcomingEvents events={upcomingEvents} />
      </section>

      <section className="flex flex-col gap-6">
        <h1 className="text-title">Past Events</h1>
        <Suspense>
          <SortControls section="past" />
        </Suspense>
        <PastEvents events={pastEvents} />
      </section>
    </div>
  );
};

export default EventsPage;
