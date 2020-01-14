const mysql = require('mysql');
const cTable = require('console.table');

const db_config = require("./connection");

// Queries than console logs employee info from the employee, department and role tables
let viewEmployees = (cli) => {

  let connection = mysql.createConnection(db_config);
  connection.query(`
  SELECT e1.id, e1.first_name, e1.last_name, role.title, department.name AS department, role.salary, CONCAT(e2.first_name, ' ', e2.last_name) AS manager FROM employee as e1
  LEFT JOIN role on e1.role_id = role.id
  LEFT JOIN department on role.department_id = department.id
  LEFT JOIN employee as e2 on e2.id = e1.manager_id;`
  ,
  (err, res) => {
    let employeeTable = [];
    res.forEach((employee) => {
      employeeTable.push (
        {'id': employee.id, 
         'first_name' : employee.first_name,
         'last_name': employee.last_name, 
         'title': employee.title, 
         'department': employee.department, 
         'salary': employee.salary, 
         'manager' : employee.manager
        });
    });

     console.table(
        employeeTable
      ); 
      connection.end();
      cli();
  }); 

}

module.exports = viewEmployees;