import { CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface EventProps {
  id: number;
  name: string;
  eventDate: Date;
  description: string;
  imageUrl: string | null;
}

const EventCard = ({
  id,
  name,
  eventDate,
  description,
  imageUrl,
}: EventProps) => {
  return (
    <Link href={`/events/${id}`} className="block min-w-[300px] shrink-0">
      <article
        key={id}
        className="h-[300px] w-[300] bg-white dark:bg-zinc-900 rounded-lg shadow-lg cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300 overflow-hidden"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="eventImage"
            width={0}
            height={0}
            sizes="300px"
            className="w-full h-36 object-cover"
          />
        ) : (
          <div className="flex items-center justify-center bg-violet-50 w-full h-36">
            <CalendarDays size={60} className="text-violet-300" />
          </div>
        )}
        <div className="p-5">
          <h3 className="text-subtitle">{name}</h3>
          <time
            dateTime={new Date(eventDate).toISOString()}
            className="bg-violet-100 text-violet-700 text-xs font-medium px-3 py-1 rounded-full"
          >
            {new Date(eventDate).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {description && (
            <p className="text-body mt-3 line-clamp-2">{description}</p>
          )}
        </div>
      </article>
    </Link>
  );
};

export default EventCard;
