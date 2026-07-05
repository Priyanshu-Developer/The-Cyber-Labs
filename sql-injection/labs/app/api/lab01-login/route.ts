/**
 * Lab 01 - Login API Route
 *
 * POST /api/lab01-login
 *
 * This is the VULNERABLE endpoint. The query is built using
 * string concatenation, allowing SQL Injection attacks.
 *
 * An attacker can bypass authentication by injecting:
 *   Username: admin' OR '1'='1' --
 *   Password: anything
 *
 * The resulting SQL becomes:
 *   SELECT * FROM portal_employees
 *   WHERE username='admin' OR '1'='1' --' AND password='anything'
 *
 * The -- comments out the password check, and '1'='1' is always true,
 * so the query returns an administrator row.
 */

import { NextRequest, NextResponse } from "next/server";
import {
  vulnerableLoginQuery,
  createSession,
} from "@/app/lab/01-auth-bypass/lib/lab-db";
import type { EmployeeProfile, LoginResponse } from "@/app/lab/01-auth-bypass/lib/types";

export async function POST(
  request: NextRequest
): Promise<NextResponse<LoginResponse>> {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Username and password are required." },
        { status: 400 }
      );
    }

    // =============================================
    // VULNERABLE: Uses string concatenation
    // =============================================
    const employee = await vulnerableLoginQuery(username, password);

    if (!employee) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials. Access denied." },
        { status: 401 }
      );
    }

    // Create session and set cookie
    const sessionToken = await createSession(employee.id);

    // Strip password from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...profile } = employee;
    const employeeProfile: EmployeeProfile = profile;

    const response = NextResponse.json({
      success: true,
      employee: employeeProfile,
      message: `Welcome, ${employeeProfile.full_name}. Role: ${employeeProfile.role}`,
    });

    // Set session cookie
    response.cookies.set("lab01_session", sessionToken, {
      httpOnly: true,
      secure: false, // Allow HTTP for local Docker labs
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 2, // 2 hours
    });

    return response;
  } catch (error) {
    console.error("[LOGIN ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred during authentication.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
