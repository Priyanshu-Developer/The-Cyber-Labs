-- ============================================
-- Lab 01: Employee Portal Seed Data
-- Raven Technologies employee records
-- ============================================

INSERT INTO portal_employees
    (employee_id, username, password, full_name, email, department, role, phone, hire_date, salary, clearance_level)
VALUES
    ('RVN-001', 'admin',      'SuperSecret!2024', 'Elena Cross',    'elena.cross@raven-tech.internal',   'Executive',  'admin',      '555-0100', '2018-03-15', 145000.00, 5),
    ('RVN-002', 'jthompson',  'Welcome123',       'James Thompson', 'james.thompson@raven-tech.internal','Engineering','employee',  '555-0101', '2020-06-01',  92000.00, 2),
    ('RVN-003', 'arivera',    'Alice2024!',       'Alice Rivera',   'alice.rivera@raven-tech.internal',  'Engineering','employee',  '555-0102', '2021-01-15',  88000.00, 2),
    ('RVN-004', 'rchen',      'Robert!99',        'Robert Chen',    'robert.chen@raven-tech.internal',   'Operations', 'employee',  '555-0103', '2019-09-20',  76000.00, 1),
    ('RVN-005', 'sgarcia',    'HR2024Secure',     'Sofia Garcia',   'sofia.garcia@raven-tech.internal',  'People Ops', 'hr_manager','555-0104', '2017-11-05',  98000.00, 4);

-- Verify: 5 employees loaded
-- admin / SuperSecret!2024  -> Executive, clearance 5
-- jthompson / Welcome123    -> Engineering
-- arivera / Alice2024!      -> Engineering
-- rchen / Robert!99         -> Marketing
-- sgarcia / HR2024Secure    -> HR Manager, clearance 4
