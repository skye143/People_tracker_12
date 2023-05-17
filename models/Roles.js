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

// Add Role //
const addRole = () => {
    connection.query(
        `SELECT * FROM department`,
        function (error, results, fields) {
            if (error) {
                console.log(error);
                return;
            }
            let depArray = [];
            results.forEach(item => {
                depArray.push(item.name)
            })
            inquirer
                .prompt([
                    {
                        type: 'text',
                        name: 'role_title',
                        message: 'What is the name of the role you would like to add?'
                    },
                    {
                        type: 'number',
                        name: 'salary',
                        message: 'Enter the salary of the new role. (DO NOT use commas or periods)  ?'
                    },
                    {
                        type: 'list',
                        name: 'department',
                        message: 'What department does the new role belong to?',
                        choices: depArray
                    }
                ])
                .then ((data) => {
                    let department_id;
                    for (let i = 0; i < depArray.length; i++) {
                        if (depArray[i] === data.department) {
                            department_id = i + 1;
                        };
                    };
                    connection.query(
                        `INSERT INTO roles (title, salary, department_id) VALUES(?,?,?)`,
                        [data.role_title, data.salary, department_id],
                        function (error, results, fields) {
                            if (error) {
                                console.log(error.message);
                                return;
                            }
                            console.log('New role added');
                            promptUser();
                        }
                    );
                });
        }
    );
};

module.exports = { viewRoles, addRole };
