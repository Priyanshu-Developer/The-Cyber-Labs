-- Lab 10: Blind SQLi Investigation - No Output Feedback
-- Patient medical records system (vulnerable to blind injection)

CREATE TABLE IF NOT EXISTS clinic_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) DEFAULT 'receptionist',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS clinic_patients (
    id SERIAL PRIMARY KEY,
    patient_id VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_of_birth DATE NOT NULL,
    ssn VARCHAR(11) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(100),
    address TEXT,
    blood_type VARCHAR(5),
    insurance_id VARCHAR(30),
    emergency_contact VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS clinic_records (
    id SERIAL PRIMARY KEY,
    patient_id VARCHAR(20) REFERENCES clinic_patients(patient_id),
    diagnosis TEXT NOT NULL,
    treatment TEXT,
    prescribed_meds TEXT,
    doctor_notes TEXT,
    visit_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    follow_up_date DATE
);

CREATE TABLE IF NOT EXISTS clinic_confidential (
    id SERIAL PRIMARY KEY,
    record_type VARCHAR(50) NOT NULL,
    patient_id VARCHAR(20),
    content TEXT NOT NULL,
    classification VARCHAR(20) DEFAULT 'confidential',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed clinic_users
INSERT INTO clinic_users (username, password, full_name, role) VALUES
    ('admin', 'Cl1n1c@dm1n!', 'Dr. Admin', 'admin'),
    ('nurse.jane', 'Nurse123!', 'Jane Morgan', 'nurse'),
    ('reception.bob', 'Front0ff1ce!', 'Bob Harris', 'receptionist'),
    ('dr.smith', 'D0cToR!2024', 'Dr. Smith', 'doctor');

-- Seed clinic_patients
INSERT INTO clinic_patients (patient_id, first_name, last_name, date_of_birth, ssn, phone, email, address, blood_type, insurance_id, emergency_contact) VALUES
    ('PAT-001', 'John', 'Smith', '1985-03-15', '123-45-6789', '+1-555-1001', 'john.s@email.com', '100 Health Ave, MedCity', 'A+', 'INS-2001', 'Mary Smith: +1-555-1002'),
    ('PAT-002', 'Sarah', 'Johnson', '1990-07-22', '234-56-7890', '+1-555-1003', 'sarah.j@email.com', '200 Wellness Blvd, HealthTown', 'O-', 'INS-2002', 'Tom Johnson: +1-555-1004'),
    ('PAT-003', 'Michael', 'Williams', '1978-11-08', '345-67-8901', '+1-555-1005', 'michael.w@email.com', '300 Care Lane, Doctorville', 'B+', 'INS-2003', 'Lisa Williams: +1-555-1006'),
    ('PAT-004', 'Emily', 'Brown', '1995-01-30', '456-78-9012', '+1-555-1007', 'emily.b@email.com', '400 Cure Street, Hospitalia', 'AB-', 'INS-2004', 'James Brown: +1-555-1008'),
    ('PAT-005', 'David', 'Davis', '1982-09-14', '567-89-0123', '+1-555-1009', 'david.d@email.com', '500 Remedy Road, Pillsville', 'A-', 'INS-2005', 'Karen Davis: +1-555-1010');

-- Seed clinic_records
INSERT INTO clinic_records (patient_id, diagnosis, treatment, prescribed_meds, doctor_notes) VALUES
    ('PAT-001', 'Hypertension', 'Lifestyle changes + medication', 'Lisinopril 10mg daily', 'Blood pressure elevated. Follow up in 3 months.'),
    ('PAT-002', 'Type 2 Diabetes', 'Diet control + Metformin', 'Metformin 500mg twice daily', 'A1C at 7.2%. Monitor closely.'),
    ('PAT-003', 'Lower back strain', 'Physical therapy', 'Ibuprofen 400mg as needed', 'Avoid heavy lifting for 6 weeks.'),
    ('PAT-001', 'Annual checkup', 'Routine bloodwork ordered', 'None', 'Cholesterol slightly elevated.'),
    ('PAT-004', 'Migraine', 'Sumatriptan for acute episodes', 'Sumatriptan 50mg PRN', 'Episodes 2-3 times monthly.');

-- Seed clinic_confidential
INSERT INTO clinic_confidential (record_type, patient_id, content, classification) VALUES
    ('psychiatric', 'PAT-001', 'Patient reports mild anxiety. Referred to psychiatrist.', 'confidential'),
    ('substance_abuse', 'PAT-003', 'History of alcohol dependency. 2 years sober.', 'highly_confidential'),
    ('genetic_test', 'PAT-002', 'Carrier for BRCA1 gene mutation. Genetic counseling recommended.', 'highly_confidential'),
    ('hiv_status', 'PAT-004', 'HIV positive. Current CD4 count: 450. On antiretroviral therapy.', 'top_secret'),
    ('financial', 'PAT-005', 'Patient has outstanding medical bills of $12,500. Payment plan initiated.', 'confidential');
