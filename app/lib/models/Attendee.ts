import { InviteStatus } from "../types";

export class AttendeeClass {
  id: number;
  name: string;
  email: string;
  inviteStatus: InviteStatus;

  constructor(
    id: number,
    name: string,
    email: string,
    inviteStatus: InviteStatus,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.inviteStatus = inviteStatus;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      inviteStatus: this.inviteStatus,
    };
  }
}
