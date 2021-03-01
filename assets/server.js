const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Gr3tch3n2379!",
    database: "cms"
});

connection.connect();

connection.query = util.promisify(connection.query);

module.exports = connection;