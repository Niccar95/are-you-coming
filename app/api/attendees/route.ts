import { addAttendee } from "@/app/services/attendeeService";
import { NextRequest, NextResponse } from "next/server";
import { createHash, randomBytes } from "node:crypto";
import emailjs from "@emailjs/nodejs";

export const POST = async (req: NextRequest) => {
  const { event_id, name, email, response_status, eventData } =
    await req.json();

  if (
    !event_id ||
    !name ||
    !email ||
    !eventData ||
    !["coming", "unsure", "skipping"].includes(response_status)
  ) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 },
    );
  }

  const token = randomBytes(32).toString("hex");
  const responseTokenHash = createHash("sha256").update(token).digest("hex");

  try {
    const attendee = await addAttendee(
      event_id,
      name,
      email,
      response_status,
      responseTokenHash,
      async (attendee) => {
        const responseUrl = `${req.nextUrl.origin}/events/${event_id}/respond?token=${token}`;

        const formattedDate = new Date(eventData.eventDate).toLocaleDateString(
          "en-US",
          {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          },
        );

        const emailMessage = `<div style="border-left: 4px solid #8b5cf6; padding-left: 16px; margin-bottom: 24px;">
<h1 style="margin: 0; font-family: 'Plus Jakarta Sans', Arial, sans-serif; font-size: 24px; line-height: 1.3; font-weight: bold; color: #3f3f46; letter-spacing: 0.025em;">Response confirmation</h1>
</div>
This email confirms your response to the following event:<br><br>
<b>${eventData.name}</b><br><br>
${eventData.description}<br><br>
<b>Location and date</b><br><br>
${eventData.eventLocation}<br>
${formattedDate}<br><br>
You can update your response at any time using the personal link below:<br><br>
<a href="${responseUrl}">Update your response</a><br><br>
<i><b>Best regards,</b><br>${eventData.hostName}</i>`;

        await emailjs.send(
          "service_6vz097q",
          "template_kgecsxe",
          {
            to_email: attendee.email,
            event_id: eventData.id,
            message: emailMessage,
          },
          {
            publicKey: "_TeZKUhH8wHVx8a5J",
            privateKey: process.env.EMAILJS_PRIVATE_KEY,
          },
        );
      },
    );

    return NextResponse.json({ attendee }, { status: 201 });
  } catch (error) {
    console.error("Error submitting attendee:", error);

    return NextResponse.json(
      { error: "Failed to save attendee or send confirmation email." },
      { status: 500 },
    );
  }
};
