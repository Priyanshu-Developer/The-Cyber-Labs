import { NextRequest, NextResponse } from "next/server";
import { getShopUser } from "@/app/lab/06-second-order/lib/lab-db";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("lab06_session")?.value;
  const userId = Number(request.cookies.get("lab06_user_id")?.value || 0);
  if (!token) return NextResponse.json({ authenticated: false }, { status: 401 });
  const user = userId ? await getShopUser(userId) : null;
  return NextResponse.json({ authenticated: true, user });
}
