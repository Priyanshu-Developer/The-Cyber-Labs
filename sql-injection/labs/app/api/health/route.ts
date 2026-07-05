import { NextResponse } from "next/server";
import { checkDatabaseConnection, checkLabTablesExist } from "@/lib/db";

export async function GET() {
  const dbCheck = await checkDatabaseConnection();

  if (!dbCheck.connected) {
    return NextResponse.json(
      {
        status: "unhealthy",
        database: {
          connected: false,
          message: dbCheck.message,
        },
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }

  const tables = await checkLabTablesExist();

  return NextResponse.json({
    status: "healthy",
    database: {
      connected: true,
      message: dbCheck.message,
      latencyMs: dbCheck.latencyMs,
      tablesReady: tables.ready,
      tables: tables.tables,
    },
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
}
