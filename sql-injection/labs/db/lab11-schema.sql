-- Lab 11: Stacked Queries - Batch Queries + Privilege Escalation
-- Booking/reservation system with stacked query vulnerability

CREATE TABLE IF NOT EXISTS booking_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) DEFAULT 'guest',
    loyalty_points INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS booking_rooms (
    id SERIAL PRIMARY KEY,
    room_number VARCHAR(10) UNIQUE NOT NULL,
    room_type VARCHAR(30) NOT NULL,
    floor INTEGER NOT NULL,
    price_per_night DECIMAL(8,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'available',
    amenities TEXT
);

CREATE TABLE IF NOT EXISTS booking_reservations (
    id SERIAL PRIMARY KEY,
    reservation_code VARCHAR(20) UNIQUE NOT NULL,
    user_id INTEGER REFERENCES booking_users(id),
    room_id INTEGER REFERENCES booking_rooms(id),
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'confirmed',
    special_requests TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS booking_staff (
    id SERIAL PRIMARY KEY,
    staff_id VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    position VARCHAR(50) NOT NULL,
    salary DECIMAL(10,2),
    access_level INTEGER DEFAULT 1,
    hire_date DATE
);

CREATE TABLE IF NOT EXISTS booking_vip_notes (
    id SERIAL PRIMARY KEY,
    guest_name VARCHAR(100),
    room_id INTEGER,
    note TEXT NOT NULL,
    priority VARCHAR(10) DEFAULT 'normal',
    created_by VARCHAR(50)
);

-- Seed booking_users
INSERT INTO booking_users (username, password, full_name, role, loyalty_points) VALUES
    ('admin', 'H0tel@dm1n!2024', 'Hotel Admin', 'admin', 0),
    ('front.desk', 'Fr0ntD3sk!', 'Reception Staff', 'staff', 0),
    ('guest.alice', 'b00k1ng!', 'Alice Wonderland', 'guest', 2500),
    ('guest.bob', 'b00k1ng!', 'Bob Builder', 'guest', 1800),
    ('guest.charlie', 'b00k1ng!', 'Charlie Chocolate', 'guest', 500),
    ('vip.diana', 'v1p2024!', 'Diana Prince', 'vip', 15000);

-- Seed booking_rooms
INSERT INTO booking_rooms (room_number, room_type, floor, price_per_night, status, amenities) VALUES
    ('101', 'Standard', 1, 99.99, 'available', 'WiFi, TV, Mini-bar'),
    ('102', 'Standard', 1, 99.99, 'occupied', 'WiFi, TV, Mini-bar'),
    ('201', 'Deluxe', 2, 199.99, 'available', 'WiFi, TV, Mini-bar, Ocean View'),
    ('202', 'Deluxe', 2, 199.99, 'maintenance', 'WiFi, TV, Mini-bar, Ocean View'),
    ('301', 'Suite', 3, 399.99, 'available', 'WiFi, TV, Full Bar, Jacuzzi, Panoramic View'),
    ('302', 'Suite', 3, 499.99, 'occupied', 'WiFi, TV, Full Bar, Jacuzzi, Panoramic View, Private Pool'),
    ('401', 'Penthouse', 4, 999.99, 'available', 'WiFi, TV, Full Bar, Private Pool, Butler Service, Helipad');

-- Seed booking_staff
INSERT INTO booking_staff (staff_id, name, position, salary, access_level, hire_date) VALUES
    ('STF-001', 'Tom Manager', 'General Manager', 95000.00, 5, '2018-01-15'),
    ('STF-002', 'Lisa Reception', 'Head Receptionist', 52000.00, 3, '2020-03-20'),
    ('STF-003', 'Mark Guard', 'Security Lead', 58000.00, 4, '2019-07-10'),
    ('STF-004', 'Nina Housekeep', 'Head of Housekeeping', 48000.00, 2, '2021-01-05'),
    ('STF-005', 'Jake Chef', 'Executive Chef', 72000.00, 3, '2020-06-15');

-- Seed booking_reservations
INSERT INTO booking_reservations (reservation_code, user_id, room_id, check_in, check_out, total_price, status, special_requests) VALUES
    ('RES-2024-001', 3, 1, '2024-07-01', '2024-07-05', 399.96, 'confirmed', 'Late check-in around 11pm'),
    ('RES-2024-002', 4, 3, '2024-07-10', '2024-07-15', 999.95, 'confirmed', 'Anniversary celebration'),
    ('RES-2024-003', 6, 7, '2024-08-01', '2024-08-07', 5999.94, 'confirmed', 'VIP treatment requested');

-- Seed booking_vip_notes
INSERT INTO booking_vip_notes (guest_name, room_id, note, priority, created_by) VALUES
    ('Diana Prince', 7, 'Celebrity guest. Ensure maximum privacy. No photos allowed.', 'critical', 'admin'),
    ('Diana Prince', 7, 'Allergic to shellfish. Chef notified for all meals.', 'high', 'front.desk'),
    ('VIP Guest', 5, 'Corporate VIP partner. Complimentary upgrades when available.', 'high', 'admin');
