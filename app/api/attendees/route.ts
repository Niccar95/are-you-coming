import { getAttendees, addAttendee } from "@/app/services/attendeeService";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const attendees = await getAttendees();
  return NextResponse.json(attendees);
};

export const POST = async (req: NextRequest) => {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { name, email } = await req.json();

  const attendee = await addAttendee(name, email);

  return NextResponse.json(attendee, { status: 201 });
};
