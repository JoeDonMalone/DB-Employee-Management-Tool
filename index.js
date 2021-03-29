const mysql = require('mysql');
const inquirer = require('inquirer');
const table = require('console.table');
require('dotenv').config();

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3307,

  // Your username
  user: process.env.DB_USER,

  // Be sure to update with your own MySQL password!
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
});



const getDepartments = () => {
    connection.query('SELECT * FROM departments', (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    connection.end();
  });
}

connection.connect((err) => {
  if (err) throw err;
  getDepartments();
});