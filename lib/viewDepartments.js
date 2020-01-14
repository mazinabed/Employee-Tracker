const mysql = require('mysql');
const cTable = require('console.table');

const db_config = require("./connection");

// Queries than console logs departments
let viewDepartments = (cli) => {

  let connection = mysql.createConnection(db_config);
  connection.query(`
  SELECT id, name FROM department`
  ,
  (err, res) => {
    let departmentTable = [];
    res.forEach((department) => {
      departmentTable.push (
        {'id': department.id, 
         'name': department.name, 
        });
    });

     console.table(
        departmentTable
      ); 

      connection.end();
      cli();
  }); 

}

module.exports = viewDepartments;