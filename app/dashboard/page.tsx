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

export const revalidate = 0;

const DashboardPage = async () => {
  const session = await auth();
  const events = await getEvents();

  const allEvents = toPlainObjects(events);

  const upcomingCount = filterUpcomingEvents(allEvents).length;
  const pastCount = filterPastEvents(allEvents).length;

  return (
    <div
      className={`max-w-3xl mx-auto flex flex-col gap-8 ${!session ? "pt-28" : ""}`}
    >
      <p className="text-sm text-gray-600 self-center">
        Welcome, {session?.user?.name}
      </p>

      {allEvents.length === 0 && (
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
      {allEvents.length > 0 && <Events allEvents={allEvents} />}

      {allEvents.length > 0 && (
        <section className="card">
          <h2 className="text-title mb-4">Events Overview</h2>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-zinc-50 p-4 text-center">
              <p className="text-3xl font-bold text-zinc-700">
                {allEvents.length}
              </p>
              <p className="text-subtle mt-1">Total</p>
            </div>
            <div className="rounded-lg bg-violet-50 p-4 text-center">
              <p className="text-3xl font-bold text-violet-600">
                {upcomingCount}
              </p>
              <p className="text-subtle mt-1">Upcoming</p>
            </div>
            <div className="rounded-lg bg-zinc-50 p-4 text-center">
              <p className="text-3xl font-bold text-zinc-700">{pastCount}</p>
              <p className="text-subtle mt-1">Past</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default DashboardPage;
