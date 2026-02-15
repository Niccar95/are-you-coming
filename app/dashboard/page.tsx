import SendRemindersButton from "../components/SendRemindersButton";
import { auth } from "@/auth";
import EventForm from "../components/EventForm";
import Events from "../components/Events";
import { getEvents } from "../services/eventService";

export const revalidate = 0;

const DashboardPage = async () => {
  const session = await auth();
  const allEvents = await getEvents();

  return (
    <div className="flex flex-col items-center justify-start gap-8">
      <p className="text-sm text-gray-600">Welcome, {session?.user?.name}</p>

      <SendRemindersButton />
      <EventForm />
      <Events allEvents={allEvents} />
    </div>
  );
};

export default DashboardPage;
