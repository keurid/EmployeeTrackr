-- Insert sample departments
INSERT INTO department (name) VALUES
('HR'),
('Finance'),
('Engineering');

-- Insert sample roles
INSERT INTO role (title, salary, department_id) VALUES
('HR Manager', 70000, 1),
('Financial Analyst', 60000, 2),
('Software Engineer', 80000, 3);

-- Insert sample employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, NULL),
('Alice', 'Johnson', 3, NULL);
