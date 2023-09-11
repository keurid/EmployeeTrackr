const mysql = require('mysql2');
const util = require('util');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'employee_db',
});