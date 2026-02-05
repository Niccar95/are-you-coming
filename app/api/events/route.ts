import pool from "@/app/lib/db";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { name, event_date } = await req.json();

  const result = await pool.query(
    "INSERT INTO events (name, event_date) VALUES ($1, $2) RETURNING *",
    [name, event_date],
  );

  return NextResponse.json(result.rows[0], { status: 201 });
};
