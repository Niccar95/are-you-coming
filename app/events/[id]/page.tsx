import AttendeeForm from "@/app/components/AttendeeForm";
import { getEventById } from "@/app/services/eventService";

const EventPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const event = await getEventById(Number(id));

  if (!event) {
    return <p>Event not found.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 flex flex-col gap-8">
      <div>
        <h1 className="text-title">{event.name}</h1>
        <div className="flex items-center gap-2 mt-3">
          <span className="bg-violet-100 text-violet-700 text-xs font-medium px-3 py-1 rounded-full">
            {new Date(event.eventDate).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        {event.description && (
          <p className="text-body mt-5 leading-relaxed">
            {event.description}
          </p>
        )}
        <hr className="border-zinc-200 mt-6" />
      </div>
      <AttendeeForm eventId={event.id} />
    </div>
  );
};

export default EventPage;
