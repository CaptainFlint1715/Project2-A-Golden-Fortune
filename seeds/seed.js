const sequelize = require('../config/connection');
const { User, CharacterStory, CharacterChoice, Scene, Choice } = require('../models');

const userData = require('./userData.json');

const sceneData = require('./sceneData.json');
const choiceData = require('./choiceData.json');
const characterStoryData = require('./characterStoryData.json');
const characterChoiceData = require('./characterChoiceData.json');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    await Scene.bulkCreate(sceneData)
    await Choice.bulkCreate(choiceData)
    await CharacterStory.bulkCreate(characterStoryData)
    await CharacterChoice.bulkCreate(characterChoiceData)

    process.exit(0);
  } catch (err) {
    console.error('error seeding database', err)
    process.exit(1)
  }
};

seedDatabase();
