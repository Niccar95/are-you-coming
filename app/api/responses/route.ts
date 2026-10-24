import { NextRequest, NextResponse } from "next/server";
import emailjs from "@emailjs/nodejs";

import { updateAttendeeResponse } from "@/app/services/attendeeService";

export const PATCH = async (req: NextRequest) => {
  const { eventId, token, responseStatus } = await req.json();

  if (
    !eventId ||
    !token ||
    !["coming", "unsure", "skipping"].includes(responseStatus)
  ) {
    return NextResponse.json(
      { error: "Missing or invalid parameters." },
      { status: 400 },
    );
  }

  const updated = await updateAttendeeResponse(eventId, token, responseStatus);

  if (!updated) {
    return NextResponse.json(
      { error: "Invalid response link." },
      { status: 404 },
    );
  }

  return NextResponse.json(
    { message: "Response updated successfully." },
    { status: 200 },
  );
};

export const POST = async (req: NextRequest) => {
  const { attendee, token, eventData, emailMessage } = await req.json();

  if (!attendee || !token || !eventData || !emailMessage) {
    return NextResponse.json(
      { error: "Missing or invalid parameters." },
      { status: 400 },
    );
  }

  try {
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
    console.log(`Confirmation sent to ${attendee.email}`);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error in email route:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
};
