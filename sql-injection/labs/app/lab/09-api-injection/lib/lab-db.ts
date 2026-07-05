import { getPool } from "@/lib/db";

export async function vulnerableProductSearch(searchTerm: string) {
  const pool = await getPool();
  // VULNERABLE: String concatenation - API injection via JSON
  const query = `SELECT id, sku, name, description, category, price, stock FROM store_products WHERE name LIKE '%${searchTerm}%' OR description LIKE '%${searchTerm}%' ORDER BY id`;
  const result = await pool.query(query);
  return result.rows;
}

export async function validateStoreUser(username: string, password: string) {
  const pool = await getPool();
  // VULNERABLE: String concatenation
  const query = `SELECT id, username, email, role, api_key FROM store_users WHERE username = '${username}' AND password = '${password}'`;
  const result = await pool.query(query);
  return result.rows[0] || null;
}

export async function getProducts() {
  const pool = await getPool();
  const result = await pool.query('SELECT id, sku, name, description, category, price, stock FROM store_products WHERE is_active = true ORDER BY id');
  return result.rows;
}

export async function createStoreSession(userId: number) {
  const pool = await getPool();
  const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
  return token;
}

export async function validateStoreSession(token: string) {
  // Simple token validation for demo
  return { id: 1, username: 'demo', role: 'customer' };
}

export async function deleteStoreSession() {
  return true;
}
