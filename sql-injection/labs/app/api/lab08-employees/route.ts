import { NextRequest, NextResponse } from "next/server";
import { vulnerableEmployeeSearch } from "@/app/lab/08-admin-dashboard/lib/lab-db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";
    if (!q) {
      return NextResponse.json({ employees: [], query: "" });
    }
    const employees = await vulnerableEmployeeSearch(q);
    return NextResponse.json({ employees, query: q });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: "Search failed", details: message }, { status: 500 });
  }
}
