const { promptUser } = require('../index');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const { dropManager, createManagerTable, addManagers } = require('./Manager');

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'employee_manager_db',
    user: 'root',
    password: 'rootroot'
});

// View All Employees //
const viewAllEmp = () => {
    connection.query(
        `SELECT employee.id, employee.first_name, employee.last_name, roles.title AS role,
            roles.salary AS salary,
            manager.first_name AS manager,
            department.name AS department 
            FROM employee
            LEFT JOIN roles
            ON employee.role_id = roles.id
            LEFT JOIN department
            ON roles.department_id = department.id
            LEFT JOIN manager
            ON employee.manager_id = manager.id`,
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

// View Employees By Department //
const viewEmpByDep = () => {
    connection.query(
        `SELECT * FROM department`,
        function (error, results, fields) {
            if (error) {
                console.log(error.message);
                return;
            }
            depArray = [];
            results.forEach(item => {
                depArray.push(item.name)
            });
            inquirer
                .prompt({
                    type: 'list',
                    name: 'filter_emp_by_dep',
                    message: 'Select a department to view the employees in that department',
                    choices: depArray
                })
                .then((data) => {
                    connection.query(
                        `SELECT employee.id, employee.first_name, employee.last_name, department.name AS department 
                            FROM employee
                            LEFT JOIN roles
                            ON employee.role_id = roles.id
                            LEFT JOIN department
                            ON roles.department_id = department.id
                            WHERE department.name = ?`,
                        [data['filter_emp_by_dep']],
                        function (error, results, fields) {
                            if (error) {
                                console.log(error.message);
                                return;
                            }
                            console.table(results);
                            promptUser();
                        }
                    )
                });
        }
    );
};

//  View Employees By Manager //
const viewEmpByManager = () => {
    connection.query(
        `SELECT * FROM manager`,
        function (error, results, fields) {
            if (error) {
                console.log(error.message);
                return;
            }
            managerArray = [];
            results.forEach(item => {
                managerArray.push(item.first_name)
            });

            inquirer
                .prompt({
                    type: 'list',
                    name: 'filter-emp-man',
                    message: 'Select a manager to view the employees under them',
                    choices: managerArray
                })
                .then((data) => {
                    connection.query(
                        `SELECT employee.id, employee.first_name, manager.first_name AS manager
                            FROM employee
                            LEFT JOIN manager
                            ON employee.manager_id = manager.id
                            WHERE manager.first_name = ?`,
                        [data['filter-emp-man']],
                        function (error, results, fields) {
                            if (error) {
                                console.log(error.message);
                                return;
                            }
                            console.table(results);
                            promptUser();
                        }
                    );
                });

        }
    );
};

// Add New Employee //
const addEmp = () => {
    connection.query(
        `SELECT * FROM roles`,
        function (error, results, fields) {
            if (error) {
                console.log(error.message);
                return;
            }
            let roleArray = [];
            results.forEach(item => {
                roleArray.push(item.title)
            })
            connection.query(
                `SELECT * FROM manager`,
                function (error, results, fields) {
                    if (error) {
                        console.log(error.message);
                        return;
                    }

                    let managerArray = [];

                    results.forEach(item => {
                        managerArray.push(item.first_name)
                    });

                    inquirer
                        .prompt([
                            {
                                type: 'text',
                                name: 'first_name',
                                message: 'What the first name of your new employee?'
                            },
                            {
                                type: 'text',
                                name: 'last_name',
                                message: 'What the last name of your new employee?'
                            },
                            {
                                type: 'list',
                                name: 'role_pick',
                                message: 'What role will your new employee be assigned to?',
                                choices: roleArray
                            },
                            {
                                type: 'confirm',
                                name: 'manager_confirm',
                                message: 'Is the role of this new employees a manager position?'
                            },
                            {
                                type: 'list',
                                name: 'manager_pick',
                                message: 'Who will your employees manager be?',
                                when: ({ manager_confirm }) => {
                                    if (!manager_confirm) {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                },
                                choices: managerArray
                            }
                        ])
                        .then((data) => {
                            let role_id;

                            for (i = 0; i < roleArray.length; i++) {
                                if (data.role_pick === roleArray[i]) {
                                    role_id = i + 1
                                }
                            }

                            let manager_confirm;

                            if (data.manager_confirm === true) {
                                manager_confirm = 1;
                            } else {
                                manager_confirm = 0
                            }

                            let manager_id;

                            if (!data.manager_pick) {
                                manager_id = null;
                            } else {
                                for (i = 0; i < managerArray.length; i++) {
                                    if (data.manager_pick === managerArray[i]) {
                                        manager_id = i + 1
                                    }
                                }
                            }
                            connection.query(
                                `INSERT INTO employee (first_name, last_name, role_id, manager_id, manager_confirm)
                                    VALUES (?, ?, ?, ?, ?)`,
                                [data.first_name, data.last_name, role_id, manager_id, manager_confirm],
                                function (error, results, fields) {
                                    if (error) {
                                        console.log(error.message);
                                        return;
                                    }
                                    dropManager();
                                    createManagerTable();
                                    addManagers();
                                    console.log('Employee succesfully added!');
                                    promptUser();
                                }
                            );
                        });
                }
            );
        }
    );
};

// Update Employee Role //
const updateEmp = () => {
    connection.query(
        `SELECT * FROM roles`,
        function (error, results, fields) {
            if (error) {
                console.log(error.message);
                return;
            }

            let roleArray = [];

            results.forEach(item => {
                roleArray.push(item.title)
            })
            connection.query(
                `SELECT first_name, last_name FROM employee`,
                function (error, results, fields) {
                    if (error) {
                        console.log(error.message);
                    }

                    let nameArray = [];

                    results.forEach(item => {
                        nameArray.push(item.first_name);
                        nameArray.push(item.last_name);
                    })

                    let combinedNameArray = [];

                    for (let i = 0; i < nameArray.length; i += 2) {
                        if (!nameArray[i + 1])
                            break
                        combinedNameArray.push(`${nameArray[i]} ${nameArray[i + 1]}`)
                    }
                    inquirer
                        .prompt([
                            {
                                type: 'list',
                                name: 'name_select',
                                message: 'Which employee you would like to update?',
                                choices: combinedNameArray
                            },
                            {
                                type: 'list',
                                name: 'role_select',
                                message: 'Which role would you like re-assign to this employee?',
                                choices: roleArray
                            }
                        ])
                        .then((data) => {
                            let role_id;
                            for (let i = 0; i < roleArray.length; i++) {
                                if (data.role_select === roleArray[i]) {
                                    role_id = i + 1;
                                }
                            };
                            
                            let selectedNameArray = data.name_select.split(' ');
                            let last_name = selectedNameArray.pop();
                            let first_name = selectedNameArray[0];

                            connection.query(
                                `UPDATE employee 
                                        SET role_id = ?
                                        WHERE first_name = ? AND last_name = ?`,
                                [role_id, first_name, last_name],
                                function (error, results, fields) {
                                    if (error) {
                                        console.log(error.message);
                                        return;
                                    }
                                    console.log('Employee updated!');
                                    promptUser();
                                }
                            );
                        });
                }
            );

        }
    );
};

module.exports = { viewAllEmp, viewEmpByDep, viewEmpByManager, addEmp, updateEmp };