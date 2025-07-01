-- Create conference table
CREATE TABLE IF NOT EXISTS conference (
    conference_id VARCHAR(10) PRIMARY KEY,
    platform ENUM('Zoom', 'Google Meet', 'WhatsApp', 'Discord') NOT NULL,
    title VARCHAR(255) NOT NULL,
    link VARCHAR(255) NOT NULL,
    description TEXT,
    scheduled_time DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample conference data
INSERT INTO conference (conference_id, platform, title, link, description, scheduled_time) VALUES
('C00001', 'Zoom', 'Weekly Clinical Discussion', 'https://zoom.us/j/123456789', 'Weekly discussion about clinical cases and patient care approaches', '2024-02-20 14:00:00'),
('C00002', 'Google Meet', 'Nursing Assessment Review', 'https://meet.google.com/abc-defg-hij', 'Review session for nursing assessment techniques and documentation', '2024-02-22 10:00:00'),
('C00003', 'WhatsApp', 'Emergency Response Training', 'https://wa.me/1234567890', 'Training session on emergency response protocols and procedures', '2024-02-25 16:00:00'),
('C00004', 'Discord', 'Medical Ethics Discussion', 'https://discord.gg/medicalethics', 'Discussion about medical ethics and professional conduct', '2024-02-28 13:00:00'),
('C00005', 'Zoom', 'Patient Safety Workshop', 'https://zoom.us/j/987654321', 'Workshop focusing on patient safety protocols and best practices', '2024-03-01 09:00:00'); 