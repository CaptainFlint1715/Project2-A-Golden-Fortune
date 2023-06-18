const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Scene extends Model { }

Scene.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        image: {
            type: DataTypes.STRING,
        },
        text: {
            type: DataTypes.STRING,
        },
        triggered_scene_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
              model: 'scene',
              key: 'id',
            },
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