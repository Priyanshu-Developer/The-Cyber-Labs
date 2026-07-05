#!/bin/sh
# ============================================
# Lab Reset Script
# ============================================
# Drops and recreates lab database tables.
# Run this to restore the lab to its initial state.
# ============================================

set -e

echo "============================================"
echo "  The Cyber Labs Reset"
echo "============================================"

# Check if docker compose is available
if ! command -v docker > /dev/null 2>&1; then
    echo "[ERROR] Docker is not installed."
    exit 1
fi

echo ""
echo "Stopping containers..."
docker compose down

echo ""
echo "Removing database volume..."
docker volume rm labs_postgres_data 2>/dev/null || true

echo ""
echo "Starting fresh containers..."
docker compose up -d postgres

echo ""
echo "Waiting for PostgreSQL to be ready..."
sleep 5

# Run init scripts manually
echo ""
echo "Initializing database schema..."
docker compose exec -T postgres psql -U cyberlabs -d cyberlabs -f /docker-entrypoint-initdb.d/01-init.sql 2>/dev/null || true
docker compose exec -T postgres psql -U cyberlabs -d cyberlabs -f /docker-entrypoint-initdb.d/02-lab01-schema.sql 2>/dev/null || true
docker compose exec -T postgres psql -U cyberlabs -d cyberlabs -f /docker-entrypoint-initdb.d/03-lab01-seed.sql 2>/dev/null || true

echo ""
echo "Starting application..."
docker compose up -d app

echo ""
echo "============================================"
echo "  Lab reset complete!"
echo "  Portal: http://localhost:3000/lab/01-auth-bypass"
echo "============================================"
