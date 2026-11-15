import { toZonedTime } from "date-fns-tz";

export class EventClass {
  id: number;
  name: string;
  eventDate: Date;
  eventEndDate: Date;
  description: string;
  userId: string;
  imageUrl: string | null;
  spotifyUrl: string | null;
  spotifyInviteUrl: string | null;
  eventLocation: string;
  hostName: string;
  timeZone: string;

  constructor(
    id: number,
    name: string,
    eventDate: Date,
    eventEndDate: Date,
    description: string,
    userId: string,
    imageUrl: string | null,
    spotifyUrl: string | null,
    spotifyInviteUrl: string | null,
    eventLocation: string,
    hostName: string,
    timeZone: string,
  ) {
    this.id = id;
    this.name = name;
    this.eventDate = eventDate;
    this.eventEndDate = eventEndDate;
    this.description = description;
    this.userId = userId;
    this.imageUrl = imageUrl;
    this.spotifyUrl = spotifyUrl;
    this.spotifyInviteUrl = spotifyInviteUrl;
    this.eventLocation = eventLocation;
    this.hostName = hostName;
    this.timeZone = timeZone;
  }

  hasValidDate(): boolean {
    return this.eventDate instanceof Date && !isNaN(this.eventDate.getTime());
  }

  isAFutureDate(): boolean {
    return this.hasValidDate() && this.eventDate > new Date();
  }

  getGoogleCalendarUrl(): string {
    const start = new Date(this.eventDate);
    const end = new Date(this.eventEndDate);

    const formatGoogleCalendarDate = (d: Date) => {
      const zonedDate = toZonedTime(d, this.timeZone);
      const pad = (n: number) => String(n).padStart(2, "0");

      return `${zonedDate.getFullYear()}${pad(zonedDate.getMonth() + 1)}${pad(zonedDate.getDate())}T${pad(zonedDate.getHours())}${pad(zonedDate.getMinutes())}${pad(zonedDate.getSeconds())}`;
    };

    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: this.name,
      dates: `${formatGoogleCalendarDate(start)}/${formatGoogleCalendarDate(end)}`,
      details: this.description || "",
      location: this.eventLocation || "",
      ctz: this.timeZone || "",
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      eventDate: this.eventDate.toISOString(),
      eventEndDate: this.eventEndDate.toISOString(),
      description: this.description,
      userId: this.userId,
      imageUrl: this.imageUrl,
      spotifyUrl: this.spotifyUrl,
      spotifyInviteUrl: this.spotifyInviteUrl,
      eventLocation: this.eventLocation,
      hostName: this.hostName,
      timeZone: this.timeZone,
    };
  }
}
