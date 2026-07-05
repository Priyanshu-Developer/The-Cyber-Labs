-- Lab 03: Error-based SQL Injection - Banking System
CREATE TABLE IF NOT EXISTS bank_accounts (
    id SERIAL PRIMARY KEY,
    account_number VARCHAR(20) NOT NULL UNIQUE,
    account_holder VARCHAR(200) NOT NULL,
    balance DECIMAL(12,2) NOT NULL DEFAULT 0,
    account_type VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'active'
);
CREATE TABLE IF NOT EXISTS bank_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    account_number VARCHAR(20) REFERENCES bank_accounts(account_number),
    role VARCHAR(50) DEFAULT 'customer'
);
CREATE TABLE IF NOT EXISTS bank_admin_data (
    id SERIAL PRIMARY KEY,
    config_key VARCHAR(100) NOT NULL UNIQUE,
    config_value TEXT NOT NULL,
    notes TEXT
);
