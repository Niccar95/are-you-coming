import { ResponseStatus } from "../types";

export class AttendeeClass {
  id: number;
  name: string;
  email: string;
  responseStatus: ResponseStatus;

  constructor(
    id: number,
    name: string,
    email: string,
    responseStatus: ResponseStatus,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.responseStatus = responseStatus;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      responseStatus: this.responseStatus,
    };
  }
}
