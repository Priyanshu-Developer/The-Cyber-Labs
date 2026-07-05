import { Pool, type PoolConfig } from "pg";

const dbConfig: PoolConfig = {
  host: process.env.POSTGRES_HOST || "localhost",
  port: parseInt(process.env.POSTGRES_PORT || "5432"),
  database: process.env.POSTGRES_DB || "cyberlabs",
  user: process.env.POSTGRES_USER || "cyberlabs",
  password: process.env.POSTGRES_PASSWORD || "cyberlabs_secret_2024",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
};

let pool: Pool | null = null;

export function getPool(): Pool {
  if (!pool) {
    pool = new Pool(dbConfig);
    pool.on("error", (err) => {
      console.error("Unexpected database error:", err);
    });
  }
  return pool;
}

export async function query<T = unknown>(text: string, params?: unknown[]) {
  const client = await getPool().connect();
  try {
    const result = await client.query(text, params);
    return result as { rows: T[]; rowCount: number | null };
  } finally {
    client.release();
  }
}

export async function checkDatabaseConnection(): Promise<{
  connected: boolean;
  message: string;
  latencyMs?: number;
}> {
  const start = Date.now();
  try {
    const result = await query("SELECT NOW() as current_time, current_database() as db_name");
    const latencyMs = Date.now() - start;
    const row = result.rows[0] as { current_time: string; db_name: string };
    return {
      connected: true,
      message: `Connected to ${row.db_name} at ${row.current_time}`,
      latencyMs,
    };
  } catch (error) {
    const latencyMs = Date.now() - start;
    const msg = error instanceof Error ? error.message : "Unknown error";
    return {
      connected: false,
      message: `Connection failed: ${msg}`,
      latencyMs,
    };
  }
}

export async function checkLabTablesExist(): Promise<{
  ready: boolean;
  tables: string[];
}> {
  try {
    const result = await query<{ tablename: string }>(
      "SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename"
    );
    const tables = result.rows.map((r) => r.tablename);
    const required = ["users", "products", "employees", "patients", "students"];
    const ready = required.every((t) => tables.includes(t));
    return { ready, tables };
  } catch {
    return { ready: false, tables: [] };
  }
}
