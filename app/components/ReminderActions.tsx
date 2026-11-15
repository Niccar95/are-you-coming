"use client";

import { useCallback, useState } from "react";
import { AttendeeType, EventType } from "../lib/types";
import { Check, CheckCircle, ListChecks, Pencil, Send, X } from "lucide-react";
import useClickOutside from "../hooks/useClickOutside";
import { EmailPreview } from "./EmailPreview";
import Link from "next/link";
import { escapeHtml } from "../utils/escapeHtml";

interface ReminderProps {
  attendees: AttendeeType[];
  eventData: EventType;
}

const ReminderActions = ({ attendees, eventData }: ReminderProps) => {
  const [sending, setSending] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const onClose = useCallback(() => setIsEditing(false), []);
  const modalRef = useClickOutside(true, onClose);
  const [isEditingNote, setIsEditingNote] = useState<boolean>(false);
  const [customHeading, setCustomHeading] = useState<string>("Event reminder!");
  const [customNote, setCustomNote] = useState<string>("");

  const formattedDate = new Date(eventData.eventDate).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  const emailMessage = `<div style="border-left: 4px solid #8b5cf6; padding-left: 16px; margin-bottom: 24px;">
<h1 style="margin: 0; font-family: 'Plus Jakarta Sans', Arial, sans-serif; font-size: 24px; line-height: 1.3; font-weight: bold; color: #3f3f46; letter-spacing: 0.025em;">${escapeHtml(customHeading || "Event reminder!")}</h1>
</div>
Here's a reminder that you have been invited to the following event:<br><br>
<b>${escapeHtml(eventData.name)}</b><br><br>
${escapeHtml(eventData.description)}<br><br>
${customNote ? `<b>Extra notes:</b><br><br><div style="white-space: pre-wrap; overflow-wrap: break-word;">${escapeHtml(customNote)}</div><br><br>` : ""}
<b>Location and date</b><br><br>
${escapeHtml(eventData.eventLocation)}<br>
${formattedDate}<br><br>
<i><b>Best regards,</b><br>${escapeHtml(eventData.hostName)}</i>`;

  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://are-you-coming.vercel.app";

  const eventLink = `${baseUrl}/events/${eventData.id}`;

  const sendReminders = async () => {
    setMessage("");
    setSending(true);

    try {
      const response = await fetch("/api/invitations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attendees, eventData, emailMessage }),
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
        className="btn-primary flex items-center gap-2 self-start"
      >
        <ListChecks size={16} /> Manage reminders
      </button>

      {isEditing && (
        <div className="modal-overlay">
          <div ref={modalRef} className="card modal flex flex-col">
            <h3 className="text-subtitle mb-4">Manage reminders</h3>
            <div className="flex flex-col gap-6 overflow-y-auto ">
              <div className="flex flex-col gap-4 mb-6">
                <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Attendee list
                </h4>
                {attendees.length > 0 ? (
                  attendees.map((attendee) => (
                    <div
                      key={attendee.id}
                      className="flex justify-between items-center py-2 border-b border-zinc-200 dark:border-zinc-700"
                    >
                      <p className="text-body font-medium">{attendee.name}</p>
                      <p className="text-meta">{attendee.email}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-subtle">No Attendees</p>
                )}
              </div>

              <div className="flex flex-col gap-4 mb-6">
                <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Email Preview
                </h4>

                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6 shadow-even">
                  <div className="flex justify-between items-start">
                    {!isEditingNote ? (
                      <div className="border-l-4 border-violet-500 pl-3 mb-6">
                        <h1 className="text-xl font-bold text-zinc-700 dark:text-white tracking-wide wrap-break-word">
                          {customHeading || "Event reminder!"}
                        </h1>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2 mb-6">
                        <input
                          type="text"
                          placeholder="Add a personal title..."
                          value={customHeading}
                          onChange={(e) => setCustomHeading(e.target.value)}
                          className="form-input"
                        />
                        <p className="text-xs text-zinc-400">
                          This will be the title at the top of your reminder
                          email.
                        </p>
                      </div>
                    )}
                    {isEditingNote ? (
                      <button
                        onClick={() => setIsEditingNote(false)}
                        className="btn-primary py-1.5! px-2! md:py-1! md:px-1.5!"
                      >
                        <Check size={16} className="md:w-3.5 md:h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => setIsEditingNote(true)}
                        className="btn-secondary py-1.5! px-2! md:py-1! md:px-1.5! bg-white! text-zinc-700! hover:bg-zinc-100!"
                      >
                        <Pencil size={16} className="md:w-3.5 md:h-3.5" />
                      </button>
                    )}
                  </div>

                  <EmailPreview
                    eventData={eventData}
                    isEditingNote={isEditingNote}
                    note={{ value: customNote, onChange: setCustomNote }}
                  />

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
                  className={`flex items-center gap-2 text-sm text-violet-600 ${
                    message.includes("Successfully")
                      ? "text-green-600"
                      : "text-xs text-red-500"
                  }`}
                >
                  {message.includes("Successfully") && (
                    <CheckCircle size={16} />
                  )}
                  {message}
                </p>
              )}

              {attendees.length === 0 && (
                <p className="text-subtle">
                  Add at least one attendee to send reminders.
                </p>
              )}
              <div className="flex gap-3">
                <button
                  onClick={sendReminders}
                  disabled={sending || attendees.length === 0}
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
        </div>
      )}
    </>
  );
};

export default ReminderActions;
