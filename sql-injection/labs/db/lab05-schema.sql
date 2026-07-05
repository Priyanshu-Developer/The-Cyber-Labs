-- Lab 05: Time-based Blind SQLi - University Portal
CREATE TABLE IF NOT EXISTS uni_students (
    id SERIAL PRIMARY KEY,
    student_number VARCHAR(20) NOT NULL UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    major VARCHAR(100) NOT NULL,
    gpa DECIMAL(3,2),
    enrollment_year INTEGER
);
CREATE TABLE IF NOT EXISTS uni_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'student'
);
CREATE TABLE IF NOT EXISTS uni_transcripts (
    id SERIAL PRIMARY KEY,
    student_number VARCHAR(20) REFERENCES uni_students(student_number),
    course_code VARCHAR(20) NOT NULL,
    course_name VARCHAR(200) NOT NULL,
    grade VARCHAR(5) NOT NULL,
    credits INTEGER NOT NULL,
    semester VARCHAR(20) NOT NULL
);
CREATE TABLE IF NOT EXISTS uni_flags (
    id SERIAL PRIMARY KEY,
    flag_name VARCHAR(100) NOT NULL UNIQUE,
    flag_value TEXT NOT NULL
);
