var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    // I commented this out because our rendering of information from the database will be shown on our "order status page", but will clean this up once we 
    // use this boiler plate code for rendering the data needed.
    // db.Example.findAll({}).then(function(dbExamples) {                   
    //   res.render("index", {
    //     msg: "Welcome!",
    //     examples: dbExamples
    //   });
    // });
    res.render("index");
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });
  
  // render the menu page
  app.get("/menu", function(req, res) {
    res.render("menu");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
