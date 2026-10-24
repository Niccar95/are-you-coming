import pool from "../lib/db";
import { AttendeeClass } from "../lib/models/Attendee";
import { ResponseStatus } from "../lib/types";

export const getAttendeesByEventId = async (
  eventId: number,
): Promise<AttendeeClass[]> => {
  const { rows } = await pool.query(
    `SELECT attendees.id, attendees.name, attendees.email,
            event_attendees.response_status
     FROM attendees
     JOIN event_attendees
       ON attendees.id = event_attendees.attendee_id
     WHERE event_attendees.event_id = $1
     ORDER BY attendees.id ASC`,
    [eventId],
  );

  return rows.map(
    (attendee: {
      id: number;
      name: string;
      email: string;
      response_status: ResponseStatus;
    }) =>
      new AttendeeClass(
        attendee.id,
        attendee.name,
        attendee.email,
        attendee.response_status,
      ),
  );
};

export const addAttendee = async (
  eventId: number,
  name: string,
  email: string,
  responseStatus: string,
): Promise<AttendeeClass> => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const { rows } = await client.query(
      "INSERT INTO attendees (name, email) VALUES ($1, $2) RETURNING *",
      [name, email],
    );

    const attendee = rows[0];

    await client.query(
      `INSERT INTO event_attendees (event_id, attendee_id, response_status)
       VALUES ($1, $2, $3)`,
      [eventId, attendee.id, responseStatus],
    );

    await client.query("COMMIT");

    return new AttendeeClass(
      attendee.id,
      attendee.name,
      attendee.email,
      attendee.response_status,
    );
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
