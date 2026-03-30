import { sendPrompt } from "@/app/services/assistantService";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { userPrompt } = await req.json();

  if (!userPrompt) {
    return NextResponse.json(
      { error: "Missing required field." },
      { status: 400 },
    );
  }

const prompt = await sendPrompt(userPrompt);

  return NextResponse.json(prompt, { status: 200 });
};
