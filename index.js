const mysql = require('mysql');
const inquirer = require('inquirer');
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

connection.connect((err) => {
  if (err) throw err;
  else {console.log('connection Success')}
  // runSearch();
});