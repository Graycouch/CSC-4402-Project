const mysql2 = require("mysql2");

let connection = mysql2.createConnection({
    host: 'localhost',
    database: 'voter_registration',
    user: 'root',
    password: 'Lollol236!'
});

connection.connect(function (error) {
    if (error) {
        console.log("Connection to MySQL database failed!");
    } else {
        console.log("Connected to MySQL database successfully!");
    }
});

module.exports = connection;
