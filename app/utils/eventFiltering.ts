import { EventType } from "../lib/types";

export const filterUpcomingEvents = (events: EventType[]) =>
  events.filter((event) => new Date(event.eventDate).getTime() >= new Date().getTime());

export const filterPastEvents = (events: EventType[]) =>
  events.filter((event) => new Date(event.eventDate).getTime() < new Date().getTime());
