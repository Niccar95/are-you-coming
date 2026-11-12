// Converts a JS Date object into the format required by <input type="datetime-local" />
// How it looks like: "YYYY-MM-DDTHH:mm" (Local Time)

import { fromZonedTime, toZonedTime } from "date-fns-tz";

export const formatDate = (date: Date) => {
  const pad = (n: number) => String(n).padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

// Takes the raw string from <input type="datetime-local" /> and converts it
// to a standardized UTC ISO string for database storage

// export const formatDateToUtc = (eventDate: string): string => {
//   return new Date(eventDate).toISOString();
// };

export const formatDateToUtc = (
  eventDate: string,
  timezone: string,
): string => {
  return fromZonedTime(eventDate, timezone).toISOString();
};

// For UI display

export const formatDateForUI = (date?: Date | string | null): string => {
  if (!date) return "";

  const parsedDate = typeof date === "string" ? new Date(date) : date;

  return parsedDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatTimeForUI = (
  time: Date | string | null | undefined,
  timezone: string,
): string => {
  if (!time) return "";

  const parsedTime = typeof time === "string" ? new Date(time) : time;

  return parsedTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: timezone,
  });
};

// Converts a UTC date into the event's timezone for datetime-local inputs

export const formatDateForInput = (
  date: Date | string,
  timezone: string,
): string => {
  const zonedDate = toZonedTime(date, timezone);
  const pad = (n: number) => String(n).padStart(2, "0");

  return `${zonedDate.getFullYear()}-${pad(zonedDate.getMonth() + 1)}-${pad(zonedDate.getDate())}T${pad(zonedDate.getHours())}:${pad(zonedDate.getMinutes())}`;
};
