export class Event {
  id: number;
  name: string;
  eventDate: Date;

  constructor(id: number, name: string, eventDate: Date) {
    this.id = id;
    this.name = name;
    this.eventDate = eventDate;
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
