import { NextRequest, NextResponse } from "next/server";
import { validateStoreUser, createStoreSession } from "@/app/lab/09-api-injection/lib/lab-db";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    if (!username || !password) {
      return NextResponse.json({ error: "Username and password required" }, { status: 400 });
    }
    const user = await validateStoreUser(username, password);
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    const token = await createStoreSession(user.id);
    const response = NextResponse.json({ success: true, user, token });
    response.cookies.set("lab09_session", token, {
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
