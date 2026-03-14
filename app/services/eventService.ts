import { auth } from "@/auth";
import { del } from "@vercel/blob";
import pool from "../lib/db";
import { Event } from "../lib/models/Event";

export const getEvents = async (): Promise<Event[]> => {
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
      description: string;
      user_id: string;
      image_url: string | null;
      spotify_url: string | null;
    }) =>
      new Event(
        event.id,
        event.name,
        event.event_date,
        event.description,
        event.user_id,
        event.image_url,
        event.spotify_url,
      ),
  );
};

export const getEventById = async (id: number): Promise<Event | null> => {
  const { rows } = await pool.query("SELECT * FROM events WHERE id = $1", [id]);

  if (rows.length === 0) return null;

  return new Event(
    rows[0].id,
    rows[0].name,
    rows[0].event_date,
    rows[0].description,
    rows[0].user_id,
    rows[0].image_url,
    rows[0].spotify_url,
  );
};

export const addEvent = async (
  name: string,
  eventDate: Date,
  description: string,
  userId: string,
  imageUrl: string | null,
  spotifyUrl: string | null,
): Promise<Event> => {
  const { rows } = await pool.query(
    "INSERT INTO events (name, event_date, description, user_id, image_url, spotify_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [name, eventDate, description, userId, imageUrl, spotifyUrl],
  );
  return new Event(
    rows[0].id,
    rows[0].name,
    rows[0].event_date,
    rows[0].description,
    rows[0].user_id,
    rows[0].image_url,
    rows[0].spotify_url,
  );
};

export const updateEvent = async (
  id: number,
  name: string,
  eventDate: Date,
  description: string,
  imageUrl: string | null,
  spotifyUrl: string | null,
): Promise<Event> => {
  const { rows: existing } = await pool.query(
    "SELECT image_url FROM events WHERE id = $1",
    [id],
  );
  const oldImageUrl = existing[0]?.image_url;
  if (oldImageUrl && oldImageUrl !== imageUrl) await del(oldImageUrl);

  const { rows } = await pool.query(
    "UPDATE events SET name = $1, event_date = $2, description = $3, image_url = $4, spotify_url = $5 WHERE id = $6 RETURNING *",
    [name, eventDate, description, imageUrl, spotifyUrl, id],
  );
  return new Event(
    rows[0].id,
    rows[0].name,
    rows[0].event_date,
    rows[0].description,
    rows[0].user_id,
    rows[0].image_url,
    rows[0].spotify_url,
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
