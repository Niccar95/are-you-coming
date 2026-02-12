import pool from "../lib/db";
import { Attendee } from "../lib/models/Attendee";

export const getAttendees = async (): Promise<Attendee[]> => {
  const { rows } = await pool.query("SELECT * FROM attendees ORDER BY id ASC");
  return rows.map(
    (attendee: { id: number; name: string; email: string }) =>
      new Attendee(attendee.id, attendee.name, attendee.email),
  );
};

export const addAttendee = async (
  eventId: number,
  name: string,
  email: string,
): Promise<Attendee> => {
  const { rows } = await pool.query(
    "INSERT INTO attendees (name, email) VALUES ($1, $2) RETURNING *",
    [name, email],
  );
  const attendee = new Attendee(rows[0].id, rows[0].name, rows[0].email);

  await pool.query(
    "INSERT INTO event_attendees (event_id, attendee_id) VALUES ($1, $2)",
    [eventId, attendee.id],
  );

  return attendee;
};
