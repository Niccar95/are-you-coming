"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
  id: number;
}

const DeleteButton = ({ id }: DeleteButtonProps) => {
  const router = useRouter();

  const handleDelete = async () => {
    await fetch("/api/events", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    router.refresh();
  };

  return (
    <button onClick={handleDelete} className="btn-danger absolute top-2 right-2">
      <X size={16} />
    </button>
  );
};

export default DeleteButton;
