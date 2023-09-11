const mysql = require('mysql2');
const util = require('util');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'employee_db',
});

db.query = util.promisify(db.query);

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});


module.exports = {
  getAllDepartments: async () => {
    try {
      const departments = await db.query('SELECT * FROM department');
      return departments;
    } catch (error) {
      throw error;
    }
  },

  getAllRoles: async () => {
    try {
      const roles = await db.query(`
        SELECT r.*, d.name AS department_name
        FROM role r
        INNER JOIN department d ON r.department_id = d.id
      `);
      return roles;
    } catch (error) {
      throw error;
    }
  },

  getAllEmployees: async () => {
    try {
      const employees = await db.query(`
        SELECT e.id, e.first_name, e.last_name, r.title AS job_title, d.name AS department, r.salary, 
        CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM employee e
        INNER JOIN role r ON e.role_id = r.id
        INNER JOIN department d ON r.department_id = d.id
        LEFT JOIN employee m ON e.manager_id = m.id
      `);
      return employees;
    } catch (error) {
      throw error;
    }
  },

  addDepartment: async (departmentName) => {
    try {
      await db.query('INSERT INTO department (name) VALUES (?)', [departmentName]);
      console.log(`Department '${departmentName}' added.`);
    } catch (error) {
      throw error;
    }
  },

  addRole: async (title, salary, departmentId) => {
    try {
      await db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId]);
      console.log(`Role '${title}' added.`);
    } catch (error) {
      throw error;
    }
  },

  addEmployee: async (firstName, lastName, roleId, managerId) => {
    try {
      await db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [
        firstName,
        lastName,
        roleId,
        managerId,
      ]);
      console.log(`Employee '${firstName} ${lastName}' added.`);
    } catch (error) {
      throw error;
    }
  },

  updateEmployeeRole: async (employeeId, roleId) => {
    try {
      await db.query('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId]);
      console.log(`Employee's role updated.`);
    } catch (error) {
      throw error;
    }
  },

};