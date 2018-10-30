// Require packages
const mysql = require("mysql");
const inquirer = require("inquirer");
const fs = require("fs");
const Table = require("cli-table");
const chalk = require("chalk");

//===========================================================
// Table construct
//===========================================================
let inventoryTable = new Table();

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
                    { Item_Number: item.item_id, },
                    { Product: item.product_name }, 
                    { Department: item.department_name}, 
                    {Price: item.price}, 
                    { StockQty: item.stock_quantity }
                )    
            });
            
            
            console.log(inventoryTable.toString());
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
                        console.log("Sorry, that item is out of stock.");
                    } else {
                        console.log(`You total today is ${orderCost}. Thank you for shopping.`);
                    }
                    
                    
                }
            )
            
            connection.end();
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
