var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/orders", function(req, res) {
    db.Dish.findAll({}).then(function(dbDishes) {
      res.render("index", {
        msg: "Welcome!",
        dishes: dbDishes
      });
    });
  });

  app.get("/", function(req, res) {
    console.log("here");
    db.Dish.findAll({}).then(function(dbDishes) {
      console.log("here");
      res.render("home", {
        msg: "Welcome!",
        dishes: dbDishes
      });
    });
  });

  //dont think this is needed... its not used
  
  // Load example page and pass in an example by id
  // app.get("/dish/:id", function(req, res) {
  //   //console.log("here");
  //   db.Dish.findOne({ where: { id: req.params.id } }).then(function(dbDish) {
  //     res.render("dish", {
  //       dish: dbDish
  //     });
  //   });
  // });
  
  // render the menu page
  app.get("/menu", function(req, res) {
    res.render("menu");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
