import pool from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { name, email } = await req.json();

  const result = await pool.query(
    "INSERT INTO attendees (name, email) VALUES ($1, $2) RETURNING *",
    [name, email]
  );

  return NextResponse.json(result.rows[0], { status: 201 });
};
