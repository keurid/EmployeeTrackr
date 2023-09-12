const mysql = require('mysql2');
const util = require('util');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
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

  updateEmployeeManager: async (employeeId, managerId) => {
    try {
      await db.query('UPDATE employee SET manager_id = ? WHERE id = ?', [managerId, employeeId]);
      console.log(`Employee's manager updated.`);
    } catch (error) {
      throw error;
    }
  },

  getEmployeesByManager: async (managerId) => {
    try {
      const employees = await db.query(`
        SELECT e.id, e.first_name, e.last_name, r.title AS job_title, d.name AS department, r.salary
        FROM employee e
        INNER JOIN role r ON e.role_id = r.id
        INNER JOIN department d ON r.department_id = d.id
        WHERE e.manager_id = ?
      `, [managerId]);
      return employees;
    } catch (error) {
      throw error;
    }
  },

  getEmployeesByDepartment: async (departmentId) => {
    try {
      const employees = await db.query(`
        SELECT e.id, e.first_name, e.last_name, r.title AS job_title, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM employee e
        INNER JOIN role r ON e.role_id = r.id
        LEFT JOIN employee m ON e.manager_id = m.id
        WHERE r.department_id = ?
      `, [departmentId]);
      return employees;
    } catch (error) {
      throw error;
    }
  },

  deleteDepartment: async (departmentId) => {
    try {
      await db.query('DELETE FROM department WHERE id = ?', [departmentId]);
      console.log(`Department deleted.`);
    } catch (error) {
      throw error;
    }
  },

  deleteRole: async (roleId) => {
    try {
      await db.query('DELETE FROM role WHERE id = ?', [roleId]);
      console.log(`Role deleted.`);
    } catch (error) {
      throw error;
    }
  },

  deleteEmployee: async (employeeId) => {
    try {
      await db.query('DELETE FROM employee WHERE id = ?', [employeeId]);
      console.log(`Employee deleted.`);
    } catch (error) {
      throw error;
    }
  },

  calculateDepartmentBudget: async (departmentId) => {
    try {
      const [budget] = await db.query(`
        SELECT SUM(r.salary) AS total_budget
        FROM role r
        WHERE r.department_id = ?
      `, [departmentId]);
      return budget.total_budget;
    } catch (error) {
      throw error;
    }
  },
};

