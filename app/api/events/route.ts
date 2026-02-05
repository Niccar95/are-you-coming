import { addEvent } from "@/app/services/eventService";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { name, event_date } = await req.json();

  const event = await addEvent(name, new Date(event_date));

  return NextResponse.json(event, { status: 201 });
};
