// Require packages
const mysql = require("mysql");
const inquirer = require("inquirer");
const fs = require("fs");
const Table = require("cli-table");

//===========================================================
// Connection info for the DB
//===========================================================
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "penguin237",
    database: "shell_storeDB"
});



//===========================================================
// Display all products
//===========================================================
const displayProducts = () => {
    connection.query(
    "SELECT * FROM products",
        (err, res) => {
            if (err) throw err;
            console.log(res);
        }
    )
    connection.end();
}

//===========================================================
// Initial prompt 
//===========================================================
const initialPrompt = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'productID',
            message: 'Please enter the ID # of the product you want to purchase: '
        },
        {
            type: 'input',
            name: 'quantityDesired',
            message: 'Please enter the quantity you wish to purchase: '
        }
    ]).then(answers => {
        let productSelection = answers.productID;
        let quantity = answers.quantityDesired;
        console.log(productSelection);
        
    })
} 



displayProducts();
setTimeout(initialPrompt, 1000);