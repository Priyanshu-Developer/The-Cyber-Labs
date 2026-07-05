import { NextRequest, NextResponse } from "next/server";
import { vulnerableStudentLookup } from "@/app/lab/05-time-based/lib/lab-db";

function lookupSql(studentNumber: string) {
  return `SELECT * FROM uni_students WHERE student_number='${studentNumber}'`;
}

export async function GET(request: NextRequest) {
  const sn = request.nextUrl.searchParams.get("student_number") || "";
  if (!sn) return NextResponse.json({ found: false, message: "" });
  try {
    const start = Date.now();
    const student = await vulnerableStudentLookup(sn);
    const elapsed = Date.now() - start;
    const sql = lookupSql(sn);
    return NextResponse.json({ found: !!student, message: student ? "Record found." : "No record.", query: sql, elapsed });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    const sql = lookupSql(sn);
    return NextResponse.json({ found: false, error: msg, query: sql }, { status: 500 });
  }
}
