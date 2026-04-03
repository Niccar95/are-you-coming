"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { SendHorizonal, X } from "lucide-react";
import Image from "next/image";

const Assistant = () => {
  const [userPrompt, setUserPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [openChat, setOpenChat] = useState<boolean>(false);
  const [visiblePrompts, setVisiblePrompts] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ScrollDown();
  }, [visiblePrompts]);

  const ScrollDown = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollTo({
        top: bottomRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

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

      ScrollDown();
    } catch (error) {
      console.error("Error prompting AI assistant:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleChat = () => {
    setOpenChat(!openChat);
  };

  return (
    <>
      <div
        onClick={toggleChat}
        className="shadow-even border bg-white fixed right-4 bottom-4 md:right-10 md:bottom-10 border-violet-200 rounded-full cursor-pointer"
      >
        <Image
          src="/AI-assistant.svg"
          alt="AI Assistant"
          width={70}
          height={70}
        />
      </div>

      {openChat && (
        <div className="card flex flex-col fixed h-fit w-[90%] left-1/2 -translate-x-1/2 bottom-25 md:bottom-30 md:right-10 md:translate-x-0 md:left-auto md:w-[400px] pt-0!">
          <div className="w-full h-fit px-0 py-6 flex items-center gap-2">
            <Image
              src="/AI-assistant.svg"
              alt="AI Assistant"
              width={30}
              height={30}
            />
            <span className="font-semibold text-zinc-800">Aria AI</span>
            <button
              onClick={toggleChat}
              className="ml-auto text-zinc-700 cursor-pointer border border-zinc-300 rounded-md p-1 hover:bg-zinc-50 transition-colors duration-200"
            >
              <X size={16} />
            </button>
          </div>

          <div
            ref={bottomRef}
            className="flex flex-col h-[200px] rounded-t-lg border-[0.5px] border-zinc-200 bg-zinc-50 p-3 gap-2 overflow-auto"
          >
            {visiblePrompts.map((visiblePrompt, i) => (
              <article
                key={i}
                className={`text-sm text-zinc-700 max-w-[80%] ${visiblePrompt.role === "user" ? "bg-violet-100 self-start" : "bg-zinc-100 self-end"} rounded-lg p-3`}
              >
                {visiblePrompt.content}
              </article>
            ))}
            {loading && (
              <div className="text-sm text-zinc-700 max-w-[80%] bg-zinc-100 self-end rounded-lg p-3 flex gap-1">
                <span className="w-2 h-2 rounded-full bg-zinc-400 animate-pulse"></span>
                <span className="w-2 h-2 rounded-full bg-zinc-400 animate-pulse [animation-delay:200ms]"></span>
                <span className="w-2 h-2 rounded-full bg-zinc-400 animate-pulse [animation-delay:400ms]"></span>
              </div>
            )}
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
      )}
    </>
  );
};

export default Assistant;
