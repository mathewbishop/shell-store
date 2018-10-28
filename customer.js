const mysql = require("mysql");
const inquirer = require("inquirer");
const fs = require("fs");

const DB_Connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "penguin237",
    database: "shell_storeDB"
});

const makeConnection = () => {
    DB_Connection.connect()
}