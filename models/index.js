const User = require('./User');
// const Character = require('./Character');
const CharacterChoice = require('./CharacterChoice');
const CharacterStory = require('./CharacterStory')
const Scene = require('./Scene')
const Choice = require('./Choice')

User.hasMany(CharacterStory, {
  foreignKey: 'user_id',
});

CharacterStory.belongsTo(User, {
  foreignKey: 'user_id'
});

Scene.hasMany(Choice, {
  foreignKey: 'scene_id',
})

Choice.belongsTo(Scene, {
  foreignKey: 'scene_id'
})

Choice.hasOne(Scene, {
  foreignKey: 'triggered_scene_id',
});

Scene.belongsTo(Choice, {
  foreignKey: 'triggered_scene_id',
});

// CharacterStory model
CharacterStory.hasMany(CharacterChoice, {
  foreignKey: 'character_story_id',
});

// CharacterChoice model
CharacterChoice.belongsTo(CharacterStory, {
  foreignKey: 'character_story_id',
});

CharacterChoice.belongsTo(Choice, {
  foreignKey: 'choice_id',
});

// Choice model
Choice.hasMany(CharacterChoice, {
  foreignKey: 'choice_id',
});


module.exports = { User, CharacterStory, CharacterChoice, Scene, Choice };
