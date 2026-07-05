import { NextRequest, NextResponse } from "next/server";
import { getPool } from "@/lib/db";
export async function POST(request: NextRequest) {
  const { username, password } = await request.json();
  if (!username || !password) return NextResponse.json({ success: false, message: "Required." }, { status: 400 });
  const pool = getPool();
  const sql = `SELECT * FROM uni_users WHERE username='${username}' AND password='${password}'`;
  const result = await pool.query(sql);
  const rows = result.rows as { id: number; username: string; role: string }[];
  if (rows.length === 0) return NextResponse.json({ success: false, message: "Invalid." }, { status: 401 });
  const bytes = new Uint8Array(48);
  crypto.getRandomValues(bytes);
  const token = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  const response = NextResponse.json({ success: true, user: rows[0] });
  response.cookies.set("lab05_session", token, { httpOnly: true, secure: false, sameSite: "lax", path: "/", maxAge: 7200 });
  return response;
}
