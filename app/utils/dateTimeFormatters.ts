// Converts a JS Date object into the format required by <input type="datetime-local" />
// How it looks like: "YYYY-MM-DDTHH:mm" (Local Time)

export const formatDate = (date: Date) => {
  const pad = (n: number) => String(n).padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

// Takes the raw string from <input type="datetime-local" /> and converts it
// to a standardized UTC ISO string for database storage

export const formatDateToUtc = (eventDate: string): Date => {
  const localDate = new Date(eventDate);

  return new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000);
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

export const formatTimeForUI = (time?: Date | string | null): string => {
  if (!time) return "";

  const parsedTime = typeof time === "string" ? new Date(time) : time;

  return parsedTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  });
};
