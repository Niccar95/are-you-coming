"use client";

import { FormEvent, useState } from "react";
import { SendHorizonal } from "lucide-react";
import Spinner from "./Spinner";

const Asssistant = () => {
  const [userPrompt, setUserPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [assistantResponse, setAssistantResponse] = useState<string>("");

  const [visiblePrompt, setVisiblePrompt] = useState<string>("");

  const handlePrompt = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userPrompt: userPrompt,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get a response.");
      }

      const data = await response.json();

      setAssistantResponse(data);
      setUserPrompt("");
      setVisiblePrompt(userPrompt);
    } catch (error) {
      console.error("Error prompting AI assistant:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card flex flex-col justify-between h-[400px] w-[400px]">
      {loading && <Spinner />}
      <div className="self-end text-sm text-zinc-700 bg-zinc-100 rounded-lg p-3 w-[250px]">
        {assistantResponse}
      </div>

      <div className="text-sm text-zinc-700 bg-zinc-50 rounded-lg p-3">
        {visiblePrompt}
      </div>

      <form onSubmit={handlePrompt} className="form-card">
        <input
          type="text"
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          className="form-input"
        ></input>
        <button
          type="submit"
          className="btn-primary flex items-center justify-center gap-2"
        >
          Send <SendHorizonal size={16} />
        </button>
      </form>
    </div>
  );
};

export default Asssistant;
