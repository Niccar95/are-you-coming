import { addAttendee } from "@/app/services/attendeeService";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { event_id, name, email } = await req.json();

  const attendee = await addAttendee(event_id, name, email);

  return NextResponse.json(attendee, { status: 201 });
};
