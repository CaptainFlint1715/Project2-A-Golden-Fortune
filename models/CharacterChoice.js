const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class CharacterChoice extends Model {}

CharacterChoice.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    character_story_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'characterStory',
        key: 'id',
      },
    },
    choice_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'choice',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'characterChoice',
  }
);

module.exports = CharacterChoice;
