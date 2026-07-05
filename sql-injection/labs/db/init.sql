-- ============================================
-- CyberLabs SQL Injection Training Database
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- Core Tables
-- ============================================

-- Users table (for lab authentication scenarios)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    role VARCHAR(50) DEFAULT 'user',
    full_name VARCHAR(200),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Products table (for e-commerce lab scenarios)
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100),
    stock_quantity INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Orders table (for banking/finance lab scenarios)
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    product_id UUID REFERENCES products(id),
    quantity INTEGER NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Employees table (for HR portal lab scenarios)
CREATE TABLE IF NOT EXISTS employees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    department VARCHAR(100),
    salary DECIMAL(10, 2),
    hire_date DATE,
    manager_id UUID REFERENCES employees(id)
);

-- Patients table (for hospital lab scenarios)
CREATE TABLE IF NOT EXISTS patients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE,
    email VARCHAR(255),
    phone VARCHAR(20),
    medical_record_number VARCHAR(50) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Students table (for university lab scenarios)
CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id VARCHAR(50) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    major VARCHAR(100),
    gpa DECIMAL(3, 2),
    enrollment_date DATE
);

-- Courses table (for university lab scenarios)
CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_code VARCHAR(20) UNIQUE NOT NULL,
    course_name VARCHAR(200) NOT NULL,
    credits INTEGER,
    department VARCHAR(100)
);

-- Enrollments table (for university lab scenarios)
CREATE TABLE IF NOT EXISTS enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id),
    course_id UUID REFERENCES courses(id),
    grade VARCHAR(5),
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- CRM contacts table (for CRM lab scenarios)
CREATE TABLE IF NOT EXISTS contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    company VARCHAR(200),
    status VARCHAR(50) DEFAULT 'lead',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Audit log table (for tracking activities)
CREATE TABLE IF NOT EXISTS audit_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    action VARCHAR(100) NOT NULL,
    table_name VARCHAR(100),
    record_id UUID,
    user_id UUID,
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Seed Data
-- ============================================

-- Insert test users (intentionally vulnerable for SQLi labs)
INSERT INTO users (username, password, email, role, full_name) VALUES
    ('admin', 'admin123', 'admin@cyberlabs.com', 'admin', 'System Administrator'),
    ('john_doe', 'password123', 'john@example.com', 'user', 'John Doe'),
    ('jane_smith', 'qwerty', 'jane@example.com', 'manager', 'Jane Smith'),
    ('bob_wilson', 'letmein', 'bob@example.com', 'user', 'Bob Wilson'),
    ('alice_brown', 'abc123', 'alice@example.com', 'editor', 'Alice Brown'),
    ('test_user', 'test', 'test@cyberlabs.com', 'user', 'Test User')
ON CONFLICT (username) DO NOTHING;

-- Insert products
INSERT INTO products (name, description, price, category, stock_quantity) VALUES
    ('Laptop Pro', 'High-performance laptop', 1299.99, 'Electronics', 50),
    ('Wireless Mouse', 'Ergonomic wireless mouse', 29.99, 'Electronics', 200),
    ('Security Book', 'Web Application Security Guide', 49.99, 'Books', 100),
    ('USB Drive', 'Encrypted USB drive 64GB', 39.99, 'Electronics', 150),
    ('Monitor 27"', '4K IPS Display', 449.99, 'Electronics', 30),
    ('Keyboard', 'Mechanical RGB keyboard', 89.99, 'Electronics', 75)
ON CONFLICT DO NOTHING;

-- Insert employees
INSERT INTO employees (first_name, last_name, email, department, salary, hire_date) VALUES
    ('Sarah', 'Connor', 'sarah@corp.com', 'Engineering', 95000.00, '2020-01-15'),
    ('Mike', 'Reynolds', 'mike@corp.com', 'Marketing', 65000.00, '2021-03-20'),
    ('Emily', 'Chen', 'emily@corp.com', 'Engineering', 105000.00, '2019-06-10'),
    ('David', 'Park', 'david@corp.com', 'HR', 72000.00, '2020-09-01'),
    ('Lisa', 'Johnson', 'lisa@corp.com', 'Finance', 88000.00, '2018-11-05')
ON CONFLICT DO NOTHING;

-- Insert patients
INSERT INTO patients (first_name, last_name, date_of_birth, email, phone, medical_record_number) VALUES
    ('John', 'Patient', '1985-04-12', 'john.p@email.com', '555-0101', 'MRN-001'),
    ('Maria', 'Garcia', '1990-08-23', 'maria.g@email.com', '555-0102', 'MRN-002'),
    ('Robert', 'Taylor', '1978-12-01', 'robert.t@email.com', '555-0103', 'MRN-003'),
    ('Jennifer', 'Lee', '1995-02-14', 'jennifer.l@email.com', '555-0104', 'MRN-004')
ON CONFLICT (medical_record_number) DO NOTHING;

-- Insert students
INSERT INTO students (student_id, first_name, last_name, email, major, gpa, enrollment_date) VALUES
    ('STU-001', 'Alex', 'Turner', 'alex@uni.edu', 'Computer Science', 3.85, '2022-09-01'),
    ('STU-002', 'Sam', 'Wilson', 'sam@uni.edu', 'Cybersecurity', 3.92, '2022-09-01'),
    ('STU-003', 'Jordan', 'Casey', 'jordan@uni.edu', 'Computer Science', 3.45, '2023-01-15'),
    ('STU-004', 'Riley', 'Adams', 'riley@uni.edu', 'Information Technology', 3.78, '2023-01-15')
ON CONFLICT (student_id) DO NOTHING;

-- Insert courses
INSERT INTO courses (course_code, course_name, credits, department) VALUES
    ('CS101', 'Introduction to Programming', 3, 'Computer Science'),
    ('CS301', 'Database Systems', 3, 'Computer Science'),
    ('SEC201', 'Web Security', 3, 'Cybersecurity'),
    ('SEC401', 'Penetration Testing', 4, 'Cybersecurity')
ON CONFLICT (course_code) DO NOTHING;

-- ============================================
-- Functions and Triggers
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to users table
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Permissions
-- ============================================

-- Grant permissions to the application user
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO cyberlabs;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO cyberlabs;
