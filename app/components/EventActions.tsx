"use client";

import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import EditEventForm from "./EditEventForm";

interface EventActionsProps {
  id: number;
  eventName: string;
  eventDate: string;
  description: string;
  imageUrl: string | null;
}

const EventActions = ({
  id,
  eventName,
  eventDate,
  description,
  imageUrl,
}: EventActionsProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    await fetch("/api/events", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    router.refresh();
  };

  return (
    <>
      <div className="absolute top-2 right-2 flex gap-1">
        <button
          onClick={() => setIsEditing(true)}
          className="btn-secondary py-1! px-1.5! bg-white! text-zinc-700! hover:bg-zinc-100!"
        >
          <Pencil size={14} />
        </button>
        <button onClick={handleDelete} className="btn-danger py-1! px-1.5!">
          <Trash2 size={14} />
        </button>
      </div>

      {isEditing && (
        <EditEventForm
          id={id}
          initialName={eventName}
          initialDate={eventDate}
          initialDescription={description}
          initialImageUrl={imageUrl}
          onClose={() => setIsEditing(false)}
        />
      )}
    </>
  );
};

export default EventActions;
