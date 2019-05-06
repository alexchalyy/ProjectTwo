module.exports = function(sequelize, DataTypes) {
  var Dish = sequelize.define("Dish", {
    order: DataTypes.STRING,
    ready: {type: DataTypes.BOOLEAN, defaultValue: false},
    pickup: {type: DataTypes.BOOLEAN, defaultValue: false}
    // id and time created are created by Sequelize
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

