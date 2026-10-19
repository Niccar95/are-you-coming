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
  inviteStatus: InviteStatus;
};

export type InviteStatus = "pending" | "accepted" | "declined";

export const inviteStatusLabels: Record<InviteStatus, string> = {
  pending: "Pending response",
  accepted: "Invitation accepted",
  declined: "Invitation declined",
};

/// example for future card that will show invited guest timestamps with their status

// export type EventAttendeeType = {
//   eventId: number;
//   attendeeId: number;
//   inviteStatus: InviteStatus;
//   invitedAt: string;
//   respondedAt: string | null;
// };
