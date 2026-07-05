-- Lab 07: CRM System - Error-based Double Query Injection
-- CRM customer database with employees and admin config

CREATE TABLE IF NOT EXISTS crm_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) DEFAULT 'user',
    department VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS crm_customers (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    company VARCHAR(100),
    status VARCHAR(20) DEFAULT 'active',
    revenue DECIMAL(12,2) DEFAULT 0,
    assigned_to INTEGER REFERENCES crm_users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS crm_deals (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES crm_customers(id),
    deal_name VARCHAR(200) NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    stage VARCHAR(50) DEFAULT 'prospect',
    close_date DATE,
    created_by INTEGER REFERENCES crm_users(id)
);

CREATE TABLE IF NOT EXISTS crm_admin_config (
    id SERIAL PRIMARY KEY,
    config_key VARCHAR(100) UNIQUE NOT NULL,
    config_value TEXT NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS crm_audit_log (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    action VARCHAR(100),
    details TEXT,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed crm_users
INSERT INTO crm_users (username, password, full_name, role, department) VALUES
    ('admin', 'crm@dm1n$2024', 'System Administrator', 'admin', 'IT'),
    ('sarah.chen', 'Passw0rd!', 'Sarah Chen', 'manager', 'Sales'),
    ('mike.wilson', 'qwerty123', 'Mike Wilson', 'user', 'Sales'),
    ('emma.davis', 'letmein!', 'Emma Davis', 'user', 'Support'),
    ('james.brown', 'admin123', 'James Brown', 'user', 'Marketing'),
    ('lisa.taylor', 'summer2024', 'Lisa Taylor', 'manager', 'Support'),
    ('david.martinez', 'password1', 'David Martinez', 'user', 'Sales'),
    ('rachel.kim', 'welcome!', 'Rachel Kim', 'user', 'Marketing');

-- Seed crm_customers
INSERT INTO crm_customers (first_name, last_name, email, phone, company, status, revenue, assigned_to) VALUES
    ('John', 'Smith', 'john.smith@acme.com', '+1-555-0101', 'Acme Corp', 'active', 245000.00, 3),
    ('Jane', 'Doe', 'jane.doe@globex.com', '+1-555-0102', 'Globex Inc', 'active', 189500.00, 3),
    ('Bob', 'Johnson', 'bob.j@initech.com', '+1-555-0103', 'Initech', 'active', 312000.00, 4),
    ('Alice', 'Williams', 'alice.w@umbrella.co', '+1-555-0104', 'Umbrella Co', 'lead', 0.00, 5),
    ('Charlie', 'Brown', 'charlie.b@stark.com', '+1-555-0105', 'Stark Industries', 'active', 567000.00, 3),
    ('Diana', 'Prince', 'diana.p@wayne.com', '+1-555-0106', 'Wayne Enterprises', 'active', 890000.00, 7),
    ('Eve', 'Adams', 'eve.a@oscorp.com', '+1-555-0107', 'Oscorp', 'inactive', 45000.00, 8),
    ('Frank', 'Miller', 'frank.m@lexcorp.com', '+1-555-0108', 'LexCorp', 'lead', 0.00, 4),
    ('Grace', 'Lee', 'grace.l@cyberdyne.com', '+1-555-0109', 'Cyberdyne Systems', 'active', 123000.00, 7),
    ('Henry', 'Taylor', 'henry.t@soylent.com', '+1-555-0110', 'Soylent Corp', 'active', 278000.00, 3);

-- Seed crm_deals
INSERT INTO crm_deals (customer_id, deal_name, amount, stage, close_date, created_by) VALUES
    (1, 'Enterprise License Renewal', 125000.00, 'closed_won', '2024-06-15', 3),
    (2, 'Cloud Migration Project', 89000.00, 'negotiation', '2024-08-30', 3),
    (3, 'Security Audit Contract', 45000.00, 'proposal', '2024-07-20', 4),
    (5, 'AI Integration Suite', 234000.00, 'closed_won', '2024-05-10', 3),
    (6, 'Global Expansion Support', 345000.00, 'negotiation', '2024-09-01', 7),
    (9, 'Data Analytics Platform', 67000.00, 'prospect', NULL, 7),
    (10, 'Training Program', 28000.00, 'proposal', '2024-08-15', 3);

-- Seed crm_admin_config
INSERT INTO crm_admin_config (config_key, config_value, description) VALUES
    ('api_secret_key', 'CRM-S3CR3T-K3Y-2024-X9Z', 'Secret key for API authentication'),
    ('db_master_password', 'P0stgr3s@dm1n!2024', 'Database master password'),
    ('smtp_password', 'email_p@ssw0rd_2024', 'SMTP email service password'),
    ('encryption_key', 'AES-256-K3Y-XYZ789ABC', 'Data encryption key'),
    ('backup_token', 'BKP-TKN-9876-ABCD-EFGH', 'Backup system access token');
