"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { UserPlus } from "lucide-react";

const AttendeeForm = ({ eventId }: { eventId: number }) => {
  const router = useRouter();
  const [attendeeName, setAttendeeName] = useState<string>("");
  const [attendeeEmail, setAttendeeEmail] = useState<string>("");

  const submitAttendance = async (e: FormEvent) => {
    e.preventDefault();
    if (!attendeeName || !attendeeEmail) return;

    try {
      const response = await fetch("/api/attendees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_id: eventId,
          name: attendeeName,
          email: attendeeEmail,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit attendee");
      }

      setAttendeeName("");
      setAttendeeEmail("");
      router.refresh();
    } catch (error) {
      console.error("Error submitting attendee:", error);
    }
  };

  return (
    <form onSubmit={submitAttendance} className="form-card">
      <h3 className="form-heading">Sign Up</h3>
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          id="name"
          value={attendeeName}
          onChange={(e) => setAttendeeName(e.target.value)}
          type="text"
          placeholder="Enter your name"
          className="form-input"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          id="email"
          value={attendeeEmail}
          onChange={(e) => setAttendeeEmail(e.target.value)}
          type="email"
          placeholder="your@email.com"
          className="form-input"
          required
        />
        <p className="text-subtle">
          We&apos;ll send you a reminder before the party
        </p>
      </div>
      <button
        type="submit"
        className="btn-primary mt-2 flex items-center gap-2 self-start"
      >
        <UserPlus size={16} />
        I&apos;m in
      </button>
    </form>
  );
};

export default AttendeeForm;
