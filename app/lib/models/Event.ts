export class Event {
  id: number;
  name: string;
  eventDate: Date;
  description: string;

  constructor(id: number, name: string, eventDate: Date, description: string) {
    this.id = id;
    this.name = name;
    this.eventDate = eventDate;
    this.description = description;
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
