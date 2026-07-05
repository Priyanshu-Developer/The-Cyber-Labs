import { NextRequest, NextResponse } from "next/server";
import { vulnerableSearch } from "@/app/lab/02-union-attack/lib/lab-db";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q") || "";
  if (!q) {
    return NextResponse.json({ columns: [], employees: [], query: "" });
  }
  const sql = `SELECT id, name, department, email FROM raven_employees WHERE id = ${q}`;
  try {
    const employees = await vulnerableSearch(q);
    const columns = employees.length > 0 ? Object.keys(employees[0]) : [];
    return NextResponse.json({ columns, employees, query: sql });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: msg, query: sql }, { status: 500 });
  }
}
