export type EventType = {
  id: number;
  name: string;
  eventDate: string;
  eventEndDate: string;
  description: string;
  userId: string;
  imageUrl: string | null;
  spotifyUrl: string | null;
  spotifyInviteUrl: string | null;
  eventLocation: string;
  hostName: string | null;
  timeZone: string;
};

export type AttendeeType = {
  id: number;
  name: string;
  email: string;
  responseStatus: ResponseStatus;
};

export type ResponseStatus = "unsure" | "coming" | "skipping";

export const statusLabels: Record<ResponseStatus, string> = {
  unsure: "Pending response",
  coming: "Invitation accepted",
  skipping: "Invitation declined",
};

export type ResponseLogType = {
  id: number;
  eventId: number;
  attendeeId: number;
  attendeeName: string;
  responseStatus: ResponseStatus;
  createdAt: Date;
  eventName: string;
};
