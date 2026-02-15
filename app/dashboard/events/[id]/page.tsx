import AttendeeForm from "@/app/components/AttendeeForm";
import CountDown from "@/app/components/CountDown";
import { getAttendeesByEventId } from "@/app/services/attendeeService";
import { getEventById } from "@/app/services/eventService";

const EventPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const event = await getEventById(Number(id));

  const eventAttendees = await getAttendeesByEventId(Number(id));

  if (!event) {
    return <p>Event not found.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-8">
      <div>
        <h1 className="text-title">{event.name}</h1>
        <div className="flex items-center gap-2 mt-3">
          <time
            dateTime={new Date(event.eventDate).toISOString()}
            className="bg-violet-100 text-violet-700 text-xs font-medium px-3 py-1 rounded-full"
          >
            {new Date(event.eventDate).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
        <CountDown eventDate={event.eventDate} />
        <h2 className="mt-10 mb-4 text-subtle">Attendee list: </h2>
        <div className="flex gap-1 md:w-1/2 overflow-x-auto scrollbar-hide">
          {eventAttendees.map((attendee) => (
            <p
              className="inline-block text-nowrap bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full"
              key={attendee.id}
            >
              {attendee.name}
            </p>
          ))}
        </div>

        <h2 className="mt-10 mb-4">Event description</h2>
        {event.description && (
          <p className="text-body leading-relaxed">{event.description}</p>
        )}

        <hr className="border-zinc-200 mt-6" />
      </div>
      <AttendeeForm eventId={event.id} />
    </div>
  );
};

export default EventPage;
