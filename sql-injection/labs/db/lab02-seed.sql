-- Lab 02 Seed Data - Raven Technologies
INSERT INTO raven_employees (id, name, department, email) VALUES
(101, 'Elena Cross', 'Executive', 'elena.cross@raven-tech.internal'),
(102, 'James Thompson', 'Engineering', 'james.thompson@raven-tech.internal'),
(103, 'Alice Rivera', 'Engineering', 'alice.rivera@raven-tech.internal'),
(104, 'Robert Chen', 'Operations', 'robert.chen@raven-tech.internal'),
(105, 'Sofia Garcia', 'People Ops', 'sofia.garcia@raven-tech.internal')
ON CONFLICT (id) DO NOTHING;

INSERT INTO raven_secret_archive (id, title, classification, secret_value) VALUES
(9001, 'Internal Security Audit', 'restricted', 'FLAG{ghost_records_uncovered}'),
(9002, 'Legacy Backup Location', 'confidential', 's3://raven-internal-backups/audit/'),
(9003, 'Directory Service Token', 'top-secret', 'rvn-dir-token-redacted-demo')
ON CONFLICT (id) DO NOTHING;

INSERT INTO raven_directory_users (username, password, employee_id) VALUES
('directory_admin', 'DirectoryP@ss123', 101)
ON CONFLICT (username) DO NOTHING;
