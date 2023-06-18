const sequelize = require('../config/connection');
const { User, Character, CharacterStory, Scene, Choice } = require('../models');

const userData = require('./userData.json');
const characterData = require('./characterData.json');
const characterStoryData = require('./characterStoryData.json');
const sceneData = require('./sceneData.json');
const choiceData = require('./choiceData.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const characters = await Character.bulkCreate(characterData);  
  const characterStories = await CharacterStory.bulkCreate(characterStoryData)
  const scenes = await Scene.bulkCreate(sceneData)
  const choices = await Choice.bulkCreate(choiceData)

  process.exit(0);
};

seedDatabase();
