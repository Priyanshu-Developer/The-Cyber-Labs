import { NextRequest, NextResponse } from "next/server";
import { validateCrmUser, createSession } from "@/app/lab/07-crm-system/lib/lab-db";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    if (!username || !password) {
      return NextResponse.json({ error: "Username and password required" }, { status: 400 });
    }
    const user = await validateCrmUser(username, password);
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    const token = await createSession(user.id);
    const response = NextResponse.json({ success: true, user, token });
    response.cookies.set("lab07_session", token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600,
      path: "/",
    });
    return response;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    // VULNERABLE: Exposes error details
    return NextResponse.json({ error: "Login failed", details: message }, { status: 500 });
  }
}
