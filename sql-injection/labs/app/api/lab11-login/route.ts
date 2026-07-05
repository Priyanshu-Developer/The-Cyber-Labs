import { NextRequest, NextResponse } from "next/server";
import { validateBookingUser, createBookingSession } from "@/app/lab/11-stacked-queries/lib/lab-db";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    if (!username || !password) {
      return NextResponse.json({ error: "Username and password required" }, { status: 400 });
    }
    const user = await validateBookingUser(username, password);
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    const token = await createBookingSession(user.id);
    const response = NextResponse.json({ success: true, user, token });
    response.cookies.set("lab11_session", token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600,
      path: "/",
    });
    return response;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: "Login failed", details: message }, { status: 500 });
  }
}
