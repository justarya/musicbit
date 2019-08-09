const router = require('express').Router();
const controllers = require('../controllers/');

router.get('/login',controllers.user.login);

module.exports = router;