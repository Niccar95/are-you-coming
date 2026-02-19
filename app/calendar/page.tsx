// import { auth } from "@/auth";
import Calendar from "../components/Calendar";
import { getEvents } from "../services/eventService";

const CalendarPage = async () => {
  //   const session = await auth();
  const events = await getEvents();

  const allEvents = events.map((event) => ({
    id: event.id,
    name: event.name,
    eventDate: event.eventDate.toISOString(),
    description: event.description,
    imageUrl: event.imageUrl,
  }));

  return <Calendar allEvents={allEvents} />;
};

export default CalendarPage;
