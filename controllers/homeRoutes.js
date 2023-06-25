const router = require('express').Router();
const { Sequelize } = require('sequelize');
const { User, Scene, Choice, CharacterStory, CharacterChoice } = require('../models');
// const withAuth = require('../utils/auth');

// homepage route
router.get('/', (_, res) => {
  res.render('homepage');
});


// scene route
router.get('/scene/:id', async (req, res) => {

  try {
    const currentSceneId = req.params.id
    const scene = await Scene.findByPk(currentSceneId)
    const choices = await Choice.findAll({
      where: {
        scene_id: currentSceneId
      }
    })

    const sceneData = scene.get({ plain: true })
    const choiceData = choices.map(choice => choice.get({ plain: true }))

    res.render('scene', {
      sceneData,
      choiceData,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// user profile route
router.get('/profile', async (req, res) => {
  console.log('hello');
  console.log(req.session.user_id);

  try {
    const userId = req.session.user_id;
    const user = await User.findByPk(userId, {
      attributes: ['name', 'id']
    });
    const storyData = await CharacterStory.findAll({
      where: {
        user_id: userId,
      }
    });
    const characterStoryIds = storyData.map((story) => story.id);

    const choiceData = await CharacterChoice.findAll({
      where: {
        character_story_id: characterStoryIds,
      }
    });

    const textData = await Choice.findAll({
      where: {
        id: choiceData.map((choice) => choice.choice_id),
      }
    });

    const groupedTextData = storyData.map((story) => {
      const adventureId = story.id;
      const choices = choiceData
        .filter((choice) => choice.character_story_id === adventureId)
        .map((choice) => {
          const choiceText = textData.find((text) => text.id === choice.choice_id);
          return choiceText ? choiceText.story_text : '';
        });
      return {
        adventureId,
        choices,
      };
    });

    const userData = user.get({ plain: true });

    // Pass serialized data and session flag into template
    res.render('profile', {
      userData,
      groupedTextData,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error('Error retrieving profile data:', err);
    res.status(500).json(err);
  }
});








router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
