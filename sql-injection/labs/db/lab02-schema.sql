-- Lab 02: Operation Ghost Records - Raven Technologies Employee Directory
CREATE TABLE IF NOT EXISTS raven_employees (
    id INTEGER PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    department VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS raven_secret_archive (
    id INTEGER PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    classification VARCHAR(100) NOT NULL,
    secret_value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS raven_directory_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    employee_id INTEGER REFERENCES raven_employees(id)
);
