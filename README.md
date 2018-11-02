# shell-store
A fictional store full of CRUD with a CLI. MySQL and Node.js

## Welcome to the Shell Store!
From Bash Shells to PowerShells, if its about shells, we have it!

I built this app with Node.js and MySQL. The core function of the app is to perform CRUD operations on a MySQL database when user input is received. 

There are two files you can run:
1. customer.js
2. manager.js

## customer.js 
Run ```$ node customer.js```

You taking on the role of a potential patron of the shell store (see, its an RPG too, who knew?!). 
### Features of customer.js
1. Displays all products at start
2. Choose a product to buy (selecty by ID #), and choose qty to purchase.
3. The qty you purchase will be removed from the stock qty field, and your purchase total will be displayed.
4. If the stock qty is at 0, you will get a message saying the item is out of stock.
![demo-of-program](demo-imgs/customer1.png)
![demo-of-program](demo-imgs/customer2.png)
![demo-of-program](demo-imgs/customer3.png)

## manager.js
Run ```$ node manager.js```

You take on the role of manager at the shell store. 
### Features of manager.js
1. View Products - lists all products
2. View Low Inventory - products with less than 5 stock qty will be displayed.
3. Replenish Inventory - re-stock the inventory of an item
4. Add New Product - add a new product to the database

![demo-of-program](demo-imgs/manager1.png)
![demo-of-program](demo-imgs/manager2.png)
![demo-of-program](demo-imgs/manager3.png)
![demo-of-program](demo-imgs/manager4.png)
![demo-of-program](demo-imgs/manager5.png)