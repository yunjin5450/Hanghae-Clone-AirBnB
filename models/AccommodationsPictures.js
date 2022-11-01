'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AccommodationsPictures extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            AccommodationsPictures.belongsTo(models.Accommodations, {
                foreignKey: 'accId',
                // onDelete: "CASCADE",
            });
        }
    }
    AccommodationsPictures.init(
        {
            PicId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            accId: {
                allowNull: false,
                unique: true,
                type: DataTypes.INTEGER,
            },
            thumbnail: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            image1: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            image2: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            image3: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            image4: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.Now,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.Now,
            },
            deletedAt: {
                allowNull: true,
                type: DataTypes.DATE,
            },
        },
        {
            sequelize,
            modelName: 'AccommodationsPictures',
        }
    );
    return AccommodationsPictures;
};
