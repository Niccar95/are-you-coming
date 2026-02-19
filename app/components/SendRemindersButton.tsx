"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import emailjs from "@emailjs/browser";

const SendRemindersButton = () => {
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const adminKey = searchParams.get("admin");
    if (adminKey === "nico123") {
      setIsAdmin(true);
    }
  }, [searchParams]);

  const sendReminders = async () => {
    setSending(true);
    setMessage("");

    try {
      const response = await fetch("/api/attendees");
      const attendees = await response.json();

      for (const attendee of attendees) {
        await emailjs.send(
          "service_6vz097q",
          "template_kgecsxe",
          {
            to_email: attendee.email,
          },
          "_TeZKUhH8wHVx8a5J"
        );
        console.log(`Sent to ${attendee.email}`);
      }

      setMessage(`Successfully sent ${attendees.length} reminders!`);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to send reminders");
    } finally {
      setSending(false);
    }
  };

  if (!isAdmin) return null;

  return (
    <aside className="fixed bottom-4 right-4">
      <button
        onClick={sendReminders}
        disabled={sending}
        className="bg-violet-500 hover:bg-violet-600 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg shadow-lg cursor-pointer"
      >
        {sending ? "Sending..." : "Send Reminders"}
      </button>
      {message && (
        <p className="mt-2 text-sm text-white bg-black/70 px-3 py-1 rounded">
          {message}
        </p>
      )}
    </aside>
  );
};

export default SendRemindersButton;
