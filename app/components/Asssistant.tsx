"use client";

import { FormEvent, useState } from "react";
import { SendHorizonal } from "lucide-react";
import Image from "next/image";
import Spinner from "./Spinner";

const Asssistant = () => {
  const [userPrompt, setUserPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [visiblePrompts, setVisiblePrompts] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);

  const handlePrompt = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setVisiblePrompts((prev) => [
      ...prev,
      { role: "user", content: userPrompt },
    ]);

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

      setUserPrompt("");
      setVisiblePrompts((prev) => [
        ...prev,
        { role: "assistant", content: data },
      ]);
    } catch (error) {
      console.error("Error prompting AI assistant:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card flex flex-col h-[400px] md:w-[400px] pt-0!">
      <div className="w-full h-fit p-1 flex items-center gap-2">
        <Image
          src="/AI-assistant.svg"
          alt="AI Assistant"
          width={40}
          height={40}
        />
        <span className="font-semibold text-zinc-800">Aria AI</span>

        {loading && <Spinner />}
      </div>

      <div className="flex flex-col h-full rounded-t-lg border-[0.5px] border-zinc-200 bg-zinc-50 p-3 gap-2 overflow-auto">
        {visiblePrompts.map((visiblePrompt, i) => (
          <article
            key={i}
            className={`text-sm text-zinc-700 ${visiblePrompt.role === "user" ? "bg-violet-100 self-start" : "bg-zinc-100 self-end"} rounded-lg p-3`}
          >
            {visiblePrompt.content}
          </article>
        ))}
      </div>

      <form onSubmit={handlePrompt} className="form-card rounded-t-none!">
        <input
          type="text"
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          placeholder="What do you need help with?"
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
