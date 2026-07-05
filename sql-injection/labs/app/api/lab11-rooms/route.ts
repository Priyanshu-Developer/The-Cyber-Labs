import { NextRequest, NextResponse } from "next/server";
import { vulnerableRoomSearch } from "@/app/lab/11-stacked-queries/lib/lab-db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";
    if (!q) {
      return NextResponse.json({ rooms: [], query: "" });
    }
    const rooms = await vulnerableRoomSearch(q);
    return NextResponse.json({ rooms, query: q });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: "Search failed", details: message }, { status: 500 });
  }
}
