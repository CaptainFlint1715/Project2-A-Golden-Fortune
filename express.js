// this is a temp location for this //

const express = require('express');
const app = express();

// Define route for character creation form
app.get('/characterCreation', (req, res) => {
  res.render('characterCreation');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});