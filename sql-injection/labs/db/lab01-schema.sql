-- ============================================
-- Lab 01: Authentication Bypass - Raven Technologies Employee Portal
-- Schema: Lab-specific tables
-- ============================================

-- Portal employees (login credentials + profile)
CREATE TABLE IF NOT EXISTS portal_employees (
    id SERIAL PRIMARY KEY,
    employee_id VARCHAR(20) NOT NULL UNIQUE,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(200) NOT NULL,
    email VARCHAR(255) NOT NULL,
    department VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'employee',
    phone VARCHAR(30),
    hire_date DATE NOT NULL,
    salary DECIMAL(10,2),
    clearance_level INTEGER DEFAULT 1
);

-- Active sessions
CREATE TABLE IF NOT EXISTS portal_sessions (
    id SERIAL PRIMARY KEY,
    session_token VARCHAR(128) NOT NULL UNIQUE,
    employee_id INTEGER REFERENCES portal_employees(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL
);
