INSERT INTO department (name) VALUES
('HR'),
('Finance'),
('Engineering'),
('Sales'),
('Marketing');

INSERT INTO role (title, salary, department_id) VALUES
('HR Manager', 70000, 1),
('Financial Analyst', 60000, 2),
('Software Engineer', 80000, 3),
('Sales Manager', 75000, 4),
('Marketing Specialist', 55000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, NULL),
('Alice', 'Johnson', 3, 1),
('Bob', 'Wilson', 4, NULL),
('Eva', 'Davis', 5, 4),
('Chris', 'Brown', 3, 1),
('Grace', 'Miller', 2, 1),
('Mike', 'Lee', 1, NULL);

INSERT INTO employee_manager (employee_id, manager_id) VALUES
(3, 1),
(5, 4),
(6, 1),
(7, 1);

INSERT INTO department_budget (department_id, total_budget) VALUES
(1, 140000),
(2, 60000),
(3, 240000),
(4, 75000),
(5, 55000);
