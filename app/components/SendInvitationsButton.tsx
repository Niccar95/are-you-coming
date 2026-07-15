"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Attendee } from "../lib/types";
import { Send } from "lucide-react";

interface ReminderProps {
  attendees: Attendee[];
}

const SendInvitationsButton = ({ attendees }: ReminderProps) => {
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");

  const sendReminders = async () => {
    setSending(true);
    setMessage("");

    try {
      for (const attendee of attendees) {
        await emailjs.send(
          "service_6vz097q",
          "template_kgecsxe",
          {
            to_email: attendee.email,
          },
          "_TeZKUhH8wHVx8a5J",
        );
        console.log(`Sent to ${attendee.email}`);
      }

      setMessage(
        `Successfully sent ${attendees.length} ${attendees.length > 1 ? "invitations" : "invitation"}`,
      );
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to send reminders");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <button
        onClick={sendReminders}
        disabled={sending || !attendees}
        className="btn-primary flex items-center gap-2 self-start"
      >
        <Send size={16} /> {sending ? "Sending..." : "Send Invitations"}
      </button>
      {message && (
        <p className="text-sm text-white bg-black/70 p-2 rounded">{message}</p>
      )}
    </>
  );
};

export default SendInvitationsButton;
