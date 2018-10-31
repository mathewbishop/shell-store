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

const makeConnection = () => {
        connection.connect(err => {
        if (err) throw err;
    })
}

let unitCost;
//===========================================================
// Display all products
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
// Initial prompt 
//===========================================================
const initialPrompt = () => {
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'beginShopping',
            message: 'Would you like to make a purchase?'
        },
        {
            type: 'input',
            name: 'productID',
            message: 'Please enter the ID # of the product you want to purchase: ',
            when: answers => { return answers.beginShopping === true; }
        },
        {
            type: 'input',
            name: 'quantityDesired',
            message: 'Please enter the quantity you wish to purchase: ',
            when: answers => { return answers.beginShopping === true; }
        }
    ])
    .then(answers => {
        switch (answers.beginShopping) {
            case true:
            let productSelection = answers.productID;
            let quantity = answers.quantityDesired;
                connection.query(
                    `SELECT * FROM products WHERE item_id=${productSelection}`,
                    (err, res) => {
                        if (err) throw err;
                        unitCost = res[0].price;
                    }
                )
                connection.query(
                `UPDATE products SET stock_quantity = CASE WHEN stock_quantity > 0 THEN stock_quantity - ${quantity} ELSE stock_quantity END WHERE ?`,
                [
                    {
                        item_id: productSelection
                    }
                ],
                (err, res) => {
                    let orderCost = unitCost * quantity;
                    if (err) throw err;
                    if (res.changedRows === 0) {
                        console.log(chalk.red("\nSorry, that item is out of stock.\n"));
                        inquirer.prompt([
                            {
                                type: 'confirm',
                                name: 'startAgain',
                                message: 'Would you like to continue shopping?'
                            }
                        ]).then(answers => {
                            switch (answers.startAgain) {
                                case true:
                                initialPrompt();
                                break;

                                case false:
                                connection.end();
                                break;
                            }
                        })
                    } else {
                        console.log(chalk.green(`\nYou total today is ${orderCost} dollars. Thank you for shopping.\n`));
                        connection.end();
                    }
                    
                    
                }
            )
            

            break;

            case false:
            connection.end();
            break;
        }
        
    })
} 

//===========================================================
// Start app. connect and init function calls
//===========================================================
makeConnection();
displayProducts();
setTimeout(initialPrompt, 100);
