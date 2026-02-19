import SendRemindersButton from "../components/SendRemindersButton";
import { auth } from "@/auth";
import EventForm from "../components/EventForm";
import Events from "../components/Events";
import { getEvents } from "../services/eventService";

export const revalidate = 0;

const DashboardPage = async () => {
  const session = await auth();
  const events = await getEvents();

  const allEvents = events.map((event) => ({
    id: event.id,
    name: event.name,
    eventDate: event.eventDate.toISOString(),
    description: event.description,
    imageUrl: event.imageUrl,
  }));

  return (
    <div
      className={`max-w-2xl mx-auto flex flex-col gap-8 ${!session ? "pt-28" : ""}`}
    >
      <p className="text-sm text-gray-600 self-center">
        Welcome, {session?.user?.name}
      </p>

      <SendRemindersButton />
      <EventForm />
      <Events allEvents={allEvents} />
    </div>
  );
};

export default DashboardPage;
