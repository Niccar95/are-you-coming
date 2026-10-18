import pool from "../lib/db";
import { AttendeeClass } from "../lib/models/Attendee";
import { InviteStatus } from "../lib/types";

export const getAttendeesByEventId = async (
  eventId: number,
): Promise<AttendeeClass[]> => {
  const { rows } = await pool.query(
    `SELECT attendees.id, attendees.name, attendees.email,
            event_attendees.invite_status
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
      invite_status: InviteStatus;
    }) =>
      new AttendeeClass(
        attendee.id,
        attendee.name,
        attendee.email,
        attendee.invite_status,
      ),
  );
};

export const addAttendee = async (
  eventId: number,
  name: string,
  email: string,
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
      `INSERT INTO event_attendees (event_id, attendee_id, invite_status)
       VALUES ($1, $2, $3)`,
      [eventId, attendee.id, "accepted"],
    );

    await client.query("COMMIT");

    return new AttendeeClass(
      attendee.id,
      attendee.name,
      attendee.email,
      "accepted",
    );
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
