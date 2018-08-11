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
    // console.log("connected as id " + connection.threadId);
    // afterConnection();
    selectAll();
    // productSelection();
  });
    
  function selectAll() {
    connection.query("SELECT * from products", function(err, res) {
      if (err) throw err;
      // console.log(res);
      console.log("Item ID, Product Name, Price");
      for (item of res) {
        console.log(item.item_id + ", " + item.product_name + ", $" + item.price);
      }
      productSelection();
    });
  }
  
  function afterConnection() {
    connection.query("SHOW TABLES", function(err, res) {
      if (err) throw err;
      // console.log(res);
    });
  }


function productSelection() {
  var questions = [
    {
      type: "input",
      message: "What is the id of the product you wish to purchase?",
      name: "productID"
    },
    {
      type: "input",
      message: "How many would you like to purchase?",
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
        
        var quantityDesired = parseInt(answer.quantity);
        if (item.stock_quantity < quantityDesired)
          console.log("Insufficient quantity");
        else {
          var sql =  "UPDATE products SET stock_quantity=(stock_quantity - ?) WHERE ?";
          connection.query(sql, [
            // {
            //   stock_quantity: (item.stock_quantity-quantityDesired)
            // },
            quantityDesired,
            {item_id: answer.productID}
          ], function(err, result) {
            if (err) throw err;
            // Display cost to user
            var cost = quantityDesired * item.price;
            console.log("Your total is $" + cost.toFixed(2) + " not including tip");
            connection.end();
          })
        }
      });
    });
}

