-- Lab 08: Admin Dashboard - UNION + Role Escalation
-- Employee directory with role-based access

CREATE TABLE IF NOT EXISTS emp_directory_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) DEFAULT 'user',
    department VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS emp_directory_staff (
    id SERIAL PRIMARY KEY,
    employee_id VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    department VARCHAR(50) NOT NULL,
    position VARCHAR(100) NOT NULL,
    salary DECIMAL(10,2),
    hire_date DATE,
    manager_id INTEGER REFERENCES emp_directory_staff(id),
    is_active BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS emp_directory_notes (
    id SERIAL PRIMARY KEY,
    note_title VARCHAR(200) NOT NULL,
    note_content TEXT NOT NULL,
    classification VARCHAR(20) DEFAULT 'confidential',
    created_by INTEGER REFERENCES emp_directory_users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed emp_directory_users
INSERT INTO emp_directory_users (username, password, full_name, role, department) VALUES
    ('admin', 'Adm1n!2024$', 'Administrator', 'admin', 'IT'),
    ('hr.lead', 'HrP@ss2024', 'HR Director', 'manager', 'Human Resources'),
    ('john.smith', 'user123!', 'John Smith', 'user', 'Engineering'),
    ('jane.doe', 'user456!', 'Jane Doe', 'user', 'Marketing'),
    ('bob.wilson', 'user789!', 'Bob Wilson', 'user', 'Sales'),
    ('alice.jones', 'qwerty!', 'Alice Jones', 'user', 'Support'),
    ('charlie.brown', 'pass123!', 'Charlie Brown', 'user', 'Engineering'),
    ('diana.prince', 'letme1n!', 'Diana Prince', 'manager', 'Engineering');

-- Seed emp_directory_staff
INSERT INTO emp_directory_staff (employee_id, first_name, last_name, email, department, position, salary, hire_date, manager_id) VALUES
    ('EMP001', 'James', 'Anderson', 'james.a@company.com', 'Engineering', 'Senior Developer', 95000.00, '2020-03-15', NULL),
    ('EMP002', 'Maria', 'Garcia', 'maria.g@company.com', 'Engineering', 'Tech Lead', 110000.00, '2019-06-20', 1),
    ('EMP003', 'Robert', 'Chen', 'robert.c@company.com', 'Engineering', 'Junior Developer', 65000.00, '2023-01-10', 2),
    ('EMP004', 'Jennifer', 'Taylor', 'jennifer.t@company.com', 'Marketing', 'Marketing Manager', 85000.00, '2021-04-05', NULL),
    ('EMP005', 'Michael', 'Brown', 'michael.b@company.com', 'Sales', 'Sales Representative', 55000.00, '2022-08-12', NULL),
    ('EMP006', 'Emily', 'Davis', 'emily.d@company.com', 'HR', 'HR Specialist', 62000.00, '2021-11-30', NULL),
    ('EMP007', 'David', 'Wilson', 'david.w@company.com', 'Finance', 'Financial Analyst', 78000.00, '2020-09-22', NULL),
    ('EMP008', 'Sarah', 'Miller', 'sarah.m@company.com', 'Support', 'Support Lead', 72000.00, '2022-02-14', NULL),
    ('EMP009', 'Kevin', 'Lee', 'kevin.l@company.com', 'Engineering', 'DevOps Engineer', 92000.00, '2021-07-18', 2),
    ('EMP010', 'Amanda', 'Clark', 'amanda.c@company.com', 'Marketing', 'Content Specialist', 58000.00, '2023-05-01', 4),
    ('EMP011', 'Chris', 'Johnson', 'chris.j@company.com', 'Sales', 'Sales Director', 98000.00, '2019-01-15', NULL),
    ('EMP012', 'Lisa', 'Anderson', 'lisa.a@company.com', 'Finance', 'CFO', 135000.00, '2018-03-01', NULL);

-- Seed emp_directory_notes
INSERT INTO emp_directory_notes (note_title, note_content, classification, created_by) VALUES
    ('Q4 Budget Review', 'Marketing budget increased by 15%. Engineering headcount approved for 3 new positions.', 'confidential', 1),
    ('Salary Adjustment Policy', 'Annual review cycle: 3-5% base increase, up to 10% for high performers.', 'highly_confidential', 2),
    ('Security Incident', 'Unauthorized access attempt detected. IP blocked. Review pending.', 'top_secret', 1),
    ('Mergers Discussion', 'Preliminary talks with TechCorp. Due diligence phase.', 'top_secret', 1);
