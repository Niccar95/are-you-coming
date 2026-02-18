"use client";

import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { JSX, useState } from "react";

const CalendarPage = () => {
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

  const handlePrevious = () => {
    if (monthIndex <= 0) {
      setMonthIndex(11);
      setYear(year - 1);
    } else {
      setMonthIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
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

    cellList.push(
      <div
        key={i}
        className={`border border-zinc-200 p-2 ${i < firstMonthDay ? "bg-gray-100" : ""}`}
      >
        {monthDate > 0 && <span>{monthDate}</span>}
        {monthDate <= 0 && <span></span>}
        <p>{day}</p>
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
          className="border border-zinc-200 p-2 bg-gray-100"
        >
          <p>{remainingWeekDays}</p>
        </div>,
      );
    }
  }

  return (
    <>
      <div className="flex gap-2 mb-4">
        <button
          onClick={handlePrevious}
          className="px-3 py-1 rounded-lg bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 transition-colors cursor-pointer"
        >
          <ArrowBigLeft />
        </button>
        <button
          onClick={handleNext}
          className="px-3 py-1 rounded-lg bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 transition-colors cursor-pointer"
        >
          <ArrowBigRight />
        </button>
      </div>
      <p>
        {month[monthIndex]} {""} {year}
      </p>
      <div className="grid grid-cols-7 border border-zinc-200 rounded-lg overflow-hidden">
        {cellList}
      </div>
    </>
  );
};

export default CalendarPage;
