-- Lab 04 Seed Data
INSERT INTO hospital_patients (patient_id, first_name, last_name, date_of_birth, diagnosis, treatment, attending_doctor, room_number) VALUES
('PAT-001','John','Smith','1965-04-12','Type 2 Diabetes','Insulin therapy + diet','Dr. Sarah Chen','Room 201'),
('PAT-002','Maria','Garcia','1988-09-23','Pneumonia','Antibiotics IV','Dr. James Wilson','Room 305'),
('PAT-003','Robert','Taylor','1972-12-01','Cardiac Arrhythmia','Beta blockers','Dr. Sarah Chen','Room 102'),
('PAT-004','Emily','Davis','1995-07-15','Appendicitis','Appendectomy','Dr. Michael Brown','Room 401'),
('PAT-005','William','Anderson','1958-02-28','COPD','Bronchodilators','Dr. James Wilson','Room 203');
INSERT INTO hospital_users (username, password, role) VALUES
('nurse_admin','H0sp2024!','admin'),
('nurse_jones','Nurse123','nurse');
INSERT INTO hospital_confidential (record_type, record_data) VALUES
('BOARD_MEMBERS','CEO: Dr. Patricia Holmes, CFO: Mark Stevens'),
('RESEARCH_GRANT','NIH Grant #R01-2024-4851: $2.4M for gene therapy trials'),
('EXECUTIVE_SALARY','Dr. Holmes: $890K, Dr. Kim: $720K'),
('INCIDENT_LOCKBOX','MED-LOCK-7Q2-PULSE');
