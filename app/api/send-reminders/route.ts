import { NextResponse } from "next/server";
import sendReminders from "@/app/utils/emailReminder";

export async function POST() {
  try {
    await sendReminders();
    return NextResponse.json(
      { message: "Reminders sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending reminders:", error);
    return NextResponse.json(
      { error: "Failed to send reminders" },
      { status: 500 }
    );
  }
}
