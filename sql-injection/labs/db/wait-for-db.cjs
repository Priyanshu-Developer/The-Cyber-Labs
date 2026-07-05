/**
 * Database Readiness Check Script
 *
 * Runs before the Next.js server starts to ensure PostgreSQL is fully ready.
 * Uses only Node.js built-in modules (net) for TCP check, no external deps.
 *
 * Environment variables:
 *   POSTGRES_HOST     - Database host (default: localhost)
 *   POSTGRES_PORT     - Database port (default: 5432)
 *   DB_MAX_RETRIES    - Max retry attempts (default: 30)
 *   DB_RETRY_INTERVAL - Seconds between retries (default: 2)
 */

const net = require("net");

const DB_HOST = process.env.POSTGRES_HOST || "localhost";
const DB_PORT = parseInt(process.env.POSTGRES_PORT || "5432", 10);
const MAX_RETRIES = parseInt(process.env.DB_MAX_RETRIES || "30", 10);
const RETRY_INTERVAL = parseInt(process.env.DB_RETRY_INTERVAL || "2", 10);

function checkTcpConnection() {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    const timeout = 3000;

    socket.setTimeout(timeout);

    socket.on("connect", () => {
      socket.destroy();
      resolve(true);
    });

    socket.on("timeout", () => {
      socket.destroy();
      resolve(false);
    });

    socket.on("error", () => {
      socket.destroy();
      resolve(false);
    });

    socket.connect(DB_PORT, DB_HOST);
  });
}

async function waitForDatabase() {
  console.log("============================================");
  console.log("  CyberLabs Database Health Check");
  console.log("============================================");
  console.log(`  Host: ${DB_HOST}`);
  console.log(`  Port: ${DB_PORT}`);
  console.log(`  Max retries: ${MAX_RETRIES}`);
  console.log(`  Retry interval: ${RETRY_INTERVAL}s`);
  console.log("============================================\n");
  console.log("Waiting for PostgreSQL to be ready...\n");

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const connected = await checkTcpConnection();

    if (connected) {
      // Wait an extra moment for PostgreSQL to finish initializing
      await new Promise((r) => setTimeout(r, 1000));
      console.log("[OK] PostgreSQL is accepting connections\n");
      return true;
    }

    const elapsed = attempt * RETRY_INTERVAL;
    console.log(
      `[...] Attempt ${attempt}/${MAX_RETRIES} - Not ready yet (elapsed: ${elapsed}s)`
    );
    await new Promise((r) => setTimeout(r, RETRY_INTERVAL * 1000));
  }

  console.error(
    `[ERROR] PostgreSQL did not become ready within ${MAX_RETRIES * RETRY_INTERVAL}s`
  );
  return false;
}

waitForDatabase()
  .then((ready) => {
    if (ready) {
      console.log("============================================");
      console.log("  Database is ready! Starting application...");
      console.log("============================================\n");
      process.exit(0);
    } else {
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error("Fatal error during database check:", err);
    process.exit(1);
  });
