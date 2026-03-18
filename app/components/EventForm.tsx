"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useRef, useState } from "react";
import { Plus, X, CalendarPlus, ImagePlus, CheckCircle } from "lucide-react";
import { upload } from "@vercel/blob/client";
import useClickOutside from "../hooks/useClickOutside";
import Spinner from "./Spinner";

const EventForm = () => {
  const router = useRouter();
  const [eventName, setEventName] = useState<string>("");
  const [eventDate, setEventDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [spotifyUrl, setSpotifyUrl] = useState<string>("");
  const [spotifyInviteUrl, setSpotifyInviteUrl] = useState<string>("");
  const [openEventForm, setOpenEventForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const onClose = useCallback(() => setOpenEventForm(false), []);
  const formRef = useClickOutside(openEventForm, onClose);

  const inputFileRef = useRef<HTMLInputElement>(null);

  const toggleEventForm = () => {
    setOpenEventForm(!openEventForm);
  };

  const addNewEvent = async (e: FormEvent) => {
    e.preventDefault();
    if (!eventName || !eventDate || !description) {
      setError("Please fill in all required fields.");
      return;
    }
    if (new Date(eventDate) <= new Date()) {
      setError("Event date must be in the future.");
      return;
    }
    setError("");

    let imageUrl: string | null = null;

    setLoading(true);

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
          spotify_url: spotifyUrl,
          spotify_invite_url: spotifyInviteUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add new event");
      }

      setEventName("");
      setEventDate("");
      setDescription("");
      setSpotifyUrl("");
      setSpotifyInviteUrl("");
      setFileName("");
      setSuccess(true);
      setOpenEventForm(false);
      router.refresh();
      setTimeout(() => setSuccess(false), 4000);
    } catch (error) {
      console.error("Error adding new event:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl flex flex-col items-center gap-4">
      {loading && <Spinner />}
      <button
        onClick={toggleEventForm}
        className="btn-outline-violet flex items-center gap-2"
      >
        <Plus size={16} />
        New Event
      </button>
      {success && (
        <p className="flex items-center gap-2 text-sm text-violet-600">
          <CheckCircle size={16} />
          Event created successfully!
        </p>
      )}

      {openEventForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div
            ref={formRef}
            className="form-card w-full max-w-2xl max-h-[90vh]"
          >
            <h3 className="form-heading">Create Event</h3>
            <form
              onSubmit={addNewEvent}
              className="flex flex-col gap-4 overflow-y-auto"
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="form-label">
                  Event Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  type="text"
                  placeholder="Enter event name"
                  className="form-input"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="eventDate" className="form-label">
                  Event Date <span className="text-red-500">*</span>
                </label>
                <input
                  id="eventDate"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  type="datetime-local"
                  className="form-input"
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
                <label htmlFor="description" className="form-label">
                  Description <span className="text-red-500">*</span>
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

              <div className="flex flex-col gap-2">
                <label htmlFor="spotifyUrl" className="form-label">
                  Spotify Playlist (Optional)
                </label>
                <p className="text-xs text-zinc-400">
                  Embeds the playlist so attendees can listen.
                </p>
                <input
                  id="spotifyUrl"
                  value={spotifyUrl}
                  onChange={(e) => setSpotifyUrl(e.target.value)}
                  type="text"
                  placeholder="https://open.spotify.com/playlist/..."
                  className="form-input"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="spotifyInviteUrl" className="form-label">
                  Spotify Collab Invite (Optional)
                </label>
                <p className="text-xs text-zinc-400">
                  Lets attendees add songs as collaborators.
                </p>
                <input
                  id="spotifyInviteUrl"
                  value={spotifyInviteUrl}
                  onChange={(e) => setSpotifyInviteUrl(e.target.value)}
                  type="text"
                  placeholder="https://open.spotify.com/invite/..."
                  className="form-input"
                />
              </div>

              {error && <p className="text-xs text-red-500">{error}</p>}
              <div className="flex justify-between lg:justify-start gap-3 mt-2">
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
        </div>
      )}
    </div>
  );
};

export default EventForm;
