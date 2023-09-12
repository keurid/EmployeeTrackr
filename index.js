const inquirer = require('inquirer');
const db = require('./db');

async function main() {
    console.log('Welcome to the Employee Management System');
  
    while (true) {
      const { action } = await inquirer.prompt([
        {
          type: 'list',
          name: 'action',
          message: 'What would you like to do?',
          choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit',
          ],
        },
      ]);

      switch (action) {
        case 'View all departments':
          const departments = await db.getAllDepartments();
          console.table(departments);
          break;
  
        case 'View all roles':
          const roles = await db.getAllRoles();
          console.table(roles);
          break;
  
        case 'View all employees':
          const employees = await db.getAllEmployees();
          console.table(employees);
          break;
      }  
    };
};