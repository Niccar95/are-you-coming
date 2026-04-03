"use client";

import { Pencil, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import EditEventForm from "./EditEventForm";
import useClickOutside from "../hooks/useClickOutside";

interface EventActionsProps {
  id: number;
  eventName: string;
  eventDate: string;
  description: string;
  imageUrl: string | null;
  spotifyUrl: string | null;
  spotifyInviteUrl: string | null;
  redirect?: string;
}

const EventActions = ({
  id,
  eventName,
  eventDate,
  description,
  imageUrl,
  spotifyUrl,
  spotifyInviteUrl,
  redirect,
}: EventActionsProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const closeModal = useCallback(() => setConfirmDelete(false), []);
  const onClose = useCallback(() => setIsEditing(false), []);
  const modalRef = useClickOutside(confirmDelete, closeModal);

  const handleDelete = async () => {
    await fetch("/api/events", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (redirect) {
      router.push(redirect);
    } else {
      router.refresh();
    }
  };

  return (
    <>
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          onClick={() => setIsEditing(true)}
          className="btn-secondary py-1.5! px-2! md:py-1! md:px-1.5! bg-white! text-zinc-700! hover:bg-zinc-100!"
        >
          <Pencil size={16} className="md:w-3.5 md:h-3.5" />
        </button>
        <button
          onClick={() => setConfirmDelete(true)}
          className="btn-danger py-1.5! px-2! md:py-1! md:px-1.5!"
        >
          <Trash2 size={16} className="md:w-3.5 md:h-3.5" />
        </button>
      </div>

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div ref={modalRef} className="form-card w-full max-w-sm">
            <h3 className="form-heading">Delete Event</h3>
            <p className="text-body mb-6">
              Are you sure you want to delete this event? This cannot be undone.
            </p>
            <div className="flex justify-between md:justify-start gap-3">
              <button
                onClick={handleDelete}
                className="btn-danger flex items-center gap-2"
              >
                <Trash2 size={16} /> Delete
              </button>
              <button
                onClick={closeModal}
                className="btn-secondary flex items-center gap-2"
              >
                <X size={16} /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditing && (
        <EditEventForm
          id={id}
          initialName={eventName}
          initialDate={eventDate}
          initialDescription={description}
          initialImageUrl={imageUrl}
          initialSpotifyUrl={spotifyUrl}
          initialSpotifyInviteUrl={spotifyInviteUrl}
          onClose={onClose}
        />
      )}
    </>
  );
};

export default EventActions;
