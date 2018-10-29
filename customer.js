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

const makeConnection = () => {
        connection.connect(err => {
        if (err) throw err;
    })
}
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
                `UPDATE products SET stock_quantity = stock_quantity - ${quantity} WHERE ?`,
                [
                    {
                        item_id: productSelection
                    }
                ]
            )
            connection.end();
            break;

            case false:
            connection.end();
            break;
        }
        
    })
} 


makeConnection();
displayProducts();
setTimeout(initialPrompt, 500);
