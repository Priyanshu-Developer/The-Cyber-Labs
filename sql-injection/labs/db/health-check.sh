#!/bin/sh
# ============================================
# Database Readiness Check Script
# ============================================
# Waits for PostgreSQL to be fully ready before
# allowing the application to start.
# ============================================

set -e

# Configuration (with defaults)
DB_HOST="${POSTGRES_HOST:-localhost}"
DB_PORT="${POSTGRES_PORT:-5432}"
DB_NAME="${POSTGRES_DB:-cyberlabs}"
DB_USER="${POSTGRES_USER:-cyberlabs}"
MAX_RETRIES="${DB_MAX_RETRIES:-30}"
RETRY_INTERVAL="${DB_RETRY_INTERVAL:-2}"

echo "============================================"
echo "  CyberLabs Database Health Check"
echo "============================================"
echo "  Host:     $DB_HOST"
echo "  Port:     $DB_PORT"
echo "  Database: $DB_NAME"
echo "  User:     $DB_USER"
echo "============================================"

# Function to check if PostgreSQL is accepting connections
check_postgres() {
    # Method 1: Use pg_isready if available
    if command -v pg_isready > /dev/null 2>&1; then
        pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" > /dev/null 2>&1
        return $?
    fi

    # Method 2: Try TCP connection using Node.js
    node -e "
        const net = require('net');
        const client = new net.Socket();
        const timeout = 2000;

        client.setTimeout(timeout);
        client.connect($DB_PORT, '$DB_HOST', () => {
            client.destroy();
            process.exit(0);
        });

        client.on('timeout', () => {
            client.destroy();
            process.exit(1);
        });

        client.on('error', () => {
            process.exit(1);
        });
    " 2>/dev/null
    return $?
}

# Function to check if database is queryable
check_database() {
    node -e "
        const { Pool } = require('pg');
        const pool = new Pool({
            host: '$DB_HOST',
            port: $DB_PORT,
            database: '$DB_NAME',
            user: '$DB_USER',
            password: process.env.POSTGRES_PASSWORD || 'cyberlabs_secret_2024',
            connectionTimeoutMillis: 3000,
        });

        pool.query('SELECT 1 as ok')
            .then(() => {
                pool.end();
                process.exit(0);
            })
            .catch(() => {
                pool.end();
                process.exit(1);
            });
    " 2>/dev/null
    return $?
}

echo ""
echo "Waiting for PostgreSQL to be ready..."

# Phase 1: Wait for PostgreSQL to accept TCP connections
retries=0
while [ $retries -lt $MAX_RETRIES ]; do
    if check_postgres; then
        echo "[OK] PostgreSQL is accepting connections"
        break
    fi
    retries=$((retries + 1))
    echo "[...] Attempt $retries/$MAX_RETRIES - PostgreSQL not ready yet, retrying in ${RETRY_INTERVAL}s..."
    sleep $RETRY_INTERVAL
done

if [ $retries -eq $MAX_RETRIES ]; then
    echo "[ERROR] PostgreSQL did not become ready within $((MAX_RETRIES * RETRY_INTERVAL))s"
    exit 1
fi

# Phase 2: Wait for database to be queryable
echo ""
echo "Verifying database is queryable..."
retries=0
while [ $retries -lt $MAX_RETRIES ]; do
    if check_database; then
        echo "[OK] Database '$DB_NAME' is queryable"
        break
    fi
    retries=$((retries + 1))
    echo "[...] Attempt $retries/$MAX_RETRIES - Database not queryable yet, retrying in ${RETRY_INTERVAL}s..."
    sleep $RETRY_INTERVAL
done

if [ $retries -eq $MAX_RETRIES ]; then
    echo "[ERROR] Database '$DB_NAME' did not become queryable within $((MAX_RETRIES * RETRY_INTERVAL))s"
    exit 1
fi

echo ""
echo "============================================"
echo "  Database is ready!"
echo "============================================"
echo ""
