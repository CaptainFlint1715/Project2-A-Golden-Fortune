const router = require('express').Router();
const { Choice, CharacterStory, CharacterChoice } = require('../../models');

// creates new CharacterStory instance and saves it's id to session
router.post('/', async (req, res) => {
  try {

    const newCharacterStory = await CharacterStory.create({
      user_id: req.body.id,
    })

    req.session.character_story_id = newCharacterStory.id
    req.session.logged_in = true;
    
    req.session.save(() => {
    })
    
    res.status(200).json(newCharacterStory);
  } catch (err) {
    res.status(400).json(err);
  }
})

// adds a selected choice to the CharacterChoice table
router.post('/choice', async (req, res) => {
  const storySess = req.session.character_story_id

  try {
    const selectedChoice = await Choice.findByPk(req.body.choice_id)
    
    if (!selectedChoice) {
      // Handle the case when the choice is not found
      return res.status(404).json({ error: 'Choice not found' });
    }
    
    const newCharacterChoice = await CharacterChoice.create({
      character_story_id: storySess,
      choice_id: req.body.choice_id
      
    }); 

    res.status(200).json(newCharacterChoice);
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;
