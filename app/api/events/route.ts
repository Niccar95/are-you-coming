import { addEvent, deleteEvent } from "@/app/services/eventService";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { name, event_date, description, image_url } = await req.json();

  if (!name || !event_date || !description) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const event = await addEvent(
    name,
    new Date(event_date),
    description,
    session.user.id,
    image_url || null,
  );

  return NextResponse.json(event, { status: 201 });
};

export const DELETE = async (req: NextRequest) => {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await req.json();

  await deleteEvent(id);

  return NextResponse.json({ success: true }, { status: 200 });
};
