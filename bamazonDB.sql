USE bamazon;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(30) NOT NULL,
deparment_name VARCHAR(30) NOT NULL,
price DECIMAL(10,3) NOT NULL,
stock_quantity INT,
PRIMARY KEY (item_id)
);

ALTER TABLE `products` CHANGE COLUMN `deparment_name` `department_name` VARCHAR(30) NOT NULL;

INSERT into products (product_name, department_name, price, stock_quantity)
VALUES ("milk", "dairy", 4.99, 177);

SELECT * FROM bamazon.products;

INSERT into products (product_name, department_name, price, stock_quantity)
VALUES ("macbook pro", "electronics", 1399.00, 58);

INSERT into products (product_name, department_name, price, stock_quantity)
VALUES ("Nineteen Eighty Four", "literature", 12.55, 24);

INSERT into products (product_name, department_name, price, stock_quantity)
VALUES ("Imported Italian Espresso", "coffee and tea", 17.99, 36);

INSERT into products (product_name, department_name, price, stock_quantity)
VALUES ("official Wilson NBA basketball", "sports", 89.97, 18);

INSERT into products (product_name, department_name, price, stock_quantity)
VALUES ("AntMan collectible toy", "toys", 16.87, 47);

INSERT into products (product_name, department_name, price, stock_quantity)
VALUES ("clean socks", "clothing", 8.00, 100);

INSERT into products (product_name, department_name, price, stock_quantity)
VALUES ("Scorpion", "music", 13.97, 88);

INSERT into products (product_name, department_name, price, stock_quantity)
VALUES ("Call of Duty Black Ops 4", "electronics", 59.99, 98);

INSERT into products (product_name, department_name, price, stock_quantity)
VALUES ("organic cat food", "pets", 17.99, 50);
