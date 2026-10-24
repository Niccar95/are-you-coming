import { addAttendee } from "@/app/services/attendeeService";
import { NextRequest, NextResponse } from "next/server";
import { createHash, randomBytes } from "node:crypto";

export const POST = async (req: NextRequest) => {
  const { event_id, name, email, response_status } = await req.json();

  if (
    !event_id ||
    !name ||
    !email ||
    !["coming", "unsure", "skipping"].includes(response_status)
  ) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 },
    );
  }

  const token = randomBytes(32).toString("hex");
  const responseTokenHash = createHash("sha256").update(token).digest("hex");

  const attendee = await addAttendee(
    event_id,
    name,
    email,
    response_status,
    responseTokenHash,
  );

  return NextResponse.json({ attendee, token }, { status: 201 });
};
