import { getPool } from "@/lib/db";

export async function vulnerableCustomerSearch(searchTerm: string) {
  const pool = await getPool();
  // VULNERABLE: String concatenation - error-based double query injection
  const query = `SELECT c.id, c.first_name, c.last_name, c.email, c.company, c.revenue, c.status FROM crm_customers c WHERE c.first_name LIKE '%${searchTerm}%' OR c.last_name LIKE '%${searchTerm}%' ORDER BY c.id`;
  const result = await pool.query(query);
  return result.rows;
}

export async function validateCrmUser(username: string, password: string) {
  const pool = await getPool();
  // VULNERABLE: String concatenation
  const query = `
    SELECT id, username, full_name, role, department
    FROM crm_users
    WHERE username = '${username}' AND password = '${password}'
  `;
  const result = await pool.query(query);
  return result.rows[0] || null;
}

export async function getCrmUser(userId: number) {
  const pool = await getPool();
  const result = await pool.query(
    'SELECT id, username, full_name, role, department FROM crm_users WHERE id = $1',
    [userId]
  );
  return result.rows[0] || null;
}

export async function getCustomers() {
  const pool = await getPool();
  const result = await pool.query('SELECT id, first_name, last_name, email, company, revenue, status FROM crm_customers ORDER BY id');
  return result.rows;
}

export async function createSession(userId: number) {
  const pool = await getPool();
  const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
  await pool.query(
    `INSERT INTO crm_audit_log (user_id, action, details) VALUES ($1, 'login', 'User logged in')`,
    [userId]
  );
  return token;
}

export async function deleteSession() {
  // Simple session cleanup
  return true;
}
