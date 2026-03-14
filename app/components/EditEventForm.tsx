"use client";

import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { X, Save, ImagePlus } from "lucide-react";
import { upload } from "@vercel/blob/client";
import useClickOutside from "../hooks/useClickOutside";
import Spinner from "./Spinner";

interface EditEventFormProps {
  id: number;
  initialName: string;
  initialDate: string;
  initialDescription: string;
  initialImageUrl: string | null;
  initialSpotifyUrl: string | null;
  onClose: () => void;
}

const EditEventForm = ({
  id,
  initialName,
  initialDate,
  initialDescription,
  initialImageUrl,
  initialSpotifyUrl,
  onClose,
}: EditEventFormProps) => {
  const router = useRouter();
  const [eventName, setEventName] = useState<string>(initialName);
  const [eventDate, setEventDate] = useState<string>(initialDate);
  const [description, setDescription] = useState<string>(initialDescription);
  const [spotifyUrl, setSpotifyUrl] = useState<string | null>(
    initialSpotifyUrl,
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState<string>("");

  const inputFileRef = useRef<HTMLInputElement>(null);
  const modalRef = useClickOutside(true, onClose);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!eventName || !eventDate || !description) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    setLoading(true);

    let imageUrl: string | null = initialImageUrl;

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
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          name: eventName,
          event_date: eventDate,
          description: description,
          image_url: imageUrl,
          spotify_url: spotifyUrl,
        }),
      });

      if (!response.ok) throw new Error("Failed to update event");

      router.refresh();
      onClose();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      {loading && <Spinner />}
      <div ref={modalRef} className="form-card w-full max-w-2xl">
        <h3 className="form-heading">Edit Event</h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="edit-name" className="form-label">
              Event Name <span className="text-red-500">*</span>
            </label>
            <input
              id="edit-name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              type="text"
              placeholder="Enter event name"
              className="form-input"
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="form-label">Event Image (Optional)</span>
            <label
              htmlFor="edit-imageFile"
              className={`flex items-center gap-2 px-4 py-2 border border-dashed rounded-lg text-sm cursor-pointer transition-colors ${
                fileName
                  ? "border-violet-400 text-violet-600"
                  : "border-zinc-300 text-zinc-500 hover:border-violet-400 hover:text-violet-600"
              }`}
            >
              <ImagePlus size={16} />
              {fileName ||
                (initialImageUrl ? "Change image..." : "Choose image...")}
            </label>
            <input
              id="edit-imageFile"
              name="file"
              ref={inputFileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="edit-eventDate" className="form-label">
              Event Date <span className="text-red-500">*</span>
            </label>
            <input
              id="edit-eventDate"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              type="datetime-local"
              className="form-input"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="edit-description" className="form-label">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter event description"
              rows={3}
              className="form-textarea"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="spotifyUrl" className="form-label">
              Spotify Playlist URL (Optional)
            </label>
            <input
              id="spotifyUrl"
              value={spotifyUrl ?? ""}
              onChange={(e) => setSpotifyUrl(e.target.value)}
              type="text"
              placeholder="Enter Spotify playlist URL"
              className="form-input"
            />
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <div className="flex justify-between lg:justify-start gap-3 mt-2">
            <button
              type="submit"
              className="btn-primary flex items-center gap-2"
            >
              <Save size={16} />
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex items-center gap-2"
            >
              <X size={16} />
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventForm;
