"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const AttendeeForm = () => {
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
    <form onSubmit={submitAttendance} className="flex flex-col gap-4 w-full max-w-md p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-lg">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Name
        </label>
        <input
          id="name"
          value={attendeeName}
          onChange={(e) => setAttendeeName(e.target.value)}
          type="text"
          placeholder="Enter your name"
          className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-white"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Email
        </label>
        <input
          id="email"
          value={attendeeEmail}
          onChange={(e) => setAttendeeEmail(e.target.value)}
          type="email"
          placeholder="your@email.com"
          className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-white"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200 mt-2"
      >
        I&apos;m in
      </button>
    </form>
  );
};

export default AttendeeForm;
