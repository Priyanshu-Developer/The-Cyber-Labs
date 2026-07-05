-- Lab 03 Seed Data
INSERT INTO bank_accounts (account_number, account_holder, balance, account_type, status) VALUES
('ACC-1001','Alice Johnson',15420.50,'checking','active'),
('ACC-1002','Bob Williams',82100.00,'savings','active'),
('ACC-1003','Carol Davis',3200.75,'checking','active'),
('ACC-1004','David Brown',45000.00,'savings','frozen'),
('ACC-1005','Eve Martinez',980.25,'checking','active');
INSERT INTO bank_users (username, password, account_number, role) VALUES
('alice_j','B@nk2024!','ACC-1001','customer'),
('bob_w','S@vings99','ACC-1002','customer'),
('bank_admin','Adm1n$ecure','ACC-1001','admin');
INSERT INTO bank_admin_data (config_key, config_value, notes) VALUES
('SYSTEM_VERSION','SecureBank v3.2.1','Current production version'),
('MAINTENANCE_KEY','mx-7k2p-maint-2024','Used for emergency shutdowns'),
('db_master_password','VaultRoot-93!transfer','Emergency database access credential'),
('api_secret_key','sk-live-bank-xY4z8w2q-incident','Wire-transfer approval API key'),
('INCIDENT_APPROVAL_PHRASE','orchid-window-71','Used during incident bridge verification');
