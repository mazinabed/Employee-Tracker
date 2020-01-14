const mysql = require('mysql');
const cTable = require('console.table');

// Create Connection
const db_config = {
  host: 'localhost',
  user: 'root',
  password: 'maha1984',
  database: 'employeetracker_db',
  port:3306
};

module.exports = db_config;

