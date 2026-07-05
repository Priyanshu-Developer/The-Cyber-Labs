import { NextRequest, NextResponse } from "next/server";
import { vulnerablePatientLookup } from "@/app/lab/04-boolean-blind/lib/lab-db";

function lookupSql(patientId: string) {
  return `SELECT * FROM hospital_patients WHERE patient_id='${patientId}'`;
}

export async function GET(request: NextRequest) {
  const pid = request.nextUrl.searchParams.get("patient_id") || "";
  if (!pid) return NextResponse.json({ found: false });
  try {
    const patient = await vulnerablePatientLookup(pid);
    const sql = lookupSql(pid);
    if (patient) {
      return NextResponse.json({ found: true, patient, query: sql });
    }
    return NextResponse.json({ found: false, query: sql });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    const sql = lookupSql(pid);
    return NextResponse.json({ found: false, error: msg, query: sql }, { status: 500 });
  }
}
