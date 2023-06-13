const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Storyline extends Model { }

Storyline.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        choice_1: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        choice_2: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        choice_3: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        character_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'character',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'storyline',
    }
);

module.exports = Storyline;