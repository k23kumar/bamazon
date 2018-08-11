var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    displayMenu()
  });

function displayMenu() {
    console.log();
    var choiceList =  [ 
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
    ];

    var options = [
        {
            name: "action",
            type: "list",
            message: "Please select one",
            choices: choiceList
        }
    ];

    inquirer
    .prompt(options)
    .then(function(answer) {
        const choiceNumber = choiceList.indexOf(answer.action);
        switch (choiceNumber) {
            case 0:
                viewProducts();
                break;
            case 1:
                viewInventory();
                break;
            case 2:
                addInventory();
                break;
            case 3:
                addProduct();
                break;

        }
    });
}
 
function viewProducts() {
    connection.query("SELECT * from products", function(err, res) {
        if (err) throw err;
        // console.log(res);
        console.log("Item ID, Product Name, Price, Quantity");
        for (item of res) {
          console.log(item.item_id + ", " + item.product_name + ", $" + item.price + ", " + item.stock_quantity);
        }
         displayMenu()
        }
    )
} 

function viewInventory() {
    connection.query ("SELECT * from products WHERE stock_quantity <= 5 ", function(err, res) {
        if (err) throw err;
        console.log("Item ID, Product Name, Price, Quantity");
        for (item of res) {
            console.log(item.item_id + ", " + item.product_name + ", $" + item.price + ", " + item.stock_quantity);
        }
        displayMenu()
        }   
    )

}

function addInventory() {

    const questions = [
        {
          type: "input",
          message: "Select the ID number of the product to which you wish to add inventory?",
          name: "productID"
        },
        {
          type: "input",
          message: "How many would you like to add?",
          name:"quantity"
        }
      ];
      inquirer
        .prompt(questions)
        .then(function(answer) {

            var sql = "SELECT * from products WHERE item_id = ?";
              connection.query(sql, answer.productID, function(err, result) {
                if (err) throw err;
                // console.log(result);
                var item = result[0]; 
                
                var inventoryToAdd = parseInt(answer.quantity);
                var sql =  "UPDATE products SET stock_quantity=(stock_quantity + ?) WHERE ?";
                  connection.query(sql, [
                   inventoryToAdd,
                    {item_id: answer.productID}
                  ], function(err, result) {
                    if (err) throw err;
                    // Display updated inventory to manager
                    var newInventory = inventoryToAdd + item.stock_quantity;
                    console.log("Inventory added successfully. There are now " + newInventory + " items of " + item.product_name + " in stock.");
                    displayMenu()
                    // connection.end();
                  })
            }
        )
        })
}

function addProduct() {
    const questions = [
        {
            type: "input",
            message: "What is the name of the new product?",
            name: "productName"
        },
        {
            type: "input",
            message: "Which department would you like to put the product in?",
            name: "productDepartment"
        },
        {
            type: "input",
            message: "What is the price of the product?",
            name:"productPrice"
        },
         {
            type: "input",
            message: "How many items of the product would you like to add?",
            name: "productQuantity"
        },
        
      ];
      inquirer
        .prompt(questions)
        .then(function(answer) {

            var sql = "INSERT into products SET ?";
              connection.query(sql, 
                {
                  product_name: answer.productName,
                  department_name: answer.productDepartment,
                  price: parseFloat(answer.productPrice),
                  stock_quantity: parseInt(answer.productQuantity)
                }, 
                function(err, result) {
                if (err) throw err;
                console.log("Your product was added successfully, boss.")
                displayMenu()
                
            }
        )
        })
}

         
        

