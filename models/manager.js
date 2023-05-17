const mysql = require('mysql2');


const connection = mysql.createConnection({
    host: 'localhost',
    database: 'employee_manager_db',
    user: 'root',
    password: 'rootroot'
});


// Deletes Manager Table //
const dropManager = () => {
    connection.query(
        `DROP TABLE IF EXISTS manager`,
        function (error, results, fields) {
            if (error) {
                console.log(error.message);
            }
        }
    )
};


// Creates Manager Table //
const createManagerTable = () => {
    connection.query(
        `CREATE TABLE manager (
            id INT NOT NULL AUTO_INCREMENT,
            first_name VARCHAR(30),
            last_name VARCHAR(30),
            PRIMARY KEY (id)
        )`,
        function (error, results, fields) {
            if (error) {
                console.log(error.message);
            }
        }
    )
};





// Add Manager //
const addManagers = () => {
    connection.query(
        `INSERT INTO manager (first_name, last_name)
        SELECT first_name,
            last_name
        FROM employee
        WHERE manager_confirm = 1`,
        function (error, results, fields) {
            if (error) {
                console.log(error.message);
            }
        }
    )
};



module.exports = { dropManager, createManagerTable, addManagers };















