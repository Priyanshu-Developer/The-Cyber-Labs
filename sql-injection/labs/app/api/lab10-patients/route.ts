import { NextRequest, NextResponse } from "next/server";
import { vulnerablePatientLookup } from "@/app/lab/10-blind-investigation/lib/lab-db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const patientId = searchParams.get("patient_id") || "";
    if (!patientId) {
      return NextResponse.json({ found: false, query: "" });
    }
    const found = await vulnerablePatientLookup(patientId);
    return NextResponse.json({ found, query: patientId });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: "Lookup failed", details: message }, { status: 500 });
  }
}
