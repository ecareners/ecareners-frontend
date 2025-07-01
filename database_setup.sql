-- Create SOP table
CREATE TABLE IF NOT EXISTS SOP (
    sop_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO SOP (title, url) VALUES
('Standard Operating Procedure for User Registration', 'https://example.com/sop/user-registration'),
('SOP for Password Reset Process', 'https://example.com/sop/password-reset'),
('Standard Operating Procedure for Data Backup', 'https://example.com/sop/data-backup'),
('SOP for System Maintenance', 'https://example.com/sop/system-maintenance'),
('Standard Operating Procedure for User Authentication', 'https://example.com/sop/user-authentication'),
('SOP for Database Management', 'https://example.com/sop/database-management'),
('Standard Operating Procedure for API Integration', 'https://example.com/sop/api-integration'),
('SOP for Security Protocols', 'https://example.com/sop/security-protocols'),
('Standard Operating Procedure for Testing Procedures', 'https://example.com/sop/testing-procedures'),
('SOP for Deployment Process', 'https://example.com/sop/deployment-process'),
('Standard Operating Procedure for Code Review', 'https://example.com/sop/code-review'),
('SOP for Incident Response', 'https://example.com/sop/incident-response');

-- Create videos table
CREATE TABLE IF NOT EXISTS videos (
    videos_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    category VARCHAR(100) DEFAULT NULL
);

-- Insert sample video data
INSERT INTO videos (title, url, category) VALUES
('Introduction to React.js', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Programming'),
('JavaScript Fundamentals', 'https://www.youtube.com/watch?v=W6NZfCO5SIk', 'Programming'),
('CSS Grid Layout Tutorial', 'https://www.youtube.com/watch?v=9zBsd7EyrRk', 'Web Design'),
('Node.js Crash Course', 'https://www.youtube.com/watch?v=fBNz5xF-Kx4', 'Programming'),
('Python for Beginners', 'https://www.youtube.com/watch?v=kqtD5dpn9C8', 'Programming'),
('UI/UX Design Principles', 'https://www.youtube.com/watch?v=Ovj4hFxko7c', 'Design'),
('Database Design Basics', 'https://www.youtube.com/watch?v=ztHopE5Wnpc', 'Database'),
('Git and GitHub Tutorial', 'https://www.youtube.com/watch?v=RGOj5yH7evk', 'Development Tools'),
('Docker Tutorial for Beginners', 'https://www.youtube.com/watch?v=pTFZFxd4hOI', 'DevOps'),
('Machine Learning Basics', 'https://www.youtube.com/watch?v=KNAWp2S3w94', 'AI/ML'),
('Web Security Fundamentals', 'https://www.youtube.com/watch?v=2k9BpSYKAZI', 'Security'),
('Mobile App Development', 'https://www.youtube.com/watch?v=0mJOYhnq2Rc', 'Mobile Development');

-- Create user table
CREATE TABLE IF NOT EXISTS user (
    user_id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'instructor', 'student', 'mahasiswa') NOT NULL,
    prodi VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create assignments table
CREATE TABLE IF NOT EXISTS assignments (
    assignment_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATETIME NOT NULL,
    assignment_type VARCHAR(50),
    semester VARCHAR(20),
    academic_year VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create submission table
CREATE TABLE IF NOT EXISTS submission (
    submission_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(10) NOT NULL,
    assignment_id INT NOT NULL,
    google_drive_file_id VARCHAR(255) NOT NULL,
    text TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
    FOREIGN KEY (assignment_id) REFERENCES assignments(assignment_id) ON DELETE CASCADE
);

-- Create assessments table
CREATE TABLE IF NOT EXISTS assessments (
    assessment_id INT NOT NULL AUTO_INCREMENT,
    submission_id INT,
    assessed_user_id VARCHAR(10) NOT NULL,
    assessor_user_id VARCHAR(10) NOT NULL,
    assessment_type ENUM(
        'pre_conference',
        'post_conference',
        'laporan_pendahuluan',
        'asuhan_keperawatan',
        'analisa_sintesa',
        'sikap_mahasiswa',
        'keterampilan_prosedural_klinik_dops',
        'ujian_klinik',
        'telaah_artikel_jurnal',
        'case_report'
    ) NOT NULL,
    score INT,
    comments TEXT,
    assessment_date DATETIME NOT NULL,
    academic_year YEAR NOT NULL,
    semester ENUM('Ganjil', 'Genap', 'Pendek') NOT NULL,
    PRIMARY KEY (assessment_id),
    FOREIGN KEY (submission_id) REFERENCES submission(submission_id) ON DELETE SET NULL,
    FOREIGN KEY (assessed_user_id) REFERENCES user(user_id) ON DELETE CASCADE,
    FOREIGN KEY (assessor_user_id) REFERENCES user(user_id) ON DELETE CASCADE,
    INDEX (submission_id),
    INDEX (assessed_user_id),
    INDEX (assessor_user_id),
    INDEX (assessment_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Insert sample user data
INSERT INTO user (user_id, name, email, password, role, prodi) VALUES
('U00001', 'Admin User', 'admin@example.com', '$2b$10$rQZ8K9mN2pL1vX3yW4zA5bC6dE7fG8hI9jK0lM1nO2pQ3rS4tU5vW6xY7zA8', 'admin', 'Computer Science'),
('U00002', 'John Student', 'john@example.com', '$2b$10$rQZ8K9mN2pL1vX3yW4zA5bC6dE7fG8hI9jK0lM1nO2pQ3rS4tU5vW6xY7zA8', 'student', 'Computer Science'),
('U00003', 'Jane Instructor', 'jane@example.com', '$2b$10$rQZ8K9mN2pL1vX3yW4zA5bC6dE7fG8hI9jK0lM1nO2pQ3rS4tU5vW6xY7zA8', 'instructor', 'Computer Science'),
('U00004', 'Bob Proceptor', 'bob@example.com', '$2b$10$rQZ8K9mN2pL1vX3yW4zA5bC6dE7fG8hI9jK0lM1nO2pQ3rS4tU5vW6xY7zA8', 'instructor', 'Nursing'),
('U00005', 'Alice Student', 'alice@example.com', '$2b$10$rQZ8K9mN2pL1vX3yW4zA5bC6dE7fG8hI9jK0lM1nO2pQ3rS4tU5vW6xY7zA8', 'student', 'Nursing'),
('U00006', 'Charlie Student', 'charlie@example.com', '$2b$10$rQZ8K9mN2pL1vX3yW4zA5bC6dE7fG8hI9jK0lM1nO2pQ3rS4tU5vW6xY7zA8', 'student', 'Nursing');

-- Insert sample assignment data
INSERT INTO assignments (title, description, due_date, assignment_type, semester, academic_year) VALUES
('React Component Assignment', 'Create a reusable React component with proper props and state management', '2024-01-15 23:59:59', 'individual', 'Fall 2023', '2023-2024'),
('Database Design Project', 'Design and implement a database schema for an e-commerce system', '2024-01-20 23:59:59', 'group', 'Fall 2023', '2023-2024'),
('API Development Assignment', 'Build a RESTful API using Node.js and Express', '2024-01-25 23:59:59', 'individual', 'Fall 2023', '2023-2024'),
('Frontend Development Project', 'Create a responsive web application using HTML, CSS, and JavaScript', '2024-01-30 23:59:59', 'group', 'Fall 2023', '2023-2024'),
('Clinical Assessment - Pre Conference', 'Pre-conference assessment for nursing students', '2024-02-15 23:59:59', 'individual', 'Ganjil', '2023-2024'),
('Case Report Analysis', 'Analyze and present a clinical case report', '2024-02-20 23:59:59', 'individual', 'Ganjil', '2023-2024');

-- Insert sample submission data
INSERT INTO submission (user_id, assignment_id, google_drive_file_id, text, submitted_at) VALUES
('U00002', 1, '1qayXy2iag9QKabvtKjuF0TLN8yOPFj0d', 'React component with proper state management', '2024-01-14 10:30:00'),
('U00005', 5, '2qayXy2iag9QKabvtKjuF0TLN8yOPFj0d', 'Pre-conference assessment submission', '2024-02-14 09:15:00'),
('U00006', 5, '3qayXy2iag9QKabvtKjuF0TLN8yOPFj0d', 'Pre-conference assessment submission', '2024-02-14 11:45:00'),
('U00005', 6, '4qayXy2iag9QKabvtKjuF0TLN8yOPFj0d', 'Case report analysis submission', '2024-02-19 14:20:00'),
('U00006', 6, '5qayXy2iag9QKabvtKjuF0TLN8yOPFj0d', 'Case report analysis submission', '2024-02-19 16:30:00');

-- Insert sample assessment data
INSERT INTO assessments (submission_id, assessed_user_id, assessor_user_id, assessment_type, score, comments, assessment_date, academic_year, semester) VALUES
(2, 'U00005', 'U00004', 'pre_conference', 85, 'Good understanding of patient assessment. Needs improvement in documentation.', '2024-02-15 10:00:00', 2024, 'Ganjil'),
(3, 'U00006', 'U00004', 'pre_conference', 92, 'Excellent clinical reasoning and patient care approach.', '2024-02-15 14:30:00', 2024, 'Ganjil'),
(4, 'U00005', 'U00004', 'case_report', 78, 'Good analysis but could improve critical thinking aspects.', '2024-02-21 09:00:00', 2024, 'Ganjil'),
(5, 'U00006', 'U00004', 'case_report', 88, 'Well-structured case report with good clinical insights.', '2024-02-21 11:00:00', 2024, 'Ganjil');

-- Create conference table
CREATE TABLE IF NOT EXISTS conference (
    conference_id VARCHAR(10) PRIMARY KEY,
    platform ENUM('Zoom', 'Google Meet', 'WhatsApp', 'Discord') NOT NULL,
    title VARCHAR(255) NOT NULL,
    link VARCHAR(255) NOT NULL,
    description TEXT,
    scheduled_time DATETIME NOT NULL,
    created_by VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES user(user_id) ON DELETE CASCADE
);

-- Insert sample conference data
INSERT INTO conference (conference_id, platform, title, link, description, scheduled_time, created_by) VALUES
('C00001', 'Zoom', 'Weekly Clinical Discussion', 'https://zoom.us/j/123456789', 'Weekly discussion about clinical cases and patient care approaches', '2024-02-20 14:00:00', 'U00003'),
('C00002', 'Google Meet', 'Nursing Assessment Review', 'https://meet.google.com/abc-defg-hij', 'Review session for nursing assessment techniques and documentation', '2024-02-22 10:00:00', 'U00004'),
('C00003', 'WhatsApp', 'Emergency Response Training', 'https://wa.me/1234567890', 'Training session on emergency response protocols and procedures', '2024-02-25 16:00:00', 'U00003'),
('C00004', 'Discord', 'Medical Ethics Discussion', 'https://discord.gg/medicalethics', 'Discussion about medical ethics and professional conduct', '2024-02-28 13:00:00', 'U00004'),
('C00005', 'Zoom', 'Patient Safety Workshop', 'https://zoom.us/j/987654321', 'Workshop focusing on patient safety protocols and best practices', '2024-03-01 09:00:00', 'U00003'); 