import { NextRequest, NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();
  if (!username || !password) {
    return NextResponse.json({ success: false, message: "Username and password required." }, { status: 400 });
  }
  const pool = getPool();
  const sql = `SELECT * FROM raven_directory_users WHERE username='${username}' AND password='${password}'`;
  console.log("[LAB02 LOGIN]", sql);
  const result = await pool.query(sql);
  const rows = result.rows as { id: number; username: string; employee_id: number }[];
  if (rows.length === 0) {
    return NextResponse.json({ success: false, message: "Invalid credentials." }, { status: 401 });
  }
  const bytes = new Uint8Array(48);
  crypto.getRandomValues(bytes);
  const token = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  const response = NextResponse.json({ success: true, user: rows[0] });
  response.cookies.set("lab02_session", token, { httpOnly: true, secure: false, sameSite: "lax", path: "/", maxAge: 7200 });
  return response;
}
