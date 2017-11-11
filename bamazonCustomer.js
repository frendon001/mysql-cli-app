var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  queryAllProducts();
  purchasePrompt();
  // createProduct();
});


// Display available products in Database
function queryAllProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    console.log("Item ID | Item Name | Price($) | Stock Quantity");
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price + " | " + res[i].stock_quantity);
    }
    console.log("-----------------------------------");

  });

};

// function which prompts the user for what action they should take
function purchasePrompt() {
  // connect to database and obtain data before prompting user input
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;

    // once you have the items, ask the user which item they would like to purchase
    // also ask for the amount of items they would like to purchase
    inquirer
      .prompt([{
          name: "item_id",
          type: "list",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].item_id.toString());
            }
            return choiceArray;
          },
          message: "Select the ID of the item you would like to purchase: "
        },
        {
          name: "purchase_amount",
          type: "input",
          message: "Enter the amount you would like to purchase: ",
          validate: function(value) {
            var pass = value.match(/^\d+$/i);
            if (pass) {
              return true;
            }

            return 'Please enter a valid numerical value for your amount.';
          }
        }
      ])
      .then(function(answer) {
        //obtain selected item from database
        var selectedItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].item_id === parseInt(answer.item_id,10)) {
            selectedItem = results[i];
          }
        }
        //check to see if selected purchase amount is greater than amount in stock
        //otherwise complete purchase request
        var amountPurchased = parseInt(answer.purchase_amount,10);
        if (selectedItem.stock_quantity < amountPurchased) {
          console.log("Insufficient quantity in stock!");
          connection.end();
        } else {

          completePurchase(selectedItem.item_id,selectedItem.stock_quantity-amountPurchased);
          console.log("Total Purchase Cost: $" + amountPurchased*selectedItem.price );
        }
        
      }).catch(function(err) {
        console.log("Promise Rejected",err);
      });
  });
};

// udpate database
function completePurchase(id, updatedAmount) {
  connection.query("UPDATE products SET ? WHERE ?", [{
        stock_quantity: updatedAmount
      },
      {
        item_id: id
      }
    ],
    function(err, res) {
      if (err) throw err;
      connection.end();
    });

};