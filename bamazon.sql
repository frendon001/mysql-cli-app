DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Headphones", "Electronics", 49.99, 100),
	("Chromebook", "Electronics", 249.99, 400),
	("Fancy Coaster", "Home Decor", 2.50, 5000),
	("Decorative Pillow", "Home Decor", 10.50, 2000),
	("Globe 5 inch", "Home Decor", 25, 200),
	("Notebook", "School Supplies", 1.00, 500),
	("Pencils (10pk)", "School Supplies", 2.00, 800),
	("Binder", "School Supplies", 1.50, 700),
	("Potato Chips", "Food", 2.50, 900),
	("Cookies", "Food", 4.50, 800);