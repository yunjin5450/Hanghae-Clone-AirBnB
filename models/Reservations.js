'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Reservations.belongsTo(models.Members, {
        foreignKey: "memberId",
        // onDelete: "CASCADE",
      });
      Reservations.belongsTo(models.Accommodations, {
        foreignKey: "accId",
        // onDelete: "CASCADE",
      });
      Reservations.hasOne(models.Reviews, {
        foreignKey: "resId",
        // onDelete: "CASCADE",
      });
    }
  }
  Reservations.init({
    resId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
    accId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      // references: {
      //   model: 'Accommodations',
      //   key: 'accId',
      // }
    },
    memberId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    personNum:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    resCheckIn: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    resCheckOut: {
      type: DataTypes.DATE,
      allowNull: true,
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
    modelName: 'Reservations',
  });
  return Reservations;
};
