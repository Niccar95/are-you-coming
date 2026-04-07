"use client";

import { FormEvent, useRef, useState } from "react";
import MiniAssistant from "./MiniAssistant";
import { useRouter } from "next/navigation";
import { X, Save, ImagePlus } from "lucide-react";
import Image from "next/image";
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
  initialSpotifyInviteUrl: string | null;
  onClose: () => void;
}

const EditEventForm = ({
  id,
  initialName,
  initialDate,
  initialDescription,
  initialImageUrl,
  initialSpotifyUrl,
  initialSpotifyInviteUrl,
  onClose,
}: EditEventFormProps) => {
  const router = useRouter();
  const [eventName, setEventName] = useState<string>(initialName);
  const [eventDate, setEventDate] = useState<string>(initialDate);
  const [description, setDescription] = useState<string>(initialDescription);
  const [spotifyUrl, setSpotifyUrl] = useState<string | null>(
    initialSpotifyUrl,
  );
  const [spotifyInviteUrl, setSpotifyInviteUrl] = useState<string | null>(
    initialSpotifyInviteUrl,
  );

  const [openNameAssistant, setOpenNameAssistant] = useState<boolean>(false);
  const [openDescriptionAssistant, setOpenDescriptionAssistant] = useState<boolean>(false);
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
    const spotifyFieldsMismatch =
      Boolean(spotifyUrl) !== Boolean(spotifyInviteUrl);
    if (spotifyFieldsMismatch) {
      setError(
        "Both Spotify fields are required. Please fill in the playlist URL and the collab invite URL.",
      );
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
          spotify_invite_url: spotifyInviteUrl,
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
      <div ref={modalRef} className="form-card w-full max-w-2xl max-h-[90vh]">
        <h3 className="form-heading">Edit Event</h3>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 p-3 overflow-y-auto"
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <label htmlFor="edit-name" className="form-label">
                  Event Name <span className="text-red-500">*</span>
                </label>
                <button type="button" onClick={() => setOpenNameAssistant(!openNameAssistant)} className="cursor-pointer shadow-even border border-violet-200 rounded-full">
                  <Image src="/AI-assistant.svg" alt="Aria AI" width={28} height={28} />
                </button>
              </div>
              <input
                id="edit-name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                type="text"
                placeholder="Enter event name"
                className="form-input"
              />
              <MiniAssistant isOpen={openNameAssistant} fieldType="name" suggestion={(value) => setEventName(value)} />
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
            <div className="flex items-center gap-2">
              <label htmlFor="edit-description" className="form-label">
                Description <span className="text-red-500">*</span>
              </label>
              <button type="button" onClick={() => setOpenDescriptionAssistant(!openDescriptionAssistant)} className="cursor-pointer shadow-even border border-violet-200 rounded-full">
                <Image src="/AI-assistant.svg" alt="Aria AI" width={28} height={28} />
              </button>
            </div>
            <textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter event description"
              rows={3}
              className="form-textarea"
            />
            <MiniAssistant isOpen={openDescriptionAssistant} fieldType="description" suggestion={(value) => setDescription(value)} placeholder="e.g. A description for a birthday party..." />
          </div>

          <div className="flex flex-col gap-4 border border-zinc-200 rounded-lg p-4">
            <div>
              <p className="form-label mb-1">Spotify (Optional)</p>
              <p className="text-xs text-zinc-400">
                Add a collaborative playlist so attendees can listen and
                contribute songs. Both fields are required.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="spotifyUrl" className="form-label">
                Playlist URL
              </label>
              <p className="text-xs text-zinc-400">
                Copy the playlist URL from Spotify. A playlist widget will be
                embedded on the event page.
              </p>
              <input
                id="spotifyUrl"
                value={spotifyUrl ?? ""}
                onChange={(e) => setSpotifyUrl(e.target.value)}
                type="text"
                placeholder="https://open.spotify.com/playlist/..."
                className="form-input"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="spotifyInviteUrl" className="form-label">
                Collab Invite URL
              </label>
              <p className="text-xs text-zinc-400">
                Get this link from Spotify by selecting Invite Collaborators on
                your playlist. A QR code and link will appear so attendees can
                join as collaborators and add songs.
              </p>
              <input
                id="spotifyInviteUrl"
                value={spotifyInviteUrl ?? ""}
                onChange={(e) => setSpotifyInviteUrl(e.target.value)}
                type="text"
                placeholder="https://open.spotify.com/invite/..."
                className="form-input"
              />
            </div>
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <div className="flex justify-between md:justify-start gap-3 mt-2">
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
