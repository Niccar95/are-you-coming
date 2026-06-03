"use client";
import { SendHorizonal } from "lucide-react";
import { useState } from "react";
import Spinner from "./Spinner";

interface MiniAssistantProps {
  isOpen: boolean;
  suggestion: (value: string) => void;
  fieldType: "name" | "description";
  placeholder?: string;
}

const MiniAssistant = ({ isOpen, suggestion, fieldType, placeholder }: MiniAssistantProps) => {
  const [userPrompt, setUserPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handlePrompt = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userPrompt, fieldType }),
      });

      if (!response.ok) throw new Error("Failed to get a response.");

      const data = await response.json();
      suggestion(data);
      setUserPrompt("");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="card p-3 flex flex-col gap-2 shadow-sm!">
      <label htmlFor="mini-prompt" className="form-label">
        Ask Aria for a suggestion
      </label>
      <div className="flex flex-col md:flex-row gap-2">
        <input
          id="mini-prompt"
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          type="text"
          placeholder={placeholder ?? "e.g. A name for a birthday party..."}
          className="form-input w-full"
        />
        <button
          type="button"
          onClick={handlePrompt}
          className="btn-primary flex items-center justify-center gap-2"
        >
          Send <SendHorizonal size={16} />
        </button>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      {loading && <Spinner />}
    </div>
  );
};

export default MiniAssistant;
