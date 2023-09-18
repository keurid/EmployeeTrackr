const inquirer = require('inquirer');
const db = require('./db');
const Table = require('cli-table3');

const {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
  getEmployeesByManager,
  getEmployeesByDepartment,
  deleteDepartment,
  deleteRole,
  deleteEmployee,
  calculateDepartmentBudget,
} = db;

async function main() {
  while (true) {
    const { action } = await inquirer.prompt([
      {
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'View employees by manager',
          'View employees by department',
          'Delete a department',
          'Delete a role',
          'Delete an employee',
          'Calculate department budget',
          'Exit',
        ],
      },
    ]);

    switch (action) {
      case 'View all departments':
        await viewAllDepartments();
        break;
      case 'View all roles':
        await viewAllRoles();
        break;
      case 'View all employees':
        await viewAllEmployees();
        break;
      case 'Add a department':
        await addDepartment();
        break;
      case 'Add a role':
        await addRole();
        break;
      case 'Add an employee':
        await addEmployee();
        break;
      case 'Update an employee role':
        await updateEmployeeRole();
        break;
      case 'View employees by manager':
        await getEmployeesByManagerPrompt();
        break;
      case 'View employees by department':
        await viewEmployeesByDepartment();
        break;
      case 'Delete a department':
        await deleteDepartment();
        break;
      case 'Delete a role':
        await deleteRole();
        break;
      case 'Delete an employee':
        await deleteEmployee();
        break;
      case 'Calculate department budget':
        await calculateDepartmentBudget();
        break;
      case 'Exit':
        console.log('Goodbye!');
        process.exit(0);
        break;
      default:
        break;
    }
  }
}

async function viewAllDepartments() {
  try {
    const departments = await getAllDepartments();

    const table = new Table({
      head: ['Department ID', 'Name'],
    });

    departments.forEach((department) => {
      table.push([department.id, department.name]);
    });

    console.log(table.toString());
  } catch (error) {
    console.error(error);
  }
}

async function viewAllRoles() {
  try {
    const roles = await getAllRoles();

    const table = new Table({
      head: ['Role ID', 'Title', 'Salary', 'Department'],
    });

    roles.forEach((role) => {
      table.push([role.id, role.title, role.salary, role.department_name]);
    });

    console.log(table.toString());
  } catch (error) {
    console.error(error);
  }
}

async function viewAllEmployees() {
  try {
    const employees = await getAllEmployees();

    const table = new Table({
      head: ['Employee ID', 'First Name', 'Last Name', 'Job Title', 'Department', 'Salary', 'Manager'],
    });

    employees.forEach((employee) => {
      table.push([
        employee.id,
        employee.first_name,
        employee.last_name,
        employee.job_title,
        employee.department,
        employee.salary,
        employee.manager,
      ]);
    });

    console.log(table.toString());
  } catch (error) {
    console.error(error);
  }
}

async function getEmployeesByManagerPrompt() {
  const managers = await getAllEmployees(); // You can modify this to get a list of managers.
  const managerChoices = managers.map((manager) => ({
    name: `${manager.first_name} ${manager.last_name}`,
    value: manager.id,
  }));

  const { managerId } = await inquirer.prompt([
    {
      name: 'managerId',
      type: 'list',
      message: 'Select a manager:',
      choices: managerChoices,
    },
  ]);

  try {
    const employees = await getEmployeesByManager(managerId);

    const table = new Table({
      head: ['Employee ID', 'First Name', 'Last Name', 'Job Title', 'Department', 'Salary'],
    });

    employees.forEach((employee) => {
      table.push([
        employee.id,
        employee.first_name,
        employee.last_name,
        employee.job_title,
        employee.department,
        employee.salary,
      ]);
    });

    console.log(table.toString());
  } catch (error) {
    console.error(error);
  }
}

async function viewEmployeesByDepartment() {
  const departments = await getAllDepartments(); // You can modify this to get a list of departments.
  const departmentChoices = departments.map((department) => ({
    name: department.name,
    value: department.id,
  }));

  const { departmentId } = await inquirer.prompt([
    {
      name: 'departmentId',
      type: 'list',
      message: 'Select a department:',
      choices: departmentChoices,
    },
  ]);

  try {
    const employees = await getEmployeesByDepartment(departmentId);

    const table = new Table({
      head: ['Employee ID', 'First Name', 'Last Name', 'Job Title', 'Salary', 'Manager'],
    });

    employees.forEach((employee) => {
      table.push([
        employee.id,
        employee.first_name,
        employee.last_name,
        employee.job_title,
        employee.salary,
        employee.manager,
      ]);
    });

    console.log(table.toString());
  } catch (error) {
    console.error(error);
  }
}

// Define other functions and prompts here...

main();
