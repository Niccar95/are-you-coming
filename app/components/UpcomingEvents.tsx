"use client";

import { useState } from "react";
import { EventType } from "../lib/types";
import EventCard from "./EventCard";
import EventActions from "./EventActions";
import { Settings2, Check } from "lucide-react";

interface UpcomingEventsProps {
  events: EventType[];
}

const UpcomingEvents = ({ events }: UpcomingEventsProps) => {
  const [manageMode, setManageMode] = useState(false);

  const toggleManageMode = () => {
    setManageMode(!manageMode);
  };

  if (events.length === 0)
    return <p className="text-meta">No upcoming events to show.</p>;

  return (
    <div className="flex flex-col gap-6">
      <button
        onClick={toggleManageMode}
        className="btn-outline-violet self-start flex items-center gap-2"
      >
        {manageMode ? (
          <>
            {" "}
            <Check size={16} /> Done
          </>
        ) : (
          <>
            <Settings2 size={16} /> Manage Events
          </>
        )}
      </button>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 list-none">
        {events.map((event) => (
          <li key={event.id} className="relative">
            <EventCard
              id={event.id}
              name={event.name}
              eventDate={event.eventDate}
              description={event.description}
              imageUrl={event.imageUrl}
            />
            {manageMode && (
              <EventActions
                id={event.id}
                eventName={event.name}
                eventDate={new Date(event.eventDate).toISOString().slice(0, 16)}
                description={event.description}
                spotifyUrl={event.spotifyUrl ?? null}
                spotifyInviteUrl={event.spotifyInviteUrl ?? null}
                imageUrl={event.imageUrl ?? null}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingEvents;
