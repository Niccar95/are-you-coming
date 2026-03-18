import Calendar from "../components/Calendar";
import { getEvents } from "../services/eventService";

const CalendarPage = async () => {
  const events = await getEvents();

  const allEvents = events.map((event) => ({
    id: event.id,
    name: event.name,
    eventDate: event.eventDate.toISOString(),
    description: event.description,
    spotifyUrl: event.spotifyUrl,
    spotifyInviteUrl: event.spotifyInviteUrl,
    imageUrl: event.imageUrl,
  }));

  return <Calendar allEvents={allEvents} />;
};

export default CalendarPage;
