import { NextRequest, NextResponse } from "next/server";
import { loginShopUser } from "@/app/lab/06-second-order/lib/lab-db";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();
  if (!username || !password) return NextResponse.json({ success: false, message: "Required." }, { status: 400 });
  const user = await loginShopUser(username, password);
  if (!user) return NextResponse.json({ success: false, message: "Invalid." }, { status: 401 });
  const bytes = new Uint8Array(48);
  crypto.getRandomValues(bytes);
  const token = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  const response = NextResponse.json({ success: true, user });
  response.cookies.set("lab06_session", token, { httpOnly: true, secure: false, sameSite: "lax", path: "/", maxAge: 7200 });
  response.cookies.set("lab06_user_id", String(user.id), { httpOnly: true, secure: false, sameSite: "lax", path: "/", maxAge: 7200 });
  return response;
}
