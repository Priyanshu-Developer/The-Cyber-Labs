/**
 * Lab 04 - Database Layer
 * VULNERABLE: Patient lookup returns only boolean (found/not found).
 * No data or errors are shown - classic blind SQLi scenario.
 */
import { getPool } from "@/lib/db";
import type { Patient } from "./types";

/**
 * VULNERABLE: Patient lookup by ID.
 * Returns patient data only if found. No error messages exposed.
 * This is a blind SQL injection - the attacker must infer data
 * by observing whether the query returns a result (true/false).
 */
export async function vulnerablePatientLookup(patientId: string): Promise<Patient | null> {
  const pool = getPool();
  const sql = `SELECT * FROM hospital_patients WHERE patient_id='${patientId}'`;
  console.log("[LAB04 VULNERABLE]", sql);
  const result = await pool.query(sql);
  const rows = result.rows as Patient[];
  return rows.length > 0 ? rows[0] : null;
}

export async function getPatients(): Promise<Patient[]> {
  const pool = getPool();
  const result = await pool.query(
    `SELECT id, patient_id, first_name, last_name, diagnosis, room_number FROM hospital_patients ORDER BY patient_id`
  );
  return result.rows as Patient[];
}
