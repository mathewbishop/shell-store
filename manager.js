// Dependencies
require("dotenv").config();
const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("cli-table");
const chalk = require("chalk");
const questions = require("./questions");

//===========================================================
// Table construct
//===========================================================
let inventoryTable = new Table({ head: ["", chalk.cyan("ID"), chalk.cyan("Product"), chalk.cyan("Department"), chalk.cyan("Price"), chalk.cyan("StockQty")]});

//===========================================================
// Connection info for the DB
//===========================================================
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
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
    connection.end();
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
        connection.end();
}
//===========================================================
// Replenish Inv
//===========================================================
// select item number
// select how many to replenish
const replenishInv = () => {
    inquirer.prompt(questions.replenishQs)
    .then(answers => {
        let item = answers.selectItem;
        let qty = answers.addQty;
        connection.query(
            `UPDATE products SET stock_quantity = stock_quantity + ${qty} WHERE item_id=${item}`,
            (err) => {
                if (err) throw err;
                console.log("Stock Quantity updated successfully.");
                connection.end();
            }
        )
    })
}
//===========================================================
// Add Product
//===========================================================
const addProduct = () => {
    inquirer.prompt(questions.addProdQs)
    .then(answers => {
        let name = answers.prodName;
        let dept = answers.deptName;
        let price = answers.price;
        let qty = answers.stock_quantity;
        connection.query(
            "INSERT INTO products SET ?",
            {
                product_name: name,
                department_name: dept,
                price: price,
                stock_quantity: qty
            },
            (err) => {
                if (err) throw err;
                console.log("Product entered successfully.");
                connection.end();
            }
        )
    })
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
            displayProducts();
            break;

            case 'View Low Inventory':
            viewLowInv();
            break;

            case 'Replenish Inventory':
            replenishInv();
            break;

            case 'Add New Product':
            addProduct();
            break;

            case 'Quit':

            break;
        }
    });
}

//===========================================================
// Start App
//===========================================================
initialPrompt();