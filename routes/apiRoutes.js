var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/dishes", function(req, res) {
    db.Dish.findAll({}).then(function(dbDishes) {
      res.json(dbDishes);
    });
  });

  // Create a new example
  app.post("/api/dishes", function(req, res) {
    db.Dish.create(req.body).then(function(dbDish) {
      res.json(dbDish);
    });
  });

// think there will need to be an update/put here

//dont think this code is needed... not deleting anything
  // Delete an example by id
   app.delete("/api/dishes/:id", function(req, res) {
     db.Dish.destroy({ where: { id: req.params.id } }).then(function(dbDish) {
       res.json(dbDish);
     });
   });
};
