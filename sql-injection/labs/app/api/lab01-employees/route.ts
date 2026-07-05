/**
 * Lab 01 - Employees API Route
 *
 * GET /api/lab01-employees
 *
 * Returns the list of all employees (requires valid session).
 * This is a SAFE query - no user input is concatenated.
 */

import { NextRequest, NextResponse } from "next/server";
import {
  validateSession,
  getAllEmployees,
} from "@/app/lab/01-auth-bypass/lib/lab-db";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("lab01_session")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized. Please log in first." },
      { status: 401 }
    );
  }

  const employee = await validateSession(token);

  if (!employee) {
    return NextResponse.json(
      { error: "Session expired or invalid. Please log in again." },
      { status: 401 }
    );
  }

  const employees = await getAllEmployees();

  return NextResponse.json({ employees, authenticatedAs: employee });
}
