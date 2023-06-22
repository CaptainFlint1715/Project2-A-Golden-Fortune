const router = require('express').Router();
const { User, Scene, Choice, CharacterStory, CharacterChoice } = require('../models');
const withAuth = require('../utils/auth');

// homepage route
router.get('/', (_, res) => {
  res.render('homepage');
});

router.get('/scene', async (req, res) => {
  try {
    // Fetch all scene data from the database
    const sceneData = await Scene.findAll();

    // Log the scene data
    console.log(sceneData);

    // Send a response if needed
    res.sendStatus(200);
  } catch (err) {
    // Handle errors
    console.error(err);
    res.sendStatus(500);
  }
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


// user profile route (this will be called on (1) 'return to home' button at the end of an adventure [completed], also (2) after a user is created on sign up, and also (3) when a user logs in)
router.get('/profile', async (req, res) => {
  console.log('hello')
  console.log(req.session.user_id)


  try {
    const userId = req.session.user_id
    const userData = await User.findByPk(userId, {
      attributes: ['name']
    })
    const storyData = await CharacterStory.findAll({
      where: {
        user_id: userId,
      },
      include: [
        {
          model: CharacterChoice,
          attributes: ['choice_id'],
          include: {
            model: Choice,
            attributes: ['story_text'],
          },
        },
      ],
    });

    const stories = storyData.map((story) => {
      const characterChoices = story.CharacterChoices.map((characterChoice) =>
        characterChoice.Choice.story_text
      );
      const combinedText = characterChoices.join(', ');
      return { ...story.get({ plain: true }), combinedText };
    });


    // Pass serialized data and session flag into template
    res.render('profile', {
      userData: userData.toJSON(),
      stories,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
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
// {
        //   model: CharacterChoice,
        //   attributes: ['choice_id'],
        //   where: {
        //     character_story_id: req.session.character_story_id
        //   }
        // },
        // {
        //   model: Character,
        //   attributes: ['name'],
        //   where: {
        //     id: req.session.character_id
        //   }
        // }