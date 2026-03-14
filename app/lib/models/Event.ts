export class Event {
  id: number;
  name: string;
  eventDate: Date;
  description: string;
  userId: string;
  imageUrl: string | null;
  spotifyUrl: string | null;

  constructor(
    id: number,
    name: string,
    eventDate: Date,
    description: string,
    userId: string,
    imageUrl: string | null,
    spotifyUrl: string | null,
  ) {
    this.id = id;
    this.name = name;
    this.eventDate = eventDate;
    this.description = description;
    this.userId = userId;
    this.imageUrl = imageUrl;
    this.spotifyUrl = spotifyUrl;
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
}
