const router = require('express').Router();
const { Choice, Character, CharacterStory, CharacterChoice } = require('../../models');
const withAuth = require('../../utils/auth');

// saves selected character ID to current session
router.post('/select', withAuth, async (req, res) => {
  try {
    const {character_id } = req.body

    req.session.character_id = character_id;

    res.status(200).json({ message: 'Character selected successfully' });
  } catch (err) {
    res.status(400).json(err);
  }
})

// creates new row in CharacterStory table
router.post('/', withAuth, async (req, res) => {
  try {

    const user_id = req.session.user_id;
    const character_id = req.session.character_id;

    const newCharacterStory = await CharacterStory.create({
      character_id: character_id,
      user_id: user_id,
    });

    req.session.character_story_id = newCharacterStory.id

    res.status(200).json(newCharacterStory);
  } catch (err) {
    res.status(400).json(err);
  }
});

// adds a selected choice to the CharacterChoice table
router.post('/choice', withAuth, async (req, res) => {
  try {

    const { id } = req.body
    const character_id = req.session.character_id
    const character_story_id = req.session.character_story_id

    const selectedChoice = await Choice.findByPk(id)

    if (!selectedChoice) {
      // Handle the case when the choice is not found
      return res.status(404).json({ error: 'Choice not found' });
    }

    const newCharacterChoice = await CharacterChoice.create({
      choice_id: selectedChoice.id,
      character_id: character_id,
      character_story_id: character_story_id
    });

    res.status(200).json(newCharacterChoice);
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;
