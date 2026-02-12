import { auth } from "@/auth";
import pool from "../lib/db";
import { Event } from "../lib/models/Event";

export const getEvents = async (): Promise<Event[]> => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return [];

  const { rows } = await pool.query(
    "SELECT * FROM events WHERE user_id = $1 ORDER BY id ASC",
    [userId],
  );

  return rows.map(
    (event: {
      id: number;
      name: string;
      event_date: Date;
      description: string;
      user_id: string;
    }) =>
      new Event(
        event.id,
        event.name,
        event.event_date,
        event.description,
        event.user_id,
      ),
  );
};

export const addEvent = async (
  name: string,
  eventDate: Date,
  description: string,
  userId: string,
): Promise<Event> => {
  const { rows } = await pool.query(
    "INSERT INTO events (name, event_date, description, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, eventDate, description, userId],
  );
  return new Event(
    rows[0].id,
    rows[0].name,
    rows[0].event_date,
    rows[0].description,
    rows[0].user_id,
  );
};
