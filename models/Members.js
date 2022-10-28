'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Members extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Members.hasMany(models.Accomodations, {
        foreignKey: "memberId",
        // onDelete: "CASCADE",
      });
      Members.hasMany(models.Reservations, {
        foreignKey: "memberId",
        // onDelete: "CASCADE",
      });
      Members.hasMany(models.Reviews, {
        foreignKey: "memberId",
        // onDelete: "CASCADE",
      });
      Members.hasMany(models.Likes, {
        foreignKey: "memberId",
        // onDelete: "CASCADE",
      });
    }
  }
  Members.init({
    memberId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    memberEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNum: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    memberImg: {
      type: DataTypes.STRING,
      allowNull: true
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
    modelName: 'Members',
  });
  return Members;
};
