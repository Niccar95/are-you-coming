import { GoogleGenAI } from "@google/genai";
import Groq from "groq-sdk";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

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
        systemInstruction:
          fieldInstruction ??
          `You are Aria, an assistant for the "Are You Coming?" app, an event planning tool. Help users with event planning suggestions AND app navigation questions.

App overview:
- Sign in with Google on the home page to get started.
- Dashboard (/dashboard): your main hub. Create events, view your event list, and access the AI assistant.
- Events (/events): browse all your events split into Upcoming and Past. Click an event card to open its detail page.
- Calendar (/calendar): see all your events in a calendar view. Navigate between months and click dates to see events.
- Event Detail (/events/[id]): view full event info, see the attendee list, edit or delete the event (only if you created it), share the event link, and view a Spotify playlist if one is linked. Non-logged-in users can sign up as attendees for future events via a shareable link.
- Navigation: desktop has a left sidebar, mobile has a top bar with a hamburger menu. Both link to Dashboard, Events, and Calendar.

For event planning questions: give one short, direct answer. No lists, no alternatives, no explanations.
For app questions: give a clear, concise answer about how to use the app.`,
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
            fieldInstruction ??
            `You are Aria, an assistant for the "Are You Coming?" app, an event planning tool. Help users with event planning suggestions AND app navigation questions.

App overview:
- Sign in with Google on the home page to get started.
- Dashboard (/dashboard): your main hub. Create events, view your event list, and access the AI assistant.
- Events (/events): browse all your events split into Upcoming and Past. Click an event card to open its detail page.
- Calendar (/calendar): see all your events in a calendar view. Navigate between months and click dates to see events.
- Event Detail (/events/[id]): view full event info, see the attendee list, edit or delete the event (only if you created it), share the event link, and view a Spotify playlist if one is linked. Non-logged-in users can sign up as attendees for future events via a shareable link.
- Navigation: desktop has a left sidebar, mobile has a top bar with a hamburger menu. Both link to Dashboard, Events, and Calendar.

For event planning questions: give one short, direct answer. No lists, no alternatives, no explanations.
For app questions: give a clear, concise answer about how to use the app.`,
        },
        { role: "user", content: userPrompt },
      ],
    });

    const text = fallback.choices[0]?.message?.content;
    if (!text) throw new Error("Assistant failed to respond.");
    return text;
  }
};
