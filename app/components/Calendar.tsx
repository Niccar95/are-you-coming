"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { JSX, useState } from "react";
import { EventType } from "../lib/types";

interface EventListProps {
  allEvents: EventType[];
}

const Calendar = ({ allEvents }: EventListProps) => {
  const [monthIndex, setMonthIndex] = useState<number>(new Date().getMonth());
  const [year, setYear] = useState<number>(new Date().getFullYear());

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
        className={`border border-zinc-100 p-1 lg:p-2 min-h-14 lg:min-h-28 text-xs lg:text-sm ${i < firstMonthDay ? "bg-zinc-50 text-zinc-300" : "text-zinc-700"}`}
      >
        {monthDate > 0 && <span className="font-medium">{monthDate}</span>}
        {monthDate <= 0 && <span></span>}

        <p className="text-subtle">{day}</p>

        {events.map((e) => (
          <p key={e.id} className="mt-1">
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
    <div className="form-card p-2! lg:p-6! max-w-4xl mx-auto">
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
        <span className="text-sm lg:text-lg font-semibold text-zinc-800 min-w-32 lg:min-w-48 text-center">
          {month[monthIndex]} {year}
        </span>
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
  );
};

export default Calendar;
