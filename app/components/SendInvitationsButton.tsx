"use client";

import { useState } from "react";
import { AttendeeType, EventType } from "../lib/types";
import { Send } from "lucide-react";

interface ReminderProps {
  attendees: AttendeeType[];
  eventData: EventType;
}

const SendInvitationsButton = ({ attendees, eventData }: ReminderProps) => {
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");

  const sendInvitations = async () => {
    setSending(true);
    setMessage("");

    try {
      const response = await fetch("/api/invitations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attendees, eventData }),
      });

      if (!response.ok) throw new Error("Server error");

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
        onClick={sendInvitations}
        disabled={sending || !attendees}
        className="btn-primary flex items-center gap-2"
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
