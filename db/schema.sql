-- Create your database schema here
CREATE DATABASE IF NOT EXISTS employee_db;
USE employee_db;

-- Create department table
CREATE TABLE IF NOT EXISTS department (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

-- Create role table
CREATE TABLE IF NOT EXISTS role (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id)
);

-- Create employee table
CREATE TABLE IF NOT EXISTS employee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);

-- Create table for tracking employee managers
CREATE TABLE IF NOT EXISTS employee_manager (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employee_id INT,
  manager_id INT,
  FOREIGN KEY (employee_id) REFERENCES employee(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);

-- Create table for tracking department budgets
CREATE TABLE IF NOT EXISTS department_budget (
  id INT AUTO_INCREMENT PRIMARY KEY,
  department_id INT,
  total_budget DECIMAL(12, 2),
  FOREIGN KEY (department_id) REFERENCES department(id)
);
