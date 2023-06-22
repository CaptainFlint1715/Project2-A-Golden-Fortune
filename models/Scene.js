const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Scene extends Model { }

Scene.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        image: {
            type: DataTypes.STRING,
        },
        text: {
            type: DataTypes.TEXT,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'scene',
    }
);

module.exports = Scene;