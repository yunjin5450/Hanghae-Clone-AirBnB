'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Likes.belongsTo(models.Accommodations, {
        foreignKey: "accId",
        // onDelete: "CASCADE",
      });
      Likes.belongsTo(models.Members, {
        foreignKey: "memberId",
        // onDelete: "CASCADE",
      });
      
    }
  }
  Likes.init({
    likesId: {
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
      // references: {
      //   model: 'Members',
      //   key: 'userId',
      // }
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.Now
    }
  }, {
    sequelize,
    modelName: 'Likes',
  });
  return Likes;
};
