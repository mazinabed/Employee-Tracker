const inquirer = require('inquirer');

const viewEmployees = require("./viewEmployees.js");
const viewDepartments = require("./viewDepartments.js");
const viewRoles = require("./viewRoles.js");
const viewEmployeesByDepartment = require("./viewEmployeesByDepartment.js");
const viewEmployeesByManager = require("./viewEmployeesByManager.js");
const addEmployee = require("./addEmployee.js");
const addDepartment = require("./addDepartment.js");
const addRole = require("./addRole.js");
const removeEmployee = require("./removeEmployee.js");
const updateEmployeeRole = require("./updateEmployeeRole.js");

//Brain of the application Handles all application calls

let cli = () => {
  inquirer.prompt({
    name: "employeesOptions",
    type: "list",
    message: "What would you like to do?",
    choices: ["None", "View All Employees", "View All Employees By Department", "View All Employees By Manager", "View All Departments", "View All Roles",
    "Add Department", "Add Role", "Add Employee", "Remove Employee", "Update Employee Role"],
  }).then((answer) =>{
    if(answer.employeesOptions == "None"){
      return process.exit(22);
    }else if(answer.employeesOptions == "View All Employees"){
      viewEmployees(cli);
    }else if (answer.employeesOptions == "View All Employees By Department" ){
      viewEmployeesByDepartment(cli);
    }else if(answer.employeesOptions == "View All Employees By Manager"){
      viewEmployeesByManager(cli);
    }else if(answer.employeesOptions == "View All Departments"){
      viewDepartments(cli);
    }else if(answer.employeesOptions == "View All Roles"){
      viewRoles(cli);
    }else if(answer.employeesOptions == "Add Department"){
      addDepartment(cli);
    }else if(answer.employeesOptions == "Add Role"){
      addRole(cli);
    }else if(answer.employeesOptions == "Add Employee"){
      addEmployee(cli);
    }else if(answer.employeesOptions == "Remove Employee"){
      removeEmployee(cli);
    }else if(answer.employeesOptions == "Update Employee Role"){
      updateEmployeeRole(cli);
    }
  });
  }

  module.exports = cli;