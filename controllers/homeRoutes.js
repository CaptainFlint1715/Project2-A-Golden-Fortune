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
    const sceneData = await Scene.findByPk(req.params.id, {
      include: [
        {
          model: Choice,
          attributes: ['text', 'scene_id', 'triggered_scene_id'],
          where: {
            scene_id: req.params.id
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


// user profile route
router.get('/user', withAuth, async (req, res) => {
  try {
    const user_id = req.session.user_id;

    const storyData = await CharacterStory.findAll({
      where: {
        user_id: user_id,
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

    // Pass serialized data and session flag into template
    res.render('user', {
      storyData,
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
