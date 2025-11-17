export class Attendee {
  id: number;
  name: string;
  email?: string;

  constructor(id: number, name: string, email?: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  displayName(): string {
    return `${this.name} (${this.email})`;
  }

  hasValidEmail(): boolean {
    return !!this.email && /\S+@\S+\.\S+/.test(this.email);
  }
}
