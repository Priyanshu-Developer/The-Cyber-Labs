/**
 * Lab 01 - Database Layer
 *
 * Uses the shared PostgreSQL pool from @/lib/db.ts.
 * The "vulnerable" functions here use string concatenation
 * to intentionally create SQL Injection vulnerabilities.
 *
 * WARNING: This code is INTENTIONALLY INSECURE.
 * It is designed for educational purposes only.
 */

import { getPool } from "@/lib/db";
import type { Employee, EmployeeProfile } from "./types";

/**
 * VULNERABLE: Login query using string concatenation.
 *
 * This is the core vulnerability. The user-supplied values
 * are interpolated directly into the SQL string WITHOUT
 * parameterization. This allows an attacker to inject
 * arbitrary SQL syntax into the WHERE clause.
 *
 * Example of how this query looks with normal input:
 *   SELECT * FROM portal_employees
 *   WHERE username = 'admin' AND password = 'SuperSecret!2024'
 *
 * Example with injection payload:
 *   Payload:  ' OR '1'='1' --
 *   Result:   SELECT * FROM portal_employees
 *             WHERE username = '' OR '1'='1' --' AND password = ''
 *
 * The -- comments out the rest of the query, making it always TRUE.
 */
export async function vulnerableLoginQuery(
  username: string,
  password: string
): Promise<Employee | null> {
  const pool = getPool();

  // ============================================================
  // VULNERABLE: Direct string concatenation
  // DO NOT use this pattern in production code!
  // ============================================================
  const sql = `SELECT * FROM portal_employees WHERE username='${username}' AND password='${password}'`;

  console.log("[VULNERABLE QUERY]", sql);

  try {
    const result = await pool.query(sql);
    const rows = result.rows as Employee[];
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    // Log the error for educational purposes
    // (In production, you'd never expose SQL errors to users)
    console.error("[SQL ERROR]", error);
    throw error;
  }
}

/**
 * SECURE: Login query using parameterized statements.
 *
 * This is the CORRECT way to query user input.
 * Parameters are sent separately to the database driver,
 * which handles escaping and prevents injection.
 *
 * Even if an attacker submits ' OR '1'='1' --,
 * the database treats it as a literal string value,
 * not as SQL syntax.
 */
export async function secureLoginQuery(
  username: string,
  password: string
): Promise<Employee | null> {
  const pool = getPool();

  // ============================================================
  // SECURE: Parameterized query (prepared statement)
  // This is the correct pattern for production code.
  // ============================================================
  const sql = `SELECT * FROM portal_employees WHERE username=$1 AND password=$2`;

  const result = await pool.query(sql, [username, password]);
  const rows = result.rows as Employee[];
  return rows.length > 0 ? rows[0] : null;
}

/**
 * Fetch employee profile by ID (safe query - no user input).
 */
export async function getEmployeeById(
  id: number
): Promise<EmployeeProfile | null> {
  const pool = getPool();
  const sql = `SELECT id, employee_id, username, full_name, email, department, role, phone, hire_date, salary, clearance_level
               FROM portal_employees WHERE id = $1`;
  const result = await pool.query(sql, [id]);
  const rows = result.rows as EmployeeProfile[];
  return rows.length > 0 ? rows[0] : null;
}

/**
 * Fetch ALL employees (safe query - no user input).
 */
export async function getAllEmployees(): Promise<EmployeeProfile[]> {
  const pool = getPool();
  const sql = `SELECT id, employee_id, username, full_name, email, department, role, phone, hire_date, salary, clearance_level
               FROM portal_employees ORDER BY employee_id`;
  const result = await pool.query(sql);
  return result.rows as EmployeeProfile[];
}

/**
 * Create a session token for an authenticated user.
 */
export async function createSession(
  employeeId: number
): Promise<string> {
  const pool = getPool();
  // Generate a random token
  const bytes = new Uint8Array(48);
  crypto.getRandomValues(bytes);
  const token = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");

  const sql = `INSERT INTO portal_sessions (session_token, employee_id, expires_at)
               VALUES ($1, $2, NOW() + INTERVAL '2 hours')
               RETURNING session_token`;
  const result = await pool.query(sql, [token, employeeId]);
  return (result.rows[0] as { session_token: string }).session_token;
}

/**
 * Validate a session token and return the employee.
 */
export async function validateSession(
  token: string
): Promise<EmployeeProfile | null> {
  const pool = getPool();
  const sql = `SELECT e.id, e.employee_id, e.username, e.full_name, e.email,
                      e.department, e.role, e.phone, e.hire_date, e.salary, e.clearance_level
               FROM portal_employees e
               INNER JOIN portal_sessions s ON e.id = s.employee_id
               WHERE s.session_token = $1 AND s.expires_at > NOW()`;
  const result = await pool.query(sql, [token]);
  const rows = result.rows as EmployeeProfile[];
  return rows.length > 0 ? rows[0] : null;
}

/**
 * Delete a session (logout).
 */
export async function deleteSession(token: string): Promise<void> {
  const pool = getPool();
  await pool.query(`DELETE FROM portal_sessions WHERE session_token = $1`, [token]);
}
