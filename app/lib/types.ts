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

/// example for future card that will show invited guest timestamps with their status

// export type EventAttendeeType = {
//   eventId: number;
//   attendeeId: number;
//   responseStatus: ResponseStatus;
//   invitedAt: string;
//   respondedAt: string | null;
// };
