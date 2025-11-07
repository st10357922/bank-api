CREATE DATABASE bank_portal;

USE bank_portal;

CREATE TABLE customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100),
  id_number VARCHAR(20),
  account_number VARCHAR(20),
  password VARCHAR(255)
);

CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255)
);

CREATE TABLE payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT,
  amount DECIMAL(10,2),
  currency VARCHAR(10),
  provider VARCHAR(50),
  beneficiary_account VARCHAR(50),
  swift_code VARCHAR(50),
  verified BOOLEAN DEFAULT 0
);

SELECT *FROM bank_portal.customers;
SELECT *FROM bank_portal.employees;
SELECT * FROM bank_portal.payments;

INSERT INTO employees (username, password) VALUES
('admin', '$2a$10$ZJktSo4ahhNGRrjYhAi29uDJN6JwZsyfXvHrGHSzz8G4LVUy16F0G'); 

