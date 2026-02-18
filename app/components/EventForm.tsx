"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useRef, useState } from "react";
import { Plus, X, CalendarPlus, ImagePlus } from "lucide-react";
import { upload } from "@vercel/blob/client";
import useClickOutside from "../hooks/useClickOutside";

const EventForm = () => {
  const router = useRouter();
  const [eventName, setEventName] = useState<string>("");
  const [eventDate, setEventDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [openEventForm, setOpenEventForm] = useState<boolean>(false);
  const onClose = useCallback(() => setOpenEventForm(false), []);
  const formRef = useClickOutside(openEventForm, onClose);

  const inputFileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");

  const toggleEventForm = () => {
    setOpenEventForm(!openEventForm);
  };

  const addNewEvent = async (e: FormEvent) => {
    e.preventDefault();
    if (!eventName || !eventDate) return;

    let imageUrl: string | null = null;

    const file = inputFileRef.current?.files?.[0];
    if (file) {
      const newBlob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
      });
      imageUrl = newBlob.url;
    }

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: eventName,
          event_date: eventDate,
          description: description,
          image_url: imageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add new event");
      }

      setEventName("");
      setEventDate("");
      setDescription("");
      setFileName("");
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
        <h3 className="form-heading">Create Event</h3>
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="form-label">
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
          <span className="form-label">Event Image (Optional)</span>
          <label
            htmlFor="imageFile"
            className={`flex items-center gap-2 px-4 py-2 border border-dashed rounded-lg text-sm cursor-pointer transition-colors ${
              fileName
                ? "border-violet-400 text-violet-600"
                : "border-zinc-300 text-zinc-500 hover:border-violet-400 hover:text-violet-600"
            }`}
          >
            <ImagePlus size={16} />
            {fileName || "Choose image..."}
          </label>
          <input
            id="imageFile"
            name="file"
            ref={inputFileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="eventDate" className="form-label">
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
          <label htmlFor="description" className="form-label">
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
        <div className="flex justify-between lg:justify-start gap-3 mt-2">
          <button type="submit" className="btn-primary flex items-center gap-2 text-xs py-1.5 px-3 lg:py-3 lg:px-6 lg:text-base">
            <CalendarPlus size={16} />
            Create Event
          </button>
          <button
            type="button"
            onClick={() => setOpenEventForm(false)}
            className="btn-secondary flex items-center gap-2 text-xs py-1.5 px-3 lg:py-3 lg:px-6 lg:text-base"
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
