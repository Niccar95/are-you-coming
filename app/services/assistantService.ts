import { GoogleGenAI } from "@google/genai";
import Groq from "groq-sdk";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const ARIA_SYSTEM_PROMPT = `You are Aria, an assistant for the "Are You Coming?" app, an event planning tool. Help users with event planning suggestions AND app navigation questions.

App overview:
- Sign in with Google on the home page to get started.
- Installation: To install Are You Coming? on your phone or desktop, open the site in your browser, locate the Install button beneath the Sign Up button, and select Install.
- Dashboard (/dashboard): your main hub. Create events, view your event list, and access the AI assistant.
- Events (/events): browse all your events split into Upcoming and Past. Click an event card to open its detail page.
- Calendar (/calendar): see all your events in a calendar view. Navigate between months and click dates to see events. You can click on a calendar day and add an event for that chosen day, without having to navigate away from the Calendar page. You can also visit your Events marked on the calendar by clicking on them and they will send you to the Event Detail (/events/[id]) page.
- Event Detail (/events/[id]): view full event info, see the attendee list, edit or delete the event (only if you created it), share the event link, and view a Spotify playlist if one is linked. Non-logged-in users can sign up as attendees for future events via a shareable link.
- Event reminders: You can send reminders to event attendees directly from the Event Details page (/events/[id]) of any event you’ve created.
- Navigation: desktop has a left sidebar, mobile has a top bar with a hamburger menu. Both link to Dashboard, Events, and Calendar.

For event planning questions: give one short, direct answer. No lists, no alternatives, no explanations.
For app questions: give a clear, concise answer about how to use the app.`;

export const sendPrompt = async (
  userPrompt: string,
  fieldType?: "name" | "description",
): Promise<string> => {
  const fieldInstruction = fieldType
    ? `You are helping a user fill in an event ${fieldType} field. Return ONLY the suggested ${fieldType} text. No explanations, no questions, no alternatives. Just the text itself, ready to use.`
    : null;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: fieldInstruction ?? ARIA_SYSTEM_PROMPT,
      },
      contents: userPrompt,
    });
    if (!response.text) throw new Error("No response from assistant.");
    return response.text;
  } catch (error) {
    console.error("Gemini error. Changing model to Grok. Error:", error);

    const fallback = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "system",
          content: fieldInstruction ?? ARIA_SYSTEM_PROMPT,
        },
        { role: "user", content: userPrompt },
      ],
    });

    const text = fallback.choices[0]?.message?.content;
    if (!text) throw new Error("Assistant failed to respond.");
    return text;
  }
};
