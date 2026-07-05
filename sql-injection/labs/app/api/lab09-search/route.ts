import { NextRequest, NextResponse } from "next/server";
import { vulnerableProductSearch } from "@/app/lab/09-api-injection/lib/lab-db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";
    if (!q) {
      return NextResponse.json({ products: [], query: "" });
    }
    const products = await vulnerableProductSearch(q);
    return NextResponse.json({ products, query: q });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: "Search failed", details: message }, { status: 500 });
  }
}
