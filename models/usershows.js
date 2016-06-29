'use strict';
module.exports = function(sequelize, DataTypes) {
  var userShows = sequelize.define('userShows', {
    userId: DataTypes.INTEGER,
    showId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return userShows;
};