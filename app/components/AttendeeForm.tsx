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
    <form onSubmit={submitAttendance} className="flex flex-col gap-4 w-full p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-zinc-800 dark:text-white mb-2">Sign Up</h3>
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
          className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 dark:bg-zinc-800 dark:text-white"
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
          className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 dark:bg-zinc-800 dark:text-white"
          required
        />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          We&apos;ll send you a reminder before the party
        </p>
      </div>
      <button
        type="submit"
        className="bg-violet-500 hover:bg-violet-600 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200 mt-2 cursor-pointer"
      >
        I&apos;m in
      </button>
    </form>
  );
};

export default AttendeeForm;
