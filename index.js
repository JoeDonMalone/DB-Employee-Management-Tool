const mysql = require('mysql');
const q = require('inquirer');
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



const viewDepts = () => {
    connection.query('SELECT * FROM departments', (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    connection.end();
  });
}

function askQuestions() {

  let questions = {
    type: 'list',
    name: 'objective',
    message: 'What would you like to do?',
    choices: [ 
      "Add a Department to the Database", 
      "Add a Role to the Database", 
      "Add an Employee to the Database", 
      "View All Departments in the Database", 
      "View All Roles in the Database", 
      "View All Employees in the Database",
      "Change the Roles of an Employee", 
      "QUIT"
    ]
  }

  q.prompt(questions).then((answers) => {
    switch(answers.objective) {
      case'Add a Department to the Database':
      addDept();
      case'Add a Role to the Database':
      addRole();
      case'Add an employee to the Database':
      addEmployee();
      case'View All Departments in the Database':
      return(viewDepts())
      case'View All Roles in the Database':
      viewRoles();
      case'View All Employees in the Database':
      viewEmployees();
      case'Change the Roles of an Employee':
      changeRoles();
      case'QUIT':
      console.log('Exited');
      break;
  };
})
.catch( error => {
  if(error) {
      console.log(error);
  }
})

}


connection.connect((err) => {
  if (err) throw err;
  // viewDepts();
  askQuestions();
});


