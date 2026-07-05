/**
 * Lab 03 - Database Layer
 * VULNERABLE: Account lookup uses string concatenation.
 * PostgreSQL CAST errors leak database information.
 */
import { getPool } from "@/lib/db";
import type { BankAccount } from "./types";

/**
 * VULNERABLE: Account lookup by account number.
 * Error messages are returned to the user, enabling
 * error-based data extraction via CAST or subqueries.
 */
export async function vulnerableAccountLookup(accountNumber: string): Promise<BankAccount | null> {
  const pool = getPool();
  const sql = `SELECT * FROM bank_accounts WHERE account_number='${accountNumber}' AND status='active'`;
  console.log("[LAB03 VULNERABLE]", sql);
  const result = await pool.query(sql);
  const rows = result.rows as BankAccount[];
  return rows.length > 0 ? rows[0] : null;
}

export async function getAccounts(): Promise<BankAccount[]> {
  const pool = getPool();
  const result = await pool.query(
    `SELECT id, account_number, account_holder, balance, account_type, status FROM bank_accounts ORDER BY account_number`
  );
  return result.rows as BankAccount[];
}

export async function getAdminConfig(): Promise<{ config_key: string; config_value: string }[]> {
  const pool = getPool();
  const result = await pool.query(`SELECT config_key, config_value FROM bank_admin_data`);
  return result.rows as { config_key: string; config_value: string }[];
}
