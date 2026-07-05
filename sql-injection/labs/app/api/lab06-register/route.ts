import { NextRequest, NextResponse } from "next/server";
import { vulnerableRegister } from "@/app/lab/06-second-order/lib/lab-db";
export async function POST(request: NextRequest) {
  const { username, password, email } = await request.json();
  if (!username || !password || !email) {
    return NextResponse.json({ success: false, message: "All fields required." }, { status: 400 });
  }
  try {
    const userId = await vulnerableRegister(username, password, email);
    return NextResponse.json({ success: true, userId, message: "Account created." });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, message: "Registration failed.", error: msg }, { status: 500 });
  }
}
