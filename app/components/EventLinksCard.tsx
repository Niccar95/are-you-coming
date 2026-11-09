import { CalendarDays } from "lucide-react";
import ShareButton from "./ShareButton";
import { EventType } from "../lib/types";
import Image from "next/image";

interface EventLinksCardProps {
  upcomingEvents: EventType[];
  upcomingCount: number;
}

const EventLinksCard = ({
  upcomingEvents,
  upcomingCount,
}: EventLinksCardProps) => {
  return (
    <section className="card">
      <h2 className="text-title mb-4">Active Event Links</h2>

      {upcomingCount === 0 ? (
        <p className="text-meta">No active events yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 border border-zinc-100"
            >
              <div className="flex items-center gap-3">
                {event.imageUrl ? (
                  <Image
                    src={event.imageUrl}
                    alt={event.name}
                    width={96}
                    height={96}
                    className="w-15 h-15 rounded-lg object-cover shrink-0"
                  />
                ) : (
                  <div className="flex items-center justify-center bg-violet-50 rounded-lg w-15 h-15 shrink-0">
                    <CalendarDays size={27} className="text-violet-300" />
                  </div>
                )}
                <p className="font-semibold text-sm text-zinc-900 truncate max-w-20 md:max-w-30">
                  {event.name}
                </p>
              </div>
              <ShareButton
                url={`${process.env.NEXT_PUBLIC_SITE_URL}/events/${event.id}`}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default EventLinksCard;
