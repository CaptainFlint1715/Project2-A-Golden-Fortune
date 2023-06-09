const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Choice extends Model { }

Choice.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    story_text: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    scene_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'scene',
        key: 'id',
      },
    },
    triggered_scene_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'scene',
        key: 'id',
      },
    },
    story_ending: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'choice',
  }
);

module.exports = Choice;
