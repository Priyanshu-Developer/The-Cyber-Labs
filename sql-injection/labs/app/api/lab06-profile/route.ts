import { NextRequest, NextResponse } from "next/server";
import { getShopUser, vulnerableProfileUpdate } from "@/app/lab/06-second-order/lib/lab-db";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("lab06_session")?.value;
  const userId = Number(request.cookies.get("lab06_user_id")?.value || 0);
  if (!token) return NextResponse.json({ authenticated: false }, { status: 401 });
  const user = userId ? await getShopUser(userId) : null;
  if (!user) return NextResponse.json({ authenticated: false }, { status: 401 });
  return NextResponse.json({ authenticated: true, user });
}
export async function PUT(request: NextRequest) {
  const token = request.cookies.get("lab06_session")?.value;
  const userId = Number(request.cookies.get("lab06_user_id")?.value || 0);
  const { email } = await request.json();
  if (!token || !userId) return NextResponse.json({ success: false, error: "Not authenticated." }, { status: 401 });
  try {
    await vulnerableProfileUpdate(userId, email);
    return NextResponse.json({ success: true, message: "Profile updated." });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
