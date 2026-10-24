import { NextRequest, NextResponse } from "next/server";
import emailjs from "@emailjs/nodejs";

export const POST = async (req: NextRequest) => {
  const { attendees, eventData, emailMessage } = await req.json();

  if (!attendees || !Array.isArray(attendees)) {
    return NextResponse.json(
      { error: "Missing attendees array." },
      { status: 400 },
    );
  }

  if (!eventData) {
    return NextResponse.json({ error: "Missing event data." }, { status: 400 });
  }

  if (!emailMessage) {
    return NextResponse.json({ error: "Missing message." }, { status: 400 });
  }

  try {
    for (const attendee of attendees) {
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
      console.log(`Reminder sent to ${attendee.email}`);

      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error in email route:", error);
    return NextResponse.json(
      { error: "Failed to send emails" },
      { status: 500 },
    );
  }
};
