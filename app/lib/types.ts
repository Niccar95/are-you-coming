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
};
