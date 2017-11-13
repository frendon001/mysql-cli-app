var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  //username
  user: "root",

  //password and database name
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;

  //promp user with a menu of options to run
  menu();
});

// Display available products in Database
function menu() {
  inquirer
    .prompt([{
      name: "menu_item",
      type: "list",
      choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
      message: "Select an action from the list below:"
    }])
    .then(function(answer) {
      switch (answer.menu_item) {
        case "View Products for Sale":
          //display prducts for sale
          viewProducts();
          break;
        case "View Low Inventory":
          //display low inentory items
          viewLowInventory();
          break;

        case "Add to Inventory":
          //add to inventory
          addInventory();
          break;
        case "Add New Product":
          //add new product
          addNewProduct();
          break;
        default:
          //Statements executed when none of
          //the values match the value of the expression
          console.log("No valid option selected.")
          connection.end();
          break;
      }

    }).catch(function(err) {
      console.log("Promise Rejected", err);
    });
};


// Display available products in Database
function viewProducts() {
  //display data from database
  connection.query("SELECT * FROM products", function(err, res) {
    console.log("Item ID | Item Name | Price($) | Stock Quantity");
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price + " | " + res[i].stock_quantity);
    }
    console.log("-----------------------------------");
    connection.end();
  });
};

// Display available products in Database
function viewLowInventory() {
  //display data from database
  connection.query("SELECT * FROM products", function(err, res) {
    console.log("Item ID | Item Name | Price($) | Stock Quantity");

    for (var i = 0; i < res.length; i++) {
      if (res[i].stock_quantity <= 5) {
        console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price + " | " + res[i].stock_quantity);
      }

    }
    console.log("-----------------------------------");
    connection.end();
  });
};

//add to inventory
function addInventory() {
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
          message: "Select the ID of the item you would like to add inventory: "
        },
        {
          name: "add_amount",
          type: "input",
          message: "Enter the amount you would like to add: ",
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
          if (results[i].item_id === parseInt(answer.item_id, 10)) {
            selectedItem = results[i];
          }
        }

        //add the amount entered to the selected inventory item
        var amountAdd = parseInt(answer.add_amount, 10) + selectedItem.stock_quantity;

        completeInventoryUpdate(selectedItem.item_id, amountAdd);

      }).catch(function(err) {
        console.log("Promise Rejected", err);
      });
  });
};

// udpate database
function completeInventoryUpdate(id, updatedAmount) {
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

// Add new products in Database
function addNewProduct() {
  // prompt for info about the new product
  inquirer
    .prompt([{
        name: "item",
        type: "input",
        message: "Enter the name of the product:"
      },
      {
        name: "department",
        type: "input",
        message: "What department is this product in?"
      },
      {
        name: "price",
        type: "input",
        message: "What is the price of the item?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return 'Please enter a valid numerical value for price.';
        }
      },
      {
        name: "quantity",
        type: "input",
        message: "What is the quantity of in inventory?",
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
      // when finished prompting, insert a new item into the database with that info
      connection.query(
        "INSERT INTO products SET ?", {
          product_name: answer.item,
          department_name: answer.department,
          price: answer.price,
          stock_quantity: answer.quantity
        },
        function(err) {
          if (err) throw err;
          console.log("Your new product was entered successfully!");
          connection.end();
          // re-prompt the user for if they want to bid or post
        }
      );
    });
};