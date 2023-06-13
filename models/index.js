const User = require('./User');
const Character = require('./Character');
const Storyline = require('./Storyline')

User.hasMany(Character, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Character.belongsTo(User, {
  foreignKey: 'user_id'
});

Character.hasOne(Storyline, {
  foreignKey: 'character_id',
  onDelete: 'CASCADE'
})

Storyline.belongsTo(Character, {
  foreignKey: 'character_id'
});

module.exports = { User, Character, Storyline };
