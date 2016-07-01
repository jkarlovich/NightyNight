'use strict';
module.exports = function(sequelize, DataTypes) {
  var show = sequelize.define('show', {
    title: DataTypes.STRING,
    venue: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.INTEGER,
    lat: DataTypes.FLOAT,
    long: DataTypes.FLOAT,
    url: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.show.belongsToMany(models.user, { through: 'userShows' });
      }
    }
  });
  return show;
};
