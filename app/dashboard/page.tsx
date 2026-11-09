import { auth } from "@/auth";
import EventForm from "../components/EventForm";
import Events from "../components/Events";
import { getEvents } from "../services/eventService";
import { toPlainObjects } from "../utils/toPlainObject";
import { CalendarPlus } from "lucide-react";
import {
  filterPastEvents,
  filterUpcomingEvents,
} from "../utils/eventFiltering";
import { getResponseLogs } from "../services/attendeeService";
import EventsOverviewCard from "../components/EventsOverviewCard";
import RecentActivityCard from "../components/RecentActivityCard";
import EventLinksCard from "../components/EventLinksCard";

export const revalidate = 0;

const DashboardPage = async () => {
  const session = await auth();
  const events = await getEvents();

  const allEvents = toPlainObjects(events);
  const responseLogs = await getResponseLogs();
  const upcomingEvents = filterUpcomingEvents(allEvents);

  const totalCount = allEvents.length;
  const upcomingCount = upcomingEvents.length;
  const pastCount = filterPastEvents(allEvents).length;

  return (
    <div
      className={`max-w-3xl mx-auto flex flex-col gap-8 ${!session ? "pt-28" : ""}`}
    >
      <p className="text-sm text-gray-600 self-center">
        Welcome, {session?.user?.name}
      </p>

      {totalCount === 0 && (
        <section className="flex flex-col items-center gap-3 text-center">
          <CalendarPlus size={40} className="text-violet-300" />
          <h2 className="text-subtitle">No events yet</h2>
          <p className="text-body">
            Create your first event with the "New Event" button below, then
            share the link with your guests.
          </p>
        </section>
      )}
      <EventForm />
      {totalCount > 0 && <Events allEvents={allEvents} />}

      <EventsOverviewCard
        totalCount={totalCount}
        upcomingCount={upcomingCount}
        pastCount={pastCount}
      />

      <div className="flex flex-col gap-6 md:flex-row md:gap-4">
        <RecentActivityCard responseLogs={responseLogs} />

        <EventLinksCard
          upcomingEvents={upcomingEvents}
          upcomingCount={upcomingCount}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
