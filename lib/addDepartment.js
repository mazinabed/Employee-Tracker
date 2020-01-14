let inquirer = require("inquirer");
const mysql = require('mysql');

const db_config = require("./connection");

// Use text input from inquirer to add new department using mysql 
let addDepartment = (cli) => {

  inquirer.prompt([{
    type:"input",
    name:"department",
    message:"What is the department you wish to add?",
  }])
  .then((answers) =>{
    let connection = mysql.createConnection(db_config);

  connection.query(`INSERT INTO department (name) VALUES ('${answers.department}')`, (err, res) => {
    if (err) throw err
  }); 

  connection.end();
  cli();
  });
}

module.exports = addDepartment;