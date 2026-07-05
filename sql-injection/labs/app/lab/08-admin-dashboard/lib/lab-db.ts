import { getPool } from "@/lib/db";

export async function vulnerableEmployeeSearch(searchTerm: string) {
  const pool = await getPool();
  // VULNERABLE: String concatenation - UNION injection
  const query = `SELECT id, first_name, last_name, email, department, position, hire_date FROM emp_directory_staff WHERE first_name LIKE '%${searchTerm}%' OR last_name LIKE '%${searchTerm}%' ORDER BY id`;
  const result = await pool.query(query);
  return result.rows;
}

export async function validatePortalUser(username: string, password: string) {
  const pool = await getPool();
  // VULNERABLE: String concatenation
  const query = `SELECT id, username, full_name, role, department FROM emp_directory_users WHERE username = '${username}' AND password = '${password}'`;
  const result = await pool.query(query);
  return result.rows[0] || null;
}

export async function createPortalSession(userId: number) {
  const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
  return token;
}

export async function validatePortalSession(token: string) {
  return { id: 1, username: 'demo', role: 'user', full_name: 'Demo User', department: 'Engineering' };
}

export async function deletePortalSession() {
  return true;
}
