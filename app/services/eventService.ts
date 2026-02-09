import pool from "../lib/db";
import { Event } from "../lib/models/Event";

export const getEvents = async (): Promise<Event[]> => {
  const { rows } = await pool.query("SELECT * FROM events ORDER BY id ASC");
  return rows.map(
    (event: Event) => new Event(event.id, event.name, event.eventDate, event.description),
  );
};

export const addEvent = async (
  name: string,
  eventDate: Date,
  description: string,
): Promise<Event> => {
  const { rows } = await pool.query(
    "INSERT INTO events (name, event_date, description) VALUES ($1, $2, $3) RETURNING *",
    [name, eventDate, description],
  );
  return new Event(rows[0].id, rows[0].name, rows[0].event_date, rows[0].description);
};
