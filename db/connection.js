const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'tracker_db'
});

connection.connect(function (err) {
    if (err) throw err
});

module.exports = db;








