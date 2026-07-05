-- Lab 04: Boolean Blind SQLi - Hospital Database
CREATE TABLE IF NOT EXISTS hospital_patients (
    id SERIAL PRIMARY KEY,
    patient_id VARCHAR(20) NOT NULL UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    diagnosis TEXT,
    treatment TEXT,
    attending_doctor VARCHAR(200),
    room_number VARCHAR(10)
);
CREATE TABLE IF NOT EXISTS hospital_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'nurse'
);
CREATE TABLE IF NOT EXISTS hospital_confidential (
    id SERIAL PRIMARY KEY,
    record_type VARCHAR(100) NOT NULL,
    record_data TEXT NOT NULL
);
