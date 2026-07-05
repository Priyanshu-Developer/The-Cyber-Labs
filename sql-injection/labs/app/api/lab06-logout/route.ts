import { NextResponse } from "next/server";
export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set("lab06_session", "", { httpOnly: true, secure: false, sameSite: "lax", path: "/", maxAge: 0 });
  response.cookies.set("lab06_user_id", "", { httpOnly: true, secure: false, sameSite: "lax", path: "/", maxAge: 0 });
  return response;
}
