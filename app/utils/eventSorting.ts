export const sortByDate = (events: { eventDate: string }[], order: string) =>
  events.sort((a, b) =>
    order === "asc"
      ? new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
      : new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime(),
  );
