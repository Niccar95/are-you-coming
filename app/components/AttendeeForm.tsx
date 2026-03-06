"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { UserPlus, CheckCircle } from "lucide-react";
import Spinner from "./Spinner";

const AttendeeForm = ({ eventId }: { eventId: number }) => {
  const router = useRouter();
  const [attendeeName, setAttendeeName] = useState<string>("");
  const [attendeeEmail, setAttendeeEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const submitAttendance = async (e: FormEvent) => {
    e.preventDefault();
    if (!attendeeName || !attendeeEmail) { setError("Please fill in all required fields."); return; }
    setError("");
    setLoading(true);

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

      setSubmitted(true);
      router.refresh();
    } catch (error) {
      console.error("Error submitting attendee:", error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="form-card flex flex-col items-center gap-3 text-center">
        <h3 className="form-heading flex items-center justify-center gap-2">
          You&apos;re in! <CheckCircle size={20} className="text-violet-500" />
        </h3>
        <p className="text-subtle">We&apos;ll send you a reminder before the event.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submitAttendance} className="form-card">
      {loading && <Spinner />}
      <h3 className="form-heading">Sign Up</h3>
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="form-label">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          value={attendeeName}
          onChange={(e) => setAttendeeName(e.target.value)}
          type="text"
          placeholder="Enter your name"
          className="form-input"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="form-label">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          value={attendeeEmail}
          onChange={(e) => setAttendeeEmail(e.target.value)}
          type="email"
          placeholder="your@email.com"
          className="form-input"
        />
        <p className="text-subtle">
          We&apos;ll send you a reminder before the party
        </p>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
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
