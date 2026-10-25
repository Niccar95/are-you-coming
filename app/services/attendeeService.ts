import { createHash } from "node:crypto";
import pool from "../lib/db";
import { AttendeeClass } from "../lib/models/Attendee";
import { AttendeeType, ResponseStatus } from "../lib/types";

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

export const getAttendeeResponse = async (
  eventId: number,
  token: string,
): Promise<AttendeeType | null> => {
  const tokenHash = createHash("sha256").update(token).digest("hex");

  const { rows } = await pool.query(
    `SELECT
       attendees.id,
       attendees.name,
       attendees.email,
       event_attendees.response_status
     FROM event_attendees
     JOIN attendees
       ON attendees.id = event_attendees.attendee_id
     WHERE event_attendees.event_id = $1
       AND event_attendees.response_token = $2`,
    [eventId, tokenHash],
  );

  return rows[0] ?? null;
};

export const updateAttendeeResponse = async (
  eventId: number,
  token: string,
  responseStatus: string,
): Promise<boolean> => {
  const tokenHash = createHash("sha256").update(token).digest("hex");

  const { rowCount } = await pool.query(
    `UPDATE event_attendees
     SET response_status = $1
     WHERE event_id = $2
       AND response_token = $3`,
    [responseStatus, eventId, tokenHash],
  );

  return rowCount === 1;
};

export const addAttendee = async (
  eventId: number,
  name: string,
  email: string,
  responseStatus: ResponseStatus,
  responseTokenHash: string,
  sendConfirmation: (attendee: AttendeeClass) => Promise<void>,
): Promise<AttendeeClass> => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const { rows } = await client.query(
      `INSERT INTO attendees (name, email)
       VALUES ($1, $2)
       ON CONFLICT (email)
       DO UPDATE SET name = EXCLUDED.name
       RETURNING *`,
      [name, email],
    );

    const attendee = rows[0];

    await client.query(
      `INSERT INTO event_attendees
         (event_id, attendee_id, response_status, response_token)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (event_id, attendee_id)
       DO UPDATE SET
         response_status = EXCLUDED.response_status,
         response_token = EXCLUDED.response_token`,
      [eventId, attendee.id, responseStatus, responseTokenHash],
    );

    const result = new AttendeeClass(
      attendee.id,
      attendee.name,
      attendee.email,
      responseStatus,
    );

    await sendConfirmation(result);

    await client.query("COMMIT");

    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
