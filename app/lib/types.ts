export type EventType = {
  id: number;
  name: string;
  eventDate: string;
  description: string;
  userId: string;
  imageUrl: string | null;
  spotifyUrl: string | null;
  spotifyInviteUrl: string | null;
  eventLocation: string;
  hostName: string | null;
};

export type Attendee = {
  id: number;
  name: string;
  email: string;
};
