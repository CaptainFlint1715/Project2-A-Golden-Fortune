const router = require('express').Router();
const { Choice, Character, CharacterStory, CharacterChoice } = require('../../models');
const withAuth = require('../../utils/auth');

// creates new CharacterStory instance and saves it's id to session
router.post('/select', withAuth, async (req, res) => {
  try {


    const newCharacterStory = await CharacterStory.create({
      character_id: req.body.character_id,
      user_id: req.session.user_id,
    })
    
    req.session.save(() => {
      req.session.character_story_id = newCharacterStory.id
    })

    res.status(200).json(newCharacterStory);
  } catch (err) {
    res.status(400).json(err);
  }
})

// adds a selected choice to the CharacterChoice table
router.post('/choice', withAuth, async (req, res) => {
  try {
    const selectedChoice = await Choice.findByPk(req.body.id)
    
    if (!selectedChoice) {
      // Handle the case when the choice is not found
      return res.status(404).json({ error: 'Choice not found' });
    }
    
    const newCharacterChoice = await CharacterChoice.create({
      character_story_id: req.session.character_story_id,
      choice_id: selectedChoice.id,
      
    });  

    res.status(200).json(newCharacterChoice);
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;
