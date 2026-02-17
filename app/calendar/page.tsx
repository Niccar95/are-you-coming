import { JSX } from "react";

const CalendarPage = () => {
  const cellList: JSX.Element[] = [];

  const fullMonth = new Date(2026, 0, 0).getDate();

  const firstMonthDay = new Date(2026, 0, 1).getDay();

  const days: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  for (let i = 1; i <= fullMonth; i++) {
    const day = days[i % 7];

    cellList.push(
      <div
        key={i}
        className={`border border-zinc-200 p-2 ${i < firstMonthDay ? "bg-gray-100" : ""}`}
      >
        {i}
        <p>{day}</p>
      </div>,
    );
  }

  return (
    <div className="grid grid-cols-7 border border-zinc-200 rounded-lg overflow-hidden">
      {cellList}
    </div>
  );
};

export default CalendarPage;
