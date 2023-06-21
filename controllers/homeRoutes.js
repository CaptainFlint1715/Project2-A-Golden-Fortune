const router = require('express').Router();
const { User, Character, Choice, CharacterStory, CharacterChoice } = require('../models');
const withAuth = require('../utils/auth');

// homepage route
router.get('/', (_, res) => {
  res.render('homepage'); 
});

// scene route
router.get('/scene/:id', async (req, res) => {
  try {
    const currentSceneId = req.params.triggered_scene_id
    const sceneData = await Scene.findByPk(currentSceneId, {
      include: [
        {
          model: Choice,
          attributes: ['id', 'text', 'scene_id', 'triggered_scene_id'],
          where: {
            scene_id: currentSceneId
          }
        },
        {
          model: CharacterChoice,
          attributes: ['choice_id'],
          where: {
            character_story_id: req.session.character_story_id
          }
        },
        {
          model: Character,
          attributes: ['name'],
          where: {
            id: req.session.character_id
          }
        }
      ]
    })

    res.render('scene', {
      sceneData,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// user profile route (this will be called on (1) 'return to home' button at the end of an adventure, also (2) after a user is created on sign up, and also (3) when a user logs in)
router.get('/profile', withAuth, async (req, res) => {
  try {

    const storyData = await CharacterStory.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Character,
          attributes: ['name'],
        },
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

    const stories = storyData.map((story) => story.get({ plain: true }))

    // Pass serialized data and session flag into template
    res.render('profile', {
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
