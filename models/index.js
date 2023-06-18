const User = require('./User');
const Character = require('./Character');
const Scene = require('./Scene')
const Choice = require('./Choice')

User.hasMany(Character, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Character.belongsTo(User, {
  foreignKey: 'user_id'
});

Scene.hasMany(Choice, {
  foreignKey: 'scene_id',
  onDelete: 'CASCADE'
})

Choice.belongsTo(Scene, {
  foreignKey: 'scene_id'
})

Choice.belongsTo(Scene, {
  foreignKey: 'triggered_scene_id',
  as: 'triggeredScene'
});

Scene.hasMany(Choice, {
  foreignKey: 'triggered_scene_id',
  as: 'triggeringChoices'
});

module.exports = { User, Character, Scene, Choice };
