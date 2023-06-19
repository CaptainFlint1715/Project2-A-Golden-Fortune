const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./characterRoutes');

router.use('/users', userRoutes);
router.use('/character', postRoutes);

module.exports = router;
