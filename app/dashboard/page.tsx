import { auth } from "@/auth";
import EventForm from "../components/EventForm";
import Events from "../components/Events";
import { getEvents } from "../services/eventService";
import { toPlainObjects } from "../utils/toPlainObject";
import { CalendarDays, CalendarPlus } from "lucide-react";
import {
  filterPastEvents,
  filterUpcomingEvents,
} from "../utils/eventFiltering";
import { getResponseLogs } from "../services/attendeeService";
import ShareButton from "../components/ShareButton";
import Image from "next/image";

export const revalidate = 0;

const DashboardPage = async () => {
  const session = await auth();
  const events = await getEvents();

  const allEvents = toPlainObjects(events);
  const responseLogs = await getResponseLogs();

  const upcomingCount = filterUpcomingEvents(allEvents).length;
  const upcomingEvents = filterUpcomingEvents(allEvents);
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

      <section className="card">
        <h2 className="text-title mb-4">Events Overview</h2>
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg bg-zinc-50 border border-zinc-100 p-4 text-center">
            <p className="text-3xl font-bold text-zinc-700">
              {allEvents.length}
            </p>
            <p className="text-subtle mt-1">Total</p>
          </div>
          <div className="rounded-lg bg-violet-50 border border-violet-100 p-4 text-center">
            <p className="text-3xl font-bold text-violet-600">
              {upcomingCount}
            </p>
            <p className="text-subtle mt-1">Upcoming</p>
          </div>
          <div className="rounded-lg bg-zinc-50 border border-zinc-100 p-4 text-center">
            <p className="text-3xl font-bold text-zinc-700">{pastCount}</p>
            <p className="text-subtle mt-1">Past</p>
          </div>
        </div>
      </section>

      <section className="card">
        <h2 className="text-title mb-4">Recent Activity</h2>

        {responseLogs.length === 0 ? (
          <p className="text-meta">No activity yet.</p>
        ) : (
          <ul className="relative ml-2 border-l-2 border-violet-100">
            {responseLogs.map((log) => (
              <li key={log.id} className="relative pl-6 pb-6 last:pb-0">
                <span className="absolute -left-1.75 top-1.5 h-3 w-3 rounded-full bg-violet-500 ring-4 ring-white" />

                <div className="flex flex-col gap-1">
                  <p className="text-body">
                    <span className="font-semibold">{log.attendeeName}</span>{" "}
                    {log.responseStatus === "coming"
                      ? "accepted the invitation"
                      : log.responseStatus === "unsure"
                        ? "is unsure about attending"
                        : "declined the invitation"}
                  </p>

                  <p className="text-meta">{log.eventName}</p>

                  <time className="text-subtle">
                    {new Date(log.createdAt).toLocaleString()}
                  </time>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="card">
        <h2 className="text-title mb-4">Active Event Links</h2>

        {upcomingCount === 0 ? (
          <p className="text-meta">No active events yet.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 border border-zinc-100"
              >
                <div className="flex items-center gap-3">
                  {event.imageUrl ? (
                    <Image
                      src={event.imageUrl}
                      alt={event.name}
                      width={96}
                      height={96}
                      className="w-15 h-15 rounded-lg object-cover shrink-0"
                    />
                  ) : (
                    <div className="flex items-center justify-center bg-violet-50 rounded-lg w-15 h-15 shrink-0">
                      <CalendarDays size={27} className="text-violet-300" />
                    </div>
                  )}
                  <p className="font-semibold text-sm text-zinc-900 truncate max-w-20 md:max-w-30">
                    {event.name}
                  </p>
                </div>
                <ShareButton
                  url={`${process.env.NEXT_PUBLIC_SITE_URL}/events/${event.id}`}
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default DashboardPage;
