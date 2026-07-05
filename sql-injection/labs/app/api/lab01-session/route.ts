/**
 * Lab 01 - Session Check API Route
 *
 * GET /api/lab01-session
 *
 * Returns the currently authenticated employee (if any).
 * Used by the dashboard and profile pages to check auth state.
 */

import { NextRequest, NextResponse } from "next/server";
import { validateSession } from "@/app/lab/01-auth-bypass/lib/lab-db";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("lab01_session")?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const employee = await validateSession(token);

  if (!employee) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true, employee });
}
