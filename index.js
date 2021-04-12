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
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});



async function consoleLog (res) {
  console.table(res)
}
async function addDept(input) {
  let query = `INSERT INTO departments(name) VALUES("${input}")`
  connection.query(query, (err, res) => {})

  await connection.query("SELECT d.name FROM departments d", async(err, res) => {
    await consoleLog(res);
  })
  // console.table(depts)
}
async function viewDepts() {
  let query = 'SELECT d.name FROM departments d'
  connection.query(query, async (err, res) => {
   await consoleLog(res);
    askQuestions();
  })
}

const addDeptQuestions = async () => {
  await q.prompt([
   {
    type: 'input', 
    name: 'deptName',
    message: 'What is the name(s) of the department you would like to add'
   }
  ])
  .then(async (answers) => {
    await addDept(answers.deptName)
  })
  .then(async () => {
    let questions = {
    type: 'list',
    name: 'objective',
    message: 'What would you like to do?',
    choices: [
      'Add another Department', 
      'Main Menu',
      `QUIT
      `
    ]
  };
  await q.prompt(questions)
  .then(answers => {
    switch(answers.objective) {
      case 'Add another Department':
        return (addDeptQuestions());
      case 'Main Menu':
        return(askQuestions());
      case 'QUIT':
        return(connection.end());
    }
  })
  })
}

const viewRoles = async () => {
    let query = 'SELECT r.title, r.salary FROM roles r JOIN'
  await  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
  });
}

const addRole = () => {
  const role
q.prompt([
  {
    type: 'input', 
    name: 'roleName',
    message: 'What is the name(s) of the role you would like to add?'
  }, 
  {
    type: 'list',
    name: 'deptName',
    message: "To which department does the role belong?",
    choices: connect.query('SELECT d.name FROM departments d', (err, res) => {
       console.table(res);
      })
  }
])
  .then((answers) => {
    let query = `INSERT INTO roles(title, salary, departments_id) VALUES("${answers.roleName}","${answers.salary}", )`
    connection.query(query, (err, res) => {
      if (err) throw err;
    })
  })
  .then( function () {
    let questions = {
      type: 'list',
      name: 'objective',
      message: 'What would you like to do?',
      choices: [
        'Add another Role', 
        'Main Menu',
        'QUIT'
      ]
    }
    q.prompt(questions).then((answers) => {
    switch(answers.objective) {
      case 'Add another Role':
        return (addRole());
      case 'Main Menu':
        return(askQuestions());
      case 'QUIT':
        return(connection.end());
      }
    })
  })
}

const viewEmployees = () => {
    connection.query('SELECT e.first_name, e.last_name,  FROM employees e', (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    connection.end();
  });
}

async function askQuestions() {

  let questions = {
    type: 'list',
    name: 'objective',
    message: 'What would you like to do?',
    choices: [ 
      "View All Departments in the Database",
      "Add a Department to the Database",  
      "View All Roles in the Database", 
      "Add a Role to the Database", 
      "View All Employees in the Database",
      "Add an Employee to the Database",
      "Change the Roles of an Employee", 
      "QUIT"
    ]
  }

  await q.prompt(questions).then((answers) => {
    switch(answers.objective) {
      case'Add a Department to the Database':
      return(addDeptQuestions());
      case'View All Departments in the Database':
      return(viewDepts())
      case'Add a Role to the Database':
      return(addRole());
      case'Add an employee to the Database':
      return(addEmployee());
      case'View All Roles in the Database':
      return(viewRoles());
      case'View All Employees in the Database':
      return(viewEmployees());
      case'Change the Roles of an Employee':
      return(changeRoles());
      case'QUIT':
      return(connection.end());
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
  askQuestions();
});