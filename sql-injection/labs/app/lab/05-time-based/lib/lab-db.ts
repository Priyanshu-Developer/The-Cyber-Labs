/**
 * Lab 05 - Database Layer
 * VULNERABLE: Student lookup returns nothing visible.
 * Only response time indicates true/false.
 */
import { getPool } from "@/lib/db";
import type { Student } from "./types";

export async function vulnerableStudentLookup(studentNumber: string): Promise<Student | null> {
  const pool = getPool();
  const sql = `SELECT * FROM uni_students WHERE student_number='${studentNumber}'`;
  console.log("[LAB05 VULNERABLE]", sql);
  const result = await pool.query(sql);
  const rows = result.rows as Student[];
  return rows.length > 0 ? rows[0] : null;
}

export async function getStudents(): Promise<Student[]> {
  const pool = getPool();
  const result = await pool.query(
    `SELECT id, student_number, first_name, last_name, major, gpa FROM uni_students ORDER BY student_number`
  );
  return result.rows as Student[];
}
