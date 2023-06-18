const express = require('express');
const router = express.Router();

// Placeholder data for demonstration purposes
let characters = [];

// Route to render the '/character/create' page
router.get('/character/create', (req, res) => {
  const userId = req.query.userId; // Assuming the user ID is passed as a query parameter
  res.render('create-character', { userId });
});

// Route to handle the form submission and create a new character
router.post('/character/create', (req, res) => {
  const characterName = req.body.characterName;
  const characterGender = req.body.characterGender;
  const userId = req.body.userId;

  // Create a new character object
  const newCharacter = {
    name: characterName,
    gender: characterGender,
    userId: userId,
  };

  // Add the new character to the list
  characters.push(newCharacter);

  // Redirect the user back to the homepage
  res.redirect('/homepage');
});

// Route to render the homepage with the character list
router.get('/homepage', (req, res) => {
  const userId = req.query.userId; // Assuming the user ID is passed as a query parameter
  const userCharacters = characters.filter((character) => character.userId === userId);
  res.render('homepage', { characters: userCharacters });
});

module.exports = router;
