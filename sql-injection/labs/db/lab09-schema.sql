-- Lab 09: API SQL Injection - REST API JSON Payloads
-- E-commerce product catalog with API endpoints

CREATE TABLE IF NOT EXISTS store_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    role VARCHAR(20) DEFAULT 'customer',
    api_key VARCHAR(64),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS store_products (
    id SERIAL PRIMARY KEY,
    sku VARCHAR(30) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS store_orders (
    id SERIAL PRIMARY KEY,
    order_number VARCHAR(30) UNIQUE NOT NULL,
    user_id INTEGER REFERENCES store_users(id),
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    shipping_address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS store_admin_secrets (
    id SERIAL PRIMARY KEY,
    secret_name VARCHAR(100) UNIQUE NOT NULL,
    secret_value TEXT NOT NULL,
    category VARCHAR(50)
);

-- Seed store_users
INSERT INTO store_users (username, password, email, role, api_key) VALUES
    ('admin', 'St0r3@dm1n!2024', 'admin@store.com', 'admin', 'sk-admin-9876543210abcdef'),
    ('manager', 'M@nager!2024', 'manager@store.com', 'manager', 'sk-mgr-1234567890abcdef'),
    ('alice_buyer', 'shop123!', 'alice@email.com', 'customer', 'sk-cus-alice-abcdef1234'),
    ('bob_shopper', 'shop456!', 'bob@email.com', 'customer', 'sk-cus-bob-bcdefa2345'),
    ('charlie_g', 'shop789!', 'charlie@email.com', 'customer', 'sk-cus-charlie-cdefab3456');

-- Seed store_products
INSERT INTO store_products (sku, name, description, category, price, stock) VALUES
    ('LAPTOP-001', 'Gaming Laptop Pro', 'High-performance gaming laptop with RTX 4080', 'Electronics', 2499.99, 15),
    ('PHONE-001', 'SmartPhone Ultra', 'Latest flagship smartphone with AI features', 'Electronics', 999.99, 50),
    ('HEADPHONE-001', 'Wireless ANC Headphones', 'Premium noise-cancelling headphones', 'Audio', 349.99, 30),
    ('KEYBOARD-001', 'Mechanical Gaming Keyboard', 'RGB mechanical keyboard with Cherry MX switches', 'Accessories', 149.99, 45),
    ('MOUSE-001', 'Precision Gaming Mouse', '16000 DPI wireless gaming mouse', 'Accessories', 79.99, 60),
    ('MONITOR-001', '4K UltraWide Monitor', '34-inch curved 4K monitor', 'Electronics', 899.99, 20),
    ('WEBCAM-001', 'HD Streaming Webcam', '1080p webcam with ring light', 'Accessories', 129.99, 35),
    ('SSD-001', 'NVMe SSD 2TB', 'Ultra-fast NVMe storage drive', 'Storage', 199.99, 40),
    ('RAM-001', 'DDR5 RAM Kit 32GB', 'High-speed DDR5 memory kit', 'Components', 149.99, 25),
    ('CPU-001', 'Processor Ryzen 9', '16-core desktop processor', 'Components', 549.99, 10);

-- Seed store_orders
INSERT INTO store_orders (order_number, user_id, total_amount, status, shipping_address) VALUES
    ('ORD-2024-001', 3, 2849.98, 'delivered', '123 Main St, Springfield'),
    ('ORD-2024-002', 4, 349.99, 'shipped', '456 Oak Ave, Shelbyville'),
    ('ORD-2024-003', 5, 1149.98, 'pending', '789 Pine Rd, Capital City');

-- Seed store_admin_secrets
INSERT INTO store_admin_secrets (secret_name, secret_value, category) VALUES
    ('payment_gateway_key', 'pgk-9876-abc-def-456', 'payment'),
    ('stripe_secret', 'sk_live_51ABCDEF123456789', 'payment'),
    ('aws_access_key', 'AKIAIOSFODNN7EXAMPLE', 'infrastructure'),
    ('jwt_signing_key', 'JWT-S1GN1NG-K3Y-2024-XYZ', 'auth'),
    ('admin_webhook_url', 'https://hooks.store.com/admin/secret-events', 'integration');
