import { getPool } from "@/lib/db";

export async function vulnerablePatientLookup(patientId: string) {
  const pool = await getPool();
  // VULNERABLE: String concatenation - Blind SQLi
  // Only returns found/not found, no data leakage through response
  const query = `SELECT id, first_name, last_name, patient_id FROM clinic_patients WHERE patient_id = '${patientId}'`;
  const result = await pool.query(query);
  return result.rows.length > 0;
}

export async function validateClinicUser(username: string, password: string) {
  const pool = await getPool();
  // VULNERABLE: String concatenation
  const query = `SELECT id, username, full_name, role FROM clinic_users WHERE username = '${username}' AND password = '${password}'`;
  const result = await pool.query(query);
  return result.rows[0] || null;
}

export async function createClinicSession(userId: number) {
  const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
  return token;
}

export async function validateClinicSession(token: string) {
  return { id: 1, username: 'demo', role: 'receptionist' };
}

export async function deleteClinicSession() {
  return true;
}
