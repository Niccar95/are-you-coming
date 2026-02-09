"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const EventForm = () => {
  const router = useRouter();
  const [eventName, setEventName] = useState<string>("");
  const [eventDate, setEventDate] = useState("");
  const [description, setDescription] = useState("");

  const [openEventForm, setOpenEventForm] = useState<boolean>(false);

  const toggleEventForm = () => {
    setOpenEventForm(!openEventForm);
  };

  const addNewEvent = async (e: FormEvent) => {
    e.preventDefault();
    if (!eventName || !eventDate) return;

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: eventName,
          event_date: eventDate,
          description: description,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add new event");
      }

      setEventName("");
      setEventDate("");
      setDescription("");
      router.refresh();
    } catch (error) {
      console.error("Error adding new event:", error);
    }
  };

  return (
    <>
      <button
        onClick={toggleEventForm}
        className="border border-violet-500 text-violet-600 font-semibold py-2 px-4 rounded-md hover:bg-violet-50 transition-colors cursor-pointer"
      >
        + New Event
      </button>

      <form
        onSubmit={addNewEvent}
        className={`flex flex-col gap-4 w-full max-w-2xl p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-lg transition-all duration-300 ${
          openEventForm ? "opacity-100 max-h-screen" : "opacity-0 max-h-0 overflow-hidden pointer-events-none"
        }`}
      >
          <h3 className="text-lg font-semibold text-zinc-800 dark:text-white mb-2">
            Create Event
          </h3>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Event Name
            </label>
            <input
              id="name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              type="text"
              placeholder="Enter event name"
              className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 dark:bg-zinc-800 dark:text-white"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="eventDate"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Event Date
            </label>
            <input
              id="eventDate"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              type="datetime-local"
              className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 dark:bg-zinc-800 dark:text-white"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter event description"
              rows={3}
              className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 dark:bg-zinc-800 dark:text-white resize-none"
            />
          </div>
          <button
            type="submit"
            className="bg-violet-500 hover:bg-violet-600 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200 mt-2 cursor-pointer"
          >
            Create Event
          </button>
      </form>
    </>
  );
};

export default EventForm;
