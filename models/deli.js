module.exports = function(sequelize, DataTypes) {
  var Deli = sequelize.define("Deli", {
    order: DataTypes.STRING,
    ready: {type: DataTypes.BOOLEAN, defaultValue: false},
    pickup: {type: DataTypes.BOOLEAN, defaultValue: false}
    // id and time created are created by Sequelize
  });
  return Deli;
};


