import { auth } from "@/auth";
import EventForm from "../components/EventForm";
import Events from "../components/Events";
import { getEvents } from "../services/eventService";
import { toPlainObjects } from "../utils/toPlainObject";

export const revalidate = 0;

const DashboardPage = async () => {
  const session = await auth();
  const events = await getEvents();

  const allEvents = toPlainObjects(events);

  return (
    <div
      className={`max-w-3xl mx-auto flex flex-col gap-8 ${!session ? "pt-28" : ""}`}
    >
      <p className="text-sm text-gray-600 self-center">
        Welcome, {session?.user?.name}
      </p>
      <EventForm />
      <Events allEvents={allEvents} />
    </div>
  );
};

export default DashboardPage;
