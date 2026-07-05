/**
 * Lab 06 - Database Layer
 * VULNERABLE: Profile update uses stored username in SQL query.
 * The payload is injected during REGISTRATION, but triggered
 * during PROFILE UPDATE (second order).
 */
import { getPool } from "@/lib/db";
import type { Product, ShopUser } from "./types";

/**
 * VULNERABLE: Profile update query.
 * The username is read from the database and inserted into
 * a NEW query using string concatenation. If the username
 * contains SQL injection payload, it executes here.
 *
 * This is second-order SQLi:
 * 1. Attacker registers with malicious username
 * 2. Payload is stored in the database
 * 3. When profile is updated, the stored payload executes
 */
export async function vulnerableProfileUpdate(
  userId: number,
  newEmail: string
): Promise<boolean> {
  const pool = getPool();
  const userResult = await pool.query("SELECT username FROM shop_users WHERE id = $1", [userId]);
  const username = (userResult.rows[0] as { username: string } | undefined)?.username;
  if (!username) {
    throw new Error("User not found");
  }

  // VULNERABLE: username comes from the database (stored during registration)
  // but is concatenated into this query
  const sql = `UPDATE shop_users SET email='${newEmail}' WHERE username='${username}'`;
  console.log("[LAB06 VULNERABLE]", sql);
  await pool.query(sql);
  return true;
}

/**
 * VULNERABLE: Registration query (stores the malicious payload).
 */
export async function vulnerableRegister(
  username: string,
  password: string,
  email: string
): Promise<number> {
  const pool = getPool();
  console.log("[LAB06 REGISTER STORES PAYLOAD]", username);
  const result = await pool.query(
    "INSERT INTO shop_users (username, password, email) VALUES ($1, $2, $3) RETURNING id",
    [username, password, email]
  );
  return (result.rows[0] as { id: number }).id;
}

export async function loginShopUser(username: string, password: string): Promise<ShopUser | null> {
  const pool = getPool();
  const result = await pool.query(
    "SELECT id, username, email, role FROM shop_users WHERE username = $1 AND password = $2",
    [username, password]
  );
  const rows = result.rows as ShopUser[];
  return rows.length > 0 ? rows[0] : null;
}

export async function getShopUser(userId: number): Promise<ShopUser | null> {
  const pool = getPool();
  const result = await pool.query("SELECT id, username, email, role FROM shop_users WHERE id = $1", [userId]);
  const rows = result.rows as ShopUser[];
  return rows.length > 0 ? rows[0] : null;
}

export async function getProducts(): Promise<Product[]> {
  const pool = getPool();
  const result = await pool.query(`SELECT id, name, description, price, category, stock FROM shop_products ORDER BY id`);
  return result.rows as Product[];
}

export async function getAdminNotes(): Promise<{ note_type: string; note_data: string }[]> {
  const pool = getPool();
  const result = await pool.query(`SELECT note_type, note_data FROM shop_admin_notes`);
  return result.rows as { note_type: string; note_data: string }[];
}
