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

  displayEvent(): string {
    return `${this.name} (${this.eventDate})`;
  }

  hasValidDate(): boolean {
    return this.eventDate instanceof Date && !isNaN(this.eventDate.getTime());
  }

  isAFutureDate(): boolean {
    return this.hasValidDate() && this.eventDate > new Date();
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
