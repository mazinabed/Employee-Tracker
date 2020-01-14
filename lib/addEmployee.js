let inquirer = require("inquirer");
const mysql = require('mysql');

const db_config = require("./connection");

//Get roles

let employeeInquiry = (cli, roles, employees) => {

  let roleTitles = [];

  (function(){
    roles.forEach((role) =>{
      roleTitles.push(role.title);
    })
  }());

  let employeeNames = ['None'];

  (function(){
    employees.forEach((person) =>{
      employeeNames.push(person.full_name);
    })
  }());
  
  inquirer.prompt([{
    type:"input",
    name:"first_name",
    message:"What is the employees first name?",
  },
  {
    type:"input",
    name:"last_name",
    message:"What is the employees last name?",
  },
  {
    type:"list",
    name: 'role',
    message: 'What is the employees role?',
    choices: roleTitles,
  },
  {
    type:"list",
    name: 'full_name',
    message: 'Who is the employees manager?',
    choices: employeeNames,
  }])
  .then((answers) =>{

    // Returns the id that matches the roles text
    function roleSearch(roleKey, myArray){
      for (var i=0; i < myArray.length; i++) {
          if (myArray[i].title === roleKey) {
                return myArray[i];
              }
          }
      }
    let rolesId = roleSearch(answers.role, roles);
    
    //Returns the employeeid that matches the employeename
    function employeeSearch(managerKey, myArray){
      for (var i=0; i < myArray.length; i++) {
        if (myArray[i].full_name === managerKey) {
                return myArray[i];
              }
          }
      }

      let employeeId;
      // Null was added to the list of choices above in the case they wish to choose no manager
      if (answers.full_name === "None"){
        employeeId = {'id': null}
      }else{
        employeeId = employeeSearch(answers.full_name, employees);
      }

    let connection = mysql.createConnection(db_config);
    // Inserts the emplyoee into the mysql database.
    connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id ) VALUES ('${answers.first_name}', '${answers.last_name}', ${rolesId.id}, ${employeeId.id})`, (err, res) => {
      if (err) throw err
    }); 
    connection.end();
    cli();
  });


}

// Queries than passes employee info
let getEmployees = (cli, roles) =>{
  let employees = [];
  let connection = mysql.createConnection(db_config);
  connection.query(`
  SELECT id, first_name, last_name, CONCAT(first_name, ' ', last_name) AS full_name FROM employee;;`,
    (err, res) => {
      res.forEach((employee) => {
        employees.push ({
          "id": employee.id,
          "first_name": employee.first_name,
          "last_name": employee.last_name,
          "full_name": employee.full_name
        }
          );
        });
        connection.end();
        employeeInquiry(cli, roles, employees);   
      });  
}

// Queries than passes role info
let getRoles = (cli) =>{
  let connection = mysql.createConnection(db_config);
  let roles = [];
  connection.query(`
    SELECT * from role;`,
    (err, res) => {
      
      res.forEach((role) => {
        roles.push ({
          "title": role.title,
          "id": role.id
        }
          );
        });
        connection.end();
        getEmployees(cli,roles);  
      });  
}


let addEmployee = (cli) => {
  getRoles(cli);
}

module.exports = addEmployee;