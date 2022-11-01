'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Notifications.belongsTo(models.Members, {
        foreignKey: "memberId",
        // onDelete: "CASCADE",
      });
    }
  }
  Notifications.init({
    notiId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    memberId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content:{
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.Now
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.Now
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE,
    }
  }, {
    sequelize,
    modelName: 'Notifications',
  });
  return Notifications;
};
