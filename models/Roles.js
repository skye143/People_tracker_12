const { promptUser} = require('../index');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'employee_manager_db',
    user: 'root',
    password: 'rootroot'
});

// View Roles //
const viewRoles = () => {
    connection.query(
        `SELECT roles.id, roles.title, roles.salary, department.name
            FROM roles
            LEFT JOIN department
            ON roles.department_id = department.id`,
        function (error, results, fields) {
            if (error) {
                console.log(error.message);
                return;
            }
            console.table(results);
            promptUser();
        }
    );
};



module.exports = { viewRoles, addRole };
