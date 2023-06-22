const sequelize = require('../config/connection');
const { User, CharacterStory, Scene, Choice } = require('../models');

const userData = require('./userData.json');
// const characterData = require('./characterData.json');
// const characterStoryData = require('./characterStoryData.json');
const sceneData = require('./sceneData.json');
const choiceData = require('./choiceData.json');


const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    // await Character.bulkCreate(characterData);
    await Scene.bulkCreate(sceneData)
    await Choice.bulkCreate(choiceData)
    // await CharacterStory.bulkCreate(characterStoryData)

    process.exit(0);
  } catch (err) {
    console.error('error seeding database', err)
    process.exit(1)
  }
};

seedDatabase();
