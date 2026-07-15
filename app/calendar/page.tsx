import Calendar from "../components/Calendar";
import { getEvents } from "../services/eventService";
import { toPlainObjects } from "../utils/toPlainObject";

const CalendarPage = async () => {
  const events = await getEvents();

  const allEvents = toPlainObjects(events);

  return <Calendar allEvents={allEvents} />;
};

export default CalendarPage;
