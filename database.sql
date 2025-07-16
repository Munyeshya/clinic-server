-- Dental Clinic Management System Database Schema

-- Create database
CREATE DATABASE IF NOT EXISTS royal;
USE royal;

-- Patients table
CREATE TABLE IF NOT EXISTS patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    date_of_birth DATE NOT NULL,
    address TEXT,
    medical_history TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Patient appointments table
CREATE TABLE IF NOT EXISTS patient_appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    preferred_date DATE NOT NULL,
    department ENUM('Orthodontics', 'Prosthodontics', 'Restorative', 'Conservative', 'Periodontology', 'Oral maxillofacial surgery') NOT NULL,
    disease_description TEXT,
    status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
);

-- Example admin user (password: admin123, hash to be generated in backend)
-- INSERT INTO users (name, email, password_hash) VALUES ('Admin', 'admin@royalclinic.com', '<hashed_password>');

-- Insert sample data for patients
INSERT INTO patients (first_name, last_name, email, phone, date_of_birth, address, medical_history) VALUES
('John', 'Doe', 'john.doe@email.com', '+1234567890', '1985-03-15', '123 Main St, City, State', 'No known allergies'),
('Jane', 'Smith', 'jane.smith@email.com', '+1234567891', '1990-07-22', '456 Oak Ave, City, State', 'Allergic to penicillin'),
('Mike', 'Johnson', 'mike.johnson@email.com', '+1234567892', '1978-11-08', '789 Pine Rd, City, State', 'Diabetes type 2'),
('Sarah', 'Williams', 'sarah.williams@email.com', '+1234567893', '1992-04-30', '321 Elm St, City, State', 'Hypertension'),
('David', 'Brown', 'david.brown@email.com', '+1234567894', '1983-09-12', '654 Maple Dr, City, State', 'Asthma');

-- Insert sample data for appointments
INSERT INTO patient_appointments (first_name, last_name, email, phone, preferred_date, department, disease_description, status) VALUES
('John', 'Doe', 'john.doe@email.com', '+1234567890', '2024-01-15', 'Restorative', 'Regular checkup and cleaning', 'confirmed'),
('Jane', 'Smith', 'jane.smith@email.com', '+1234567891', '2024-01-16', 'Orthodontics', 'Braces consultation', 'pending'),
('Mike', 'Johnson', 'mike.johnson@email.com', '+1234567892', '2024-01-17', 'Conservative', 'Root canal treatment', 'confirmed'),
('Sarah', 'Williams', 'sarah.williams@email.com', '+1234567893', '2024-01-18', 'Restorative', 'Teeth whitening', 'completed'),
('David', 'Brown', 'david.brown@email.com', '+1234567894', '2024-01-19', 'Oral maxillofacial surgery', 'Wisdom tooth extraction', 'pending'),
('Emily', 'Davis', 'emily.davis@email.com', '+1234567895', '2024-01-20', 'Periodontology', 'Gum disease treatment', 'confirmed'),
('Robert', 'Wilson', 'robert.wilson@email.com', '+1234567896', '2024-01-21', 'Prosthodontics', 'Dental implant consultation', 'pending'),
('Lisa', 'Anderson', 'lisa.anderson@email.com', '+1234567897', '2024-01-22', 'Orthodontics', 'Invisalign treatment', 'confirmed'),
('James', 'Taylor', 'james.taylor@email.com', '+1234567898', '2024-01-23', 'Conservative', 'Cavity filling', 'completed'),
('Maria', 'Garcia', 'maria.garcia@email.com', '+1234567899', '2024-01-24', 'Restorative', 'Crown placement', 'pending');

-- Create indexes for better performance
CREATE INDEX idx_patients_email ON patients(email);
CREATE INDEX idx_appointments_date ON patient_appointments(preferred_date);
CREATE INDEX idx_appointments_department ON patient_appointments(department);
CREATE INDEX idx_appointments_status ON patient_appointments(status);