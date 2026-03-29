import { GoogleGenAI } from "@google/genai";
import Groq from "groq-sdk";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const sendPrompt = async (userPrompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction:
          "You are an event planning assistant. Give one short, direct answer. No lists, no alternatives, no explanations. Just the suggestion itself, ready to use.",
      },
      contents: userPrompt,
    });
    if (!response.text) throw new Error("No response from assistant.");
    return response.text;
  } catch (error) {
    console.error("Gemini error:", error);

    const fallback = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are an event planning assistant. Give one short, direct answer. No lists, no alternatives, no explanations. Just the suggestion itself, ready to use.",
        },
        { role: "user", content: userPrompt },
      ],
    });

    const text = fallback.choices[0]?.message?.content;
    if (!text) throw new Error("Assistant failed to respond.");
    return text;
  }
};
