import { auth } from "@/auth";
import { del } from "@vercel/blob";
import pool from "../lib/db";
import { EventClass } from "../lib/models/Event";

export const getEvents = async (): Promise<EventClass[]> => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return [];

  const { rows } = await pool.query(
    "SELECT * FROM events WHERE user_id = $1 ORDER BY id DESC",
    [userId],
  );

  return rows.map(
    (event: {
      id: number;
      name: string;
      event_date: Date;
      event_end_date: Date;
      description: string;
      user_id: string;
      image_url: string | null;
      spotify_url: string | null;
      spotify_invite_url: string | null;
      event_location: string;
      event_host: string | null;
      timezone: string;
    }) =>
      new EventClass(
        event.id,
        event.name,
        event.event_date,
        event.event_end_date,
        event.description,
        event.user_id,
        event.image_url,
        event.spotify_url,
        event.spotify_invite_url,
        event.event_location,
        event.event_host,
        event.timezone,
      ),
  );
};

export const getEventById = async (id: number): Promise<EventClass | null> => {
  const { rows } = await pool.query("SELECT * FROM events WHERE id = $1", [id]);

  if (rows.length === 0) return null;
  return new EventClass(
    rows[0].id,
    rows[0].name,
    rows[0].event_date,
    rows[0].event_end_date,
    rows[0].description,
    rows[0].user_id,
    rows[0].image_url,
    rows[0].spotify_url,
    rows[0].spotify_invite_url,
    rows[0].event_location,
    rows[0].event_host,
    rows[0].timezone,
  );
};

export const addEvent = async (
  name: string,
  eventDate: Date,
  eventEndDate: Date,
  description: string,
  userId: string,
  imageUrl: string | null,
  spotifyUrl: string | null,
  spotifyInviteUrl: string | null,
  eventLocation: string,
  hostName: string | null,
  timezone: string,
): Promise<EventClass> => {
  const { rows } = await pool.query(
    "INSERT INTO events (name, event_date, event_end_date, description, user_id, image_url, spotify_url, spotify_invite_url, event_location, event_host, timezone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
    [
      name,
      eventDate,
      eventEndDate,
      description,
      userId,
      imageUrl,
      spotifyUrl,
      spotifyInviteUrl,
      eventLocation,
      hostName,
      timezone,
    ],
  );
  return new EventClass(
    rows[0].id,
    rows[0].name,
    rows[0].event_date,
    rows[0].event_end_date,
    rows[0].description,
    rows[0].user_id,
    rows[0].image_url,
    rows[0].spotify_url,
    rows[0].spotify_invite_url,
    rows[0].event_location,
    rows[0].event_host,
    rows[0].timezone,
  );
};

export const updateEvent = async (
  id: number,
  name: string,
  eventDate: Date,
  eventEndDate: Date,
  description: string,
  imageUrl: string | null,
  spotifyUrl: string | null,
  spotifyInviteUrl: string | null,
  eventLocation: string,
): Promise<EventClass> => {
  const { rows: existing } = await pool.query(
    "SELECT image_url FROM events WHERE id = $1",
    [id],
  );
  const oldImageUrl = existing[0]?.image_url;
  if (oldImageUrl && oldImageUrl !== imageUrl) await del(oldImageUrl);

  const { rows } = await pool.query(
    "UPDATE events SET name = $1, event_date = $2, event_end_date = $3, description = $4, image_url = $5, spotify_url = $6, spotify_invite_url = $7, event_location = $8 WHERE id = $9 RETURNING *",
    [
      name,
      eventDate,
      eventEndDate,
      description,
      imageUrl,
      spotifyUrl,
      spotifyInviteUrl,
      eventLocation,
      id,
    ],
  );
  return new EventClass(
    rows[0].id,
    rows[0].name,
    rows[0].event_date,
    rows[0].event_end_date,
    rows[0].description,
    rows[0].user_id,
    rows[0].image_url,
    rows[0].spotify_url,
    rows[0].spotify_invite_url,
    rows[0].event_location,
    rows[0].event_host,
    rows[0].timezone,
  );
};

export const deleteEvent = async (id: number) => {
  const { rows } = await pool.query(
    "SELECT image_url FROM events WHERE id = $1",
    [id],
  );
  const imageUrl = rows[0]?.image_url;

  if (imageUrl) await del(imageUrl);

  await pool.query("DELETE FROM events WHERE id = $1", [id]);
};
