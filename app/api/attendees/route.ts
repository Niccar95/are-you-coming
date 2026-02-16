import { addAttendee } from "@/app/services/attendeeService";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { event_id, name, email } = await req.json();

  const attendee = await addAttendee(event_id, name, email);

  return NextResponse.json(attendee, { status: 201 });
};
