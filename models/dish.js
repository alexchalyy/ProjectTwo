module.exports = function(sequelize, DataTypes) {
  var Dish = sequelize.define("Dish", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Dish;
};

/*
module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("Example", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Example;
}; */

