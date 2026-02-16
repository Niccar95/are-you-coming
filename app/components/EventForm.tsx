"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Plus, X, CalendarPlus } from "lucide-react";

const EventForm = () => {
  const router = useRouter();
  const [eventName, setEventName] = useState<string>("");
  const [eventDate, setEventDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [openEventForm, setOpenEventForm] = useState<boolean>(false);
  const formRef = useRef<HTMLDivElement>(null);

  const toggleEventForm = () => {
    setOpenEventForm(!openEventForm);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(e.target as Node)) {
        setOpenEventForm(false);
      }
    };

    if (openEventForm) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openEventForm]);

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
    <div
      ref={formRef}
      className="w-full max-w-2xl flex flex-col items-center gap-4"
    >
      <button
        onClick={toggleEventForm}
        className="btn-outline-violet flex items-center gap-2"
      >
        <Plus size={16} />
        New Event
      </button>

      <form
        onSubmit={addNewEvent}
        className={`form-card max-w-2xl transition-all duration-300 ${
          openEventForm
            ? "opacity-100 max-h-screen"
            : "opacity-0 max-h-0 overflow-hidden pointer-events-none"
        }`}
      >
        <h3 className="form-heading">
          Create Event
        </h3>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="form-label"
          >
            Event Name
          </label>
          <input
            id="name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            type="text"
            placeholder="Enter event name"
            className="form-input"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="eventDate"
            className="form-label"
          >
            Event Date
          </label>
          <input
            id="eventDate"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            type="datetime-local"
            className="form-input"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="description"
            className="form-label"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter event description"
            rows={3}
            className="form-textarea"
          />
        </div>
        <div className="flex gap-3 mt-2">
          <button
            type="submit"
            className="btn-primary flex items-center gap-2"
          >
            <CalendarPlus size={16} />
            Create Event
          </button>
          <button
            type="button"
            onClick={() => setOpenEventForm(false)}
            className="btn-secondary flex items-center gap-2"
          >
            <X size={16} />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
