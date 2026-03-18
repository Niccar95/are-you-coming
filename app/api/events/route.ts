import {
  addEvent,
  deleteEvent,
  getEventById,
  updateEvent,
} from "@/app/services/eventService";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { name, event_date, description, image_url, spotify_url, spotify_invite_url } =
    await req.json();

  if (!name || !event_date || !description) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 },
    );
  }

  const event = await addEvent(
    name,
    new Date(event_date),
    description,
    session.user.id,
    image_url || null,
    spotify_url || null,
    spotify_invite_url || null,
  );

  return NextResponse.json(event, { status: 201 });
};

export const PATCH = async (req: NextRequest) => {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id, name, event_date, description, image_url, spotify_url, spotify_invite_url } =
    await req.json();

  if (!id || !name || !event_date || !description) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 },
    );
  }

  const existingId = await getEventById(id);
  if (!existingId) {
    return NextResponse.json({ error: "Event not found." }, { status: 404 });
  }
  if (String(existingId.userId) !== String(session.user.id)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const event = await updateEvent(
    id,
    name,
    new Date(event_date),
    description,
    image_url || null,
    spotify_url || null,
    spotify_invite_url || null,
  );

  return NextResponse.json(event, { status: 201 });
};

export const DELETE = async (req: NextRequest) => {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await req.json();

  const event = await getEventById(id);
  if (!event) {
    return NextResponse.json({ error: "Event not found." }, { status: 404 });
  }
  if (String(event.userId) !== String(session.user.id)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  await deleteEvent(id);

  return NextResponse.json({ success: true }, { status: 200 });
};
