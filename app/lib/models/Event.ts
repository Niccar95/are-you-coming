export class EventClass {
  id: number;
  name: string;
  eventDate: Date;
  description: string;
  userId: string;
  imageUrl: string | null;
  spotifyUrl: string | null;
  spotifyInviteUrl: string | null;
  eventLocation: string;
  hostName: string | null;

  constructor(
    id: number,
    name: string,
    eventDate: Date,
    description: string,
    userId: string,
    imageUrl: string | null,
    spotifyUrl: string | null,
    spotifyInviteUrl: string | null,
    eventLocation: string,
    hostName: string | null = null,
  ) {
    this.id = id;
    this.name = name;
    this.eventDate = eventDate;
    this.description = description;
    this.userId = userId;
    this.imageUrl = imageUrl;
    this.spotifyUrl = spotifyUrl;
    this.spotifyInviteUrl = spotifyInviteUrl;
    this.eventLocation = eventLocation;
    this.hostName = hostName;
  }

  hasValidDate(): boolean {
    return this.eventDate instanceof Date && !isNaN(this.eventDate.getTime());
  }

  isAFutureDate(): boolean {
    return this.hasValidDate() && this.eventDate > new Date();
  }

  getGoogleCalendarUrl(durationHours: number = 2): string {
    const start = new Date(this.eventDate);
    const end = new Date(start.getTime() + durationHours * 60 * 60 * 1000);

    const formatGoogleCalendarDate = (d: Date) => {
      const pad = (n: number) => String(n).padStart(2, "0");

      return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}`;
    };

    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: this.name,
      dates: `${formatGoogleCalendarDate(start)}/${formatGoogleCalendarDate(end)}`,
      details: this.description || "",
      location: this.eventLocation || "",
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      eventDate: this.eventDate.toISOString(),
      description: this.description,
      userId: this.userId,
      imageUrl: this.imageUrl,
      spotifyUrl: this.spotifyUrl,
      spotifyInviteUrl: this.spotifyInviteUrl,
      eventLocation: this.eventLocation,
      hostName: this.hostName,
    };
  }
}
