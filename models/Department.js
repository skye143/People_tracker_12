const { promptUser } = require('../index');
const inquirer = require('inquirer');
const mysql = require('mysql2');



const connection = mysql.createConnection({
    host: 'localhost',
    database: 'employee_manager_db',
    user: 'root',
    password: 'rootroot'
});





// View Departments //
const viewDep = () => {
    connection.query(
        `SELECT * FROM department`,
        function (error, results, fields) {
            if (error) {
                console.log(error.message);
                return;
            }
            console.table(results);
            promptUser();
        }
    )
};


// Add Department //
const addDep = () => {
    inquirer
        .prompt({
            type: 'text',
            name: 'dep_name',
            message: 'What is the name of the depertment you would like to add?'
        })
        .then((data) => {
            connection.query(
                `INSERT INTO department (name) VALUES(?)`,
                [data.dep_name],
                function (error, results, fields) {
                    if (error) {
                        console.log(error.message);
                        return;
                    }
                    console.log('New department has been added');
                    promptUser();
                }
            )
        })
};



module.exports = { viewDep, addDep }