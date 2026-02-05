import pool from "../lib/db";
import { Attendee } from "../lib/models/Attendee";

export const getAttendees = async (): Promise<Attendee[]> => {
  const { rows } = await pool.query("SELECT * FROM attendees ORDER BY id ASC");
  return rows.map(
    (attendee: Attendee) =>
      new Attendee(attendee.id, attendee.name, attendee.email),
  );
};
