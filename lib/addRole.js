let inquirer = require("inquirer");
const mysql = require('mysql');

const db_config = require("./connection");

let roleInquiry = (cli, roles) => {

  inquirer.prompt([{
    type:"input",
    name:"title",
    message:"What is the role you wish to add?",
  },
  {
    type:"input",
    name:"salary",
    message:"What is the salary of the role?",
  },
  {
    type:"list",
    name:"role_department",
    message:"What department does the role belong too?",
    choices: roles,
  }])
  .then((answers) =>{

     //Returns the roleid that matches the role selected
    function roleSearch(roleKey, myArray){
      for (var i=0; i < myArray.length; i++) {
          if (myArray[i].name === roleKey) {
                return myArray[i];
              }
          }
      }
      let rolesId = roleSearch(answers.role_department, roles);
      let connection = mysql.createConnection(db_config);

  connection.query(`INSERT INTO role (title, salary, department_id ) VALUES ('${answers.title}', ${parseInt(answers.salary)}, ${parseInt(rolesId.department_id)} )`, (err, res) => {
    if (err) throw err
  }); 
  
  connection.end();
  cli();
  });
}

// Make mysql call to grab department information
let getDepartments = (cli) =>{
  let roles = [];
  let connection = mysql.createConnection(db_config);
  connection.query(`
  SELECT DISTINCT department.id as department_id, name FROM role
  RIGHT JOIN department on role.department_id = department.id;`,
    (err, res) => {
      res.forEach((role) => {
        roles.push ({
          "department_id": role.department_id,
          "name": role.name
        }
          );
        });
        connection.end();
        roleInquiry(cli,roles);  
      });  
}

let addRole = (cli) => {
  getDepartments(cli);
}

module.exports = addRole;