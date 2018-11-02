// Require packages
const mysql = require("mysql");
const inquirer = require("inquirer");
const fs = require("fs");
const Table = require("cli-table");
const chalk = require("chalk");

//===========================================================
// Table construct
//===========================================================
let inventoryTable = new Table({ head: ["", chalk.cyan("ID"), chalk.cyan("Product"), chalk.cyan("Department"), chalk.cyan("Price"), chalk.cyan("StockQty")]});

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
// Display All Products
//===========================================================
const displayProducts = () => {
    connection.query(
    "SELECT * FROM products",
        (err, res) => {
            if (err) throw err;
            res.forEach(item => {
                inventoryTable.push(
                     { "": [item.item_id, item.product_name, item.department_name, item.price, item.stock_quantity] }
                )    
            });            
            console.log(chalk.white(inventoryTable.toString()));
        }
    )
}
//===========================================================
// View Low Inv
//===========================================================
const viewLowInv = () => {
    connection.query(
        "SELECT * FROM products WHERE stock_quantity < 5",
            (err, res) => {
                if (err) throw err;
                res.forEach(item => {
                    inventoryTable.push(
                         { "": [item.item_id, item.product_name, item.department_name, item.price, item.stock_quantity] }
                    )    
                });            
                console.log(chalk.white(inventoryTable.toString()));
            }
        )
}




//===========================================================
// Initial Prompt
//===========================================================
const initialPrompt = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'initPrompt',
            message: 'Please select an option',
            choices: ['View Products', 'View Low Inventory', 'Replenish Inventory', 'Add New Product', 'Quit']
        }
    ])
    .then(answers => {
        switch (answers.initPrompt) {
            case 'View Products':
            
            break;

            case 'View Low Inventory':

            break;

            case 'Replenish Inventory':

            break;

            case 'Add New Product':

            break;

            case 'Quit':

            break;
        }
    });
}