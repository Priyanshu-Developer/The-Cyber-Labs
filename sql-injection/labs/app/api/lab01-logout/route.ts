/**
 * Lab 01 - Logout API Route
 *
 * POST /api/lab01-logout
 *
 * Deletes the session from the database and clears the cookie.
 */

import { NextRequest, NextResponse } from "next/server";
import { deleteSession } from "@/app/lab/01-auth-bypass/lib/lab-db";

export async function POST(request: NextRequest) {
  const token = request.cookies.get("lab01_session")?.value;

  if (token) {
    await deleteSession(token);
  }

  const response = NextResponse.json({ success: true, message: "Logged out." });
  response.cookies.set("lab01_session", "", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
