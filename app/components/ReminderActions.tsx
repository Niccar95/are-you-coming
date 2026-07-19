"use client";

import { useCallback, useState } from "react";
import { AttendeeType, EventType } from "../lib/types";
import { CheckCircle, ListChecks, Send, X } from "lucide-react";
import useClickOutside from "../hooks/useClickOutside";
import { EmailPreview } from "./EmailPreview";
import Link from "next/link";

interface ReminderProps {
  attendees: AttendeeType[];
  eventData: EventType;
}

const ReminderActions = ({ attendees, eventData }: ReminderProps) => {
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");
  const onClose = useCallback(() => setIsEditing(false), []);
  const modalRef = useClickOutside(true, onClose);
  const [isEditing, setIsEditing] = useState(false);

  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://are-you-coming.vercel.app";

  const eventLink = `${baseUrl}/events/${eventData.id}`;

  const sendReminders = async () => {
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
        `Successfully sent ${attendees.length} ${attendees.length > 1 ? "reminders" : "reminder"}`,
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
        onClick={() => setIsEditing(!isEditing)}
        className="btn-primary flex items-center gap-2"
      >
        <ListChecks size={16} /> Manage reminders
      </button>

      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div
            ref={modalRef}
            className="card w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-subtitle mb-4">Manage reminders</h3>
            <div className="mb-6">
              {attendees.map((attendee) => (
                <div
                  key={attendee.id}
                  className="flex justify-between items-center py-2 border-b border-zinc-200 dark:border-zinc-700"
                >
                  <p className="text-body font-medium">{attendee.name}</p>
                  <p className="text-meta">{attendee.email}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 mb-6">
              <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Email Preview
              </h4>

              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6 shadow-even">
                <div className="border-l-4 border-violet-500 pl-3 mb-6">
                  <h1 className="text-xl font-bold text-zinc-700 dark:text-white tracking-wide">
                    Event reminder!
                  </h1>
                </div>

                <EmailPreview eventData={eventData} />

                <div className="pt-6 border-t border-zinc-200 dark:border-zinc-700">
                  <p className="text-meta mb-2">For more info, visit:</p>
                  <Link
                    href={eventLink}
                    className="text-violet-600 font-semibold hover:underline"
                  >
                    Are You Coming
                  </Link>
                </div>
              </div>
            </div>
            {message && (
              <p
                className={`flex items-center gap-2 text-sm mb-4 ${
                  message.includes("Successfully")
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-500 dark:text-red-400"
                }`}
              >
                {message.includes("Successfully") && <CheckCircle size={16} />}
                {message}
              </p>
            )}
            <div className="flex gap-3">
              <button
                onClick={sendReminders}
                disabled={sending || !attendees.length}
                className="btn-primary flex items-center gap-2"
              >
                <Send size={16} /> {sending ? "Sending..." : "Send"}
              </button>
              <button
                onClick={onClose}
                className="btn-secondary flex items-center gap-2"
              >
                <X size={16} /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReminderActions;
