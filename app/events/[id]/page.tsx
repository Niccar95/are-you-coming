import Image from "next/image";
import Link from "next/link";
import { Users, FileText, CalendarDays } from "lucide-react";
import AttendeeForm from "@/app/components/AttendeeForm";
import CountDown from "@/app/components/CountDown";
import ShareButton from "@/app/components/ShareButton";
import { getAttendeesByEventId } from "@/app/services/attendeeService";
import { getEventById } from "@/app/services/eventService";
import { auth } from "@/auth";

const EventPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const event = await getEventById(Number(id));

  const eventAttendees = await getAttendeesByEventId(Number(id));

  const session = await auth();

  if (!event) {
    return <p>Event not found.</p>;
  }

  return (
    <div
      className={`max-w-2xl mx-auto flex flex-col gap-8 ${!session ? "pt-20" : ""}`}
    >
      {!session && (
        <nav className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-zinc-200 flex items-center px-6 z-50">
          <Link href="/">
            <Image
              src="/are-you-coming-logo-light-q.svg"
              alt="Are You Coming?"
              width={82}
              height={30}
            />
          </Link>
        </nav>
      )}
      {event.imageUrl ? (
        <figure className="relative rounded-lg overflow-hidden">
          <Image
            src={event.imageUrl}
            alt={event.name}
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-72 object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
          <figcaption className="absolute bottom-0 left-0 right-0 p-6">
            <h1 className="text-4xl font-bold text-white">{event.name}</h1>
            <time
              dateTime={new Date(event.eventDate).toISOString()}
              className="inline-block mt-3 bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full"
            >
              {new Date(event.eventDate).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </figcaption>
        </figure>
      ) : (
        <figure className="relative rounded-lg overflow-hidden">
          <div className="flex items-center justify-center bg-violet-50 w-full h-72">
            <CalendarDays size={80} className="text-violet-300" />
          </div>
          <figcaption className="absolute bottom-0 left-0 right-0 p-6">
            <h1 className="text-4xl font-bold text-zinc-800">{event.name}</h1>
            <time
              dateTime={new Date(event.eventDate).toISOString()}
              className="inline-block mt-3 bg-violet-100 text-violet-700 text-xs font-medium px-3 py-1 rounded-full"
            >
              {new Date(event.eventDate).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </figcaption>
        </figure>
      )}
      <article>
        <CountDown eventDate={event.eventDate} />

        {event.description && (
          <>
            <h2 className="mt-8 mb-4 text-subtitle flex items-center gap-2">
              <FileText size={18} /> Event description
            </h2>
            <p className="text-body leading-relaxed">{event.description}</p>
          </>
        )}

        {session && (
          <div className="mt-6">
            <ShareButton />
          </div>
        )}

        <h2 className="mt-8 mb-4 text-subtitle flex items-center gap-2">
          <Users size={18} /> Attendee list
        </h2>
        {eventAttendees.length > 0 ? (
          <ul className="flex gap-1 md:w-1/2 overflow-x-auto scrollbar-hide list-none">
            {eventAttendees.map((attendee) => (
              <li
                className="inline-block text-nowrap bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full"
                key={attendee.id}
              >
                {attendee.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-subtle">No Attendees</p>
        )}
      </article>
      {!session && <AttendeeForm eventId={event.id} />}
    </div>
  );
};

export default EventPage;
