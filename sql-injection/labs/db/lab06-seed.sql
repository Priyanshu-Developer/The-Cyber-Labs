-- Lab 06 Seed Data
INSERT INTO shop_products (name, description, price, category, stock) VALUES
('Mechanical Keyboard','RGB backlit mechanical keyboard',89.99,'Electronics',50),
('Wireless Mouse','Ergonomic wireless mouse',29.99,'Electronics',200),
('Security Camera','HD indoor security camera',129.99,'Security',75),
('Network Switch','8-port Gigabit switch',59.99,'Networking',30),
('USB-C Hub','7-in-1 USB-C adapter',44.99,'Electronics',120);
INSERT INTO shop_users (username, password, email, role) VALUES
('customer_bob','Shop2024!','bob@example.com','customer'),
('shop_admin','Adm1n$hop','admin@shop.com','admin');
INSERT INTO shop_admin_notes (note_type, note_data) VALUES
('API_KEY','pk_live_shop_xY4z8w2qR7mN3vB9'),
('SUPPLIER_PASSWORD',' supplier-db-pass: S3cur3Supp!2024'),
('INTERNAL_URL','https://admin.internal.shop.com/backup'),
('FULFILLMENT_FLAG','FLAG{stored_payloads_wake_up_later}');
