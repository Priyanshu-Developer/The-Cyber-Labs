import { NextRequest, NextResponse } from "next/server";
import { validatePortalSession } from "@/app/lab/08-admin-dashboard/lib/lab-db";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("lab08_session")?.value;
  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  const user = await validatePortalSession(token);
  if (!user) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true, user });
}
