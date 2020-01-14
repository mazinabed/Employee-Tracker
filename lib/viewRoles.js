const mysql = require('mysql');
const cTable = require('console.table');

const db_config = require("./connection");

// Queries than console logs roles
let viewRoles = (cli) => {
  let connection = mysql.createConnection(db_config);
  connection.query(`
  SELECT id, title, salary, department_id FROM role;`
  ,
  (err, res) => {
    let roleTable = [];
    res.forEach((role) => {
      roleTable.push (
        {'id': role.id, 
         'title' : role.title,
         'salary' : role.salary,
         'last_name': role.last_name, 
         'department_id': role.department_id, 
        });
    });

     console.table(
        roleTable
      ); 
      connection.end();
      cli();
  }); 

}

module.exports = viewRoles;