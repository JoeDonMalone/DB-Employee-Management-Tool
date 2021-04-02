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

async function getViewDepts() {
  const result = await viewDepts();
  console.table(result)
  // connection.end();
}

function viewDepts() {
  return new Promise((resolve, reject) => {
    connection.query('SELECT d.name FROM departments d', (err, res) => {
    return err ? reject(err) : resolve(res);
    });
  })
}

const addDept = (input) => {
  return new Promise((resolve, reject) => {
      let query = `INSERT INTO departments(name) VALUES("${input}")`
      connection.query(query, (err, res) => {
      return err ? reject(err) : resolve(res);
      })
  })
}

async function getAddDept(input) {
  const result = await addDept(input);
  const depts = await viewDepts();
  // console.table(depts)
  // connection.end();
}

const addDeptPrompt = () => {
  q.prompt([
      {
        type: 'input', 
        name: 'deptName',
        message: 'What is the name(s) of the department you would like to add'
      }
    ])
    .then((answers) => {
      getAddDept(answers.deptName);      
      
    })
    .then( function () {
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
      }
      q.prompt(questions).then((answers) => {
      switch(answers.objective) {
        case 'Add another Department':
          return (addDeptPrompt());
        case 'Main Menu':
          return(askQuestions());
        case 'QUIT':
          return(connection.end());
        }
      })
    })
  }
const viewRoles = () => {
    connection.query('SELECT r.title, r.salary FROM roles r JOIN', (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
  });
}

// const addRole = () => {
// q.prompt([
//     {
//       type: 'input', 
//       name: 'roleName',
//       message: 'What is the name(s) of the role you would like to add?'
//     }, 
//     {
//       type: 'list',
//       name: 'deptName',
//       message: "To which department does the role belong?",
//       choices: 

//     }
//   ])

//   .then((answers) => {
//     let query = `INSERT INTO roles(title, salary, departments_id) VALUES("${answers.roleName}","${answers.salary}", )`
//     connection.query(query, (err, res) => {
//       if (err) throw err;
//     })
//   })
//   .then( function () {
//     let questions = {
//       type: 'list',
//       name: 'objective',
//       message: 'What would you like to do?',
//       choices: [
//         'Add another Role', 
//         'Main Menu',
//         'QUIT'
//       ]
//     }
//     q.prompt(questions).then((answers) => {
//     switch(answers.objective) {
//       case 'Add another Role':
//         return (addRole());
//       case 'Main Menu':
//         return(askQuestions());
//       case 'QUIT':
//         return(connection.end());
//       }
//     })
//   })
// }

const viewEmployees = () => {
    connection.query('SELECT e.first_name, e.last_name,  FROM employees e', (err, res) => {
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
      return(addDeptPrompt());
      case'Add a Role to the Database':
      return(addRole());
      case'Add an employee to the Database':
      return(addEmployee());
      case'View All Departments in the Database':
      return(viewDepts())
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


