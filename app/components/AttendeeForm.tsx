"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserPlus, CheckCircle, Send } from "lucide-react";
import Spinner from "./Spinner";

interface EventFormProps {
  eventId: number;
}

const AttendeeForm = ({ eventId }: EventFormProps) => {
  const router = useRouter();
  const [attendeeName, setAttendeeName] = useState<string>("");
  const [attendeeEmail, setAttendeeEmail] = useState<string>("");
  const [attendeeStatus, setAttendeeStatus] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const submitAttendance = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!attendeeName || !attendeeEmail!) {
      setError("Please fill in all required fields.");
      return;
    }
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
          response_status: attendeeStatus,
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
      <div className="card md:w-1/2 mt-8 flex flex-col items-center gap-3 text-center">
        <h3 className="text-title flex items-center justify-center gap-2">
          Response submitted!{" "}
          <CheckCircle size={20} className="text-violet-500" />
        </h3>
        <p className="text-subtle">Your response has been saved.</p>
      </div>
    );
  }

  return (
    <div className="form-card mt-8">
      <form onSubmit={submitAttendance} className="flex flex-col gap-4 p-3 ">
        {loading && <Spinner />}
        <h3 className="form-heading">Are you coming?</h3>
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
        </div>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 form-label cursor-pointer">
            <input
              type="radio"
              name="response"
              value="coming"
              checked={attendeeStatus === "coming"}
              onChange={() => setAttendeeStatus("coming")}
            />
            Coming
          </label>
          <label className="flex items-center gap-2 form-label cursor-pointer">
            <input
              type="radio"
              name="response"
              value="unsure"
              checked={attendeeStatus === "unsure"}
              onChange={() => setAttendeeStatus("unsure")}
            />
            Unsure
          </label>
          <label className="flex items-center gap-2 form-label cursor-pointer">
            <input
              type="radio"
              name="response"
              value="skipping"
              checked={attendeeStatus === "skipping"}
              onChange={() => setAttendeeStatus("skipping")}
            />
            Skipping
          </label>
        </div>
        <p className="text-subtle">
          If you&apos;re coming, we&apos;ll send you a reminder before the
          event.
        </p>
        {error && <p className="text-xs text-red-500">{error}</p>}
        <button
          type="submit"
          className="btn-primary mt-2 flex items-center gap-2 self-start"
        >
          <Send size={16} />
          Submit
        </button>
      </form>
    </div>
  );
};

export default AttendeeForm;
