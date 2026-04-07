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

  const handlePrompt = async () => {
    setLoading(true);

    try {
      const response = await fetch("api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userPrompt, fieldType }),
      });

      if (!response.ok) throw new Error("Failed to get a response.");

      const data = await response.json();
      suggestion(data);
      setUserPrompt("");
    } catch (error) {
      console.error("Error prompting AI assistant:", error);
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
          className="form-input"
        />
        <button
          type="button"
          onClick={handlePrompt}
          className="btn-primary flex items-center justify-center gap-2"
        >
          Send <SendHorizonal size={16} />
        </button>
      </div>
      {loading && <Spinner />}
    </div>
  );
};

export default MiniAssistant;
