import { NextRequest, NextResponse } from "next/server";
import { vulnerableAccountLookup } from "@/app/lab/03-error-based/lib/lab-db";

function lookupSql(account: string) {
  return `SELECT * FROM bank_accounts WHERE account_number='${account}' AND status='active'`;
}

export async function GET(request: NextRequest) {
  const acct = request.nextUrl.searchParams.get("account") || "";
  if (!acct) return NextResponse.json({ error: "Account number required." }, { status: 400 });
  try {
    const account = await vulnerableAccountLookup(acct);
    const sql = lookupSql(acct);
    if (!account) {
      return NextResponse.json({ found: false, query: sql });
    }
    return NextResponse.json({ found: true, account, query: sql });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    const sql = lookupSql(acct);
    return NextResponse.json({ found: false, error: msg, details: msg, query: sql }, { status: 500 });
  }
}
