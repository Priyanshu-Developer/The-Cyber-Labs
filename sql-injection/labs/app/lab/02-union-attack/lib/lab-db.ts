/**
 * Lab 02 - Database Layer
 * VULNERABLE: Search query uses string concatenation with UNION SELECT.
 */
import { getPool } from "@/lib/db";
import type { Staff } from "./types";

/**
 * VULNERABLE: Employee search using string concatenation.
 * The search term is placed directly into a numeric lookup.
 * An attacker can inject UNION SELECT to extract data from other tables.
 *
 * Normal: SELECT id, name, department, email
 *         FROM raven_employees WHERE id = 101
 *
 * Injected: ... UNION SELECT id, title, classification, secret_value
 *           FROM raven_secret_archive --
 */
export async function vulnerableSearch(searchTerm: string): Promise<Staff[]> {
  const pool = getPool();
  const sql = `SELECT id, name, department, email
               FROM raven_employees
               WHERE id = ${searchTerm}`;
  console.log("[LAB02 VULNERABLE]", sql);
  const result = await pool.query(sql);
  return result.rows as Staff[];
}

export async function getStaff(): Promise<Staff[]> {
  const pool = getPool();
  const result = await pool.query(
    `SELECT id, name, department, email
     FROM raven_employees ORDER BY id`
  );
  return result.rows as Staff[];
}
