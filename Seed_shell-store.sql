DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(60) NOT NULL,
    department_name VARCHAR(60),
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bourne Shell", "Software", 100.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bash Shell", "Software", 15.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("C Shell", "Software", 20, 5.00);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Z Shell", "Software", 7, 10.99);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("CMD.EXE", "Software", 30, 5.00);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("COMMAND.COM", "Software", 10, 20.00);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("4DOS", "Software", 2, 34.99);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Windows PowerShell", "Software", 500, 150.00);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hamilton C Shell", "Software", 5, 500.00);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Atari TOS Shell", "Software", 1, 1000.00);