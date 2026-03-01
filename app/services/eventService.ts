import { auth } from "@/auth";
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
    }) =>
      new Event(
        event.id,
        event.name,
        event.event_date,
        event.description,
        event.user_id,
        event.image_url,
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
  );
};

export const addEvent = async (
  name: string,
  eventDate: Date,
  description: string,
  userId: string,
  imageUrl: string | null,
): Promise<Event> => {
  const { rows } = await pool.query(
    "INSERT INTO events (name, event_date, description, user_id, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, eventDate, description, userId, imageUrl],
  );
  return new Event(
    rows[0].id,
    rows[0].name,
    rows[0].event_date,
    rows[0].description,
    rows[0].user_id,
    rows[0].image_url,
  );
};
