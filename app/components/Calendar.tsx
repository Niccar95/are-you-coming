"use client";

import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import Image from "next/image";
import { JSX, useState } from "react";
import { EventType } from "../lib/types";

interface EventListProps {
  allEvents: EventType[];
}

const Calendar = ({ allEvents }: EventListProps) => {
  const [monthIndex, setMonthIndex] = useState<number>(new Date().getMonth());
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [showEventCard, setShowEventCard] = useState<boolean>(false);
  const [activeCellIndex, setActiveCellIndex] = useState<number | null>(null);

  const [selectedEvents, setSelectedEvents] = useState<EventType[]>([]);

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const cellList: JSX.Element[] = [];

  const fullMonth = new Date(year, monthIndex + 1, 0).getDate();

  const firstMonthDay = new Date(year, monthIndex, 1).getDay();

  const days: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handlePreviousYear = () => {
    setYear(year - 1);
  };

  const handleNextYear = () => {
    setYear(year + 1);
  };

  const handlePreviousMonth = () => {
    if (monthIndex <= 0) {
      setMonthIndex(11);
      setYear(year - 1);
    } else {
      setMonthIndex((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (monthIndex >= 11) {
      setMonthIndex(0);
      setYear(year + 1);
    } else {
      setMonthIndex((prev) => prev + 1);
    }
  };

  const handleEventCard = (event: EventType[], key: number) => {
    if (key === activeCellIndex) {
      setShowEventCard(false);
      setActiveCellIndex(null);
    } else {
      setShowEventCard(true);
      setActiveCellIndex(key);
      setSelectedEvents(event);
    }
  };

  for (let i = 0; i < firstMonthDay + fullMonth; i++) {
    const day = days[i % 7];

    const monthDate = i - firstMonthDay + 1;

    const events = allEvents.filter(
      (item) =>
        new Date(item.eventDate).getDate() === monthDate &&
        new Date(item.eventDate).getMonth() === monthIndex &&
        new Date(item.eventDate).getFullYear() === year,
    );

    cellList.push(
      <div
        key={i}
        className={`border border-zinc-100 p-1 lg:p-2 min-h-14 lg:min-h-28 text-xs lg:text-sm transition-colors ${i < firstMonthDay ? "bg-zinc-50 text-zinc-300" : "text-zinc-700"} ${events.length > 0 ? "cursor-pointer hover:border-violet-300" : ""}`}
        onClick={() => handleEventCard(events, i)}
      >
        {monthDate > 0 && (
          <p className="font-medium flex items-center gap-1">
            {monthDate}
            {events.length > 0 && (
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            )}
          </p>
        )}
        {monthDate <= 0 && <p></p>}

        <p className="text-subtle">{day}</p>

        {events.map((e) => (
          <p
            key={e.id}
            className="mt-1 text-[10px] lg:text-xs bg-violet-100 text-violet-700 font-medium px-1 lg:px-2 py-0.5 rounded truncate"
          >
            {e.name}
          </p>
        ))}
      </div>,
    );
  }

  const remainder = (firstMonthDay + fullMonth) % 7;
  if (remainder > 0) {
    for (let j = 0; j < 7 - remainder; j++) {
      const remainingWeekDays = days[remainder + j];
      cellList.push(
        <div
          key={`trail-${j}`}
          className="border border-zinc-100 p-1 lg:p-2 min-h-14 lg:min-h-28 bg-zinc-50"
        >
          <p className="text-subtle">{remainingWeekDays}</p>
        </div>,
      );
    }
  }

  return (
    <>
      <div className="form-card p-2! lg:p-6! max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-center gap-1 lg:gap-2 mb-3 lg:mb-4">
          <button
            onClick={handlePreviousYear}
            className="btn-secondary py-1! px-1.5! lg:py-1.5! lg:px-2.5!"
          >
            <ChevronsLeft size={18} />
          </button>
          <button
            onClick={handlePreviousMonth}
            className="btn-secondary py-1! px-1.5! lg:py-1.5! lg:px-2.5!"
          >
            <ChevronLeft size={18} />
          </button>
          <h2 className="text-subtitle text-sm lg:text-lg min-w-32 lg:min-w-48 text-center">
            {month[monthIndex]} {year}
          </h2>
          <button
            onClick={handleNextMonth}
            className="btn-secondary py-1! px-1.5! lg:py-1.5! lg:px-2.5!"
          >
            <ChevronRight size={18} />
          </button>
          <button
            onClick={handleNextYear}
            className="btn-secondary py-1! px-1.5! lg:py-1.5! lg:px-2.5!"
          >
            <ChevronsRight size={18} />
          </button>
        </div>
        <div className="grid grid-cols-7 rounded-lg overflow-hidden border border-zinc-200">
          {cellList}
        </div>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col gap-4">
        {selectedEvents.map((event, index) => (
          <article
            key={event.id}
            style={{ transitionDelay: `${index * 100}ms` }}
            className={`flex flex-row items-start gap-4 p-6 bg-white rounded-lg shadow-lg border-l-4 border-violet-500 transition-all duration-300 ${showEventCard ? "opacity-100 max-h-screen" : "opacity-0 max-h-0 overflow-hidden pointer-events-none"}`}
          >
            {event.imageUrl ? (
              <Image
                src={event.imageUrl}
                alt={event.name}
                width={96}
                height={96}
                className="w-24 h-24 rounded-lg object-cover shrink-0"
              />
            ) : (
              <div className="flex items-center justify-center bg-violet-50 rounded-lg w-24 h-24 shrink-0">
                <CalendarDays size={40} className="text-violet-300" />
              </div>
            )}
            <div className="flex flex-col gap-1">
              <h3 className="text-subtitle">{event.name}</h3>
              <time className="text-meta">
                {new Date(event.eventDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              {event.description && (
                <p className="text-body line-clamp-1">{event.description}</p>
              )}
            </div>
          </article>
        ))}
      </div>
    </>
  );
};

export default Calendar;
