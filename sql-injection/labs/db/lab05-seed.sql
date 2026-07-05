-- Lab 05 Seed Data
INSERT INTO uni_students (student_number, first_name, last_name, major, gpa, enrollment_year) VALUES
('STU-2024-001','Alex','Turner','Computer Science',3.85,2024),
('STU-2024-002','Sam','Wilson','Cybersecurity',3.92,2024),
('STU-2023-003','Jordan','Casey','Computer Science',3.45,2023),
('STU-2023-004','Riley','Adams','Information Technology',3.78,2023);
INSERT INTO uni_users (username, password, role) VALUES
('portal_admin','Un1v2024!','admin'),
('student_alex','Study123','student');
INSERT INTO uni_transcripts (student_number, course_code, course_name, grade, credits, semester) VALUES
('STU-2024-001','CS101','Intro to Programming','A',3,'Fall 2024'),
('STU-2024-001','CS201','Data Structures','A-',3,'Fall 2024'),
('STU-2024-002','SEC101','Cybersecurity Fundamentals','A+',4,'Fall 2024'),
('STU-2024-002','SEC201','Network Security','A',3,'Fall 2024'),
('STU-2023-003','CS101','Intro to Programming','B+',3,'Fall 2023');
INSERT INTO uni_flags (flag_name, flag_value) VALUES
('REGISTRAR_NIGHT_FLAG','FLAG{time_waits_for_no_admin}');
