const router = require('express').Router();
const user = require('./user');
const music = require('./music');

router.use('/user',user);
router.use('/music',music);

module.exports = router;