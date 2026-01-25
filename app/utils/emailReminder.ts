import emailjs from "@emailjs/nodejs";
import pool from "../lib/db";
import { Attendee } from "../lib/models/Attendee";

export const sendReminders = async () => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM attendees ORDER BY id ASC",
    );
    const attendees = rows.map(
      (attendee: Attendee) =>
        new Attendee(attendee.id, attendee.name, attendee.email),
    );

    console.log(`Found ${attendees.length} attendees to send reminders to`);

    for (const attendee of attendees) {
      try {
        const response = await emailjs.send(
          "service_6vz097q",
          "template_kgecsxe",
          {
            to_email: attendee.email,
          },
          {
            publicKey: "_TeZKUhH8wHVx8a5J",
          },
        );
        console.log(`✓ Reminder sent to ${attendee.email}`, response);
      } catch (emailError) {
        console.error(`✗ Failed to send to ${attendee.email}:`, emailError);
      }
    }

    console.log("All reminders sent successfully!");
  } catch (err) {
    console.error("ERROR in sendReminders:", err);
    throw err;
  }
};
