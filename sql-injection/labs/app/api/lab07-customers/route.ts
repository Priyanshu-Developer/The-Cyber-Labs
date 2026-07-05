import { NextRequest, NextResponse } from "next/server";
import { vulnerableCustomerSearch } from "@/app/lab/07-crm-system/lib/lab-db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";
    if (!q) {
      return NextResponse.json({ customers: [], query: "" });
    }
    const customers = await vulnerableCustomerSearch(q);
    return NextResponse.json({ customers, query: q });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    // VULNERABLE: Leaks SQL error details
    return NextResponse.json({ error: "Search failed", details: message }, { status: 500 });
  }
}
