"use client";

import { CalendarDays, Link } from "lucide-react";
import ShareButton from "./ShareButton";
import { EventType } from "../lib/types";
import Image from "next/image";
import { useCallback, useState } from "react";
import useClickOutside from "../hooks/useClickOutside";

interface EventLinksCardProps {
  upcomingEvents: EventType[];
  upcomingCount: number;
}

const EventLinksCard = ({
  upcomingEvents,
  upcomingCount,
}: EventLinksCardProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClose = useCallback(() => setIsOpen(false), []);

  const modalRef = useClickOutside(isOpen, onClose);

  const mostRecentLink = upcomingEvents[0];

  return (
    <>
      <section className="card h-55 shrink-0 flex flex-col w-full md:w-1/2">
        <h2 className="text-title mb-4">Active Event Links</h2>

        {upcomingCount === 0 ? (
          <p className="text-meta">No active events yet.</p>
        ) : (
          <div className="flex flex-col gap-3">
            <div
              key={mostRecentLink.id}
              className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 border border-zinc-100"
            >
              <div className="flex items-center gap-3">
                {mostRecentLink.imageUrl ? (
                  <Image
                    src={mostRecentLink.imageUrl}
                    alt={mostRecentLink.name}
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
                  {mostRecentLink.name}
                </p>
              </div>
              <ShareButton
                url={`${process.env.NEXT_PUBLIC_SITE_URL}/events/${mostRecentLink.id}`}
              />
            </div>
          </div>
        )}
        <button
          onClick={() => setIsOpen(true)}
          disabled={upcomingCount <= 1}
          className="mt-auto font-medium text-violet-600 hover:text-violet-700 transition-colors self-end cursor-pointer"
        >
          View all →
        </button>
      </section>

      {isOpen && (
        <div className="modal-overlay fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div
            ref={modalRef}
            className="card w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-title mb-4">All Active Event Links</h2>

            <div className="flex flex-col gap-6 overflow-y-auto overflow-x-hidden">
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
          </div>
        </div>
      )}
    </>
  );
};

export default EventLinksCard;
