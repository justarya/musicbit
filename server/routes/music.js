const router = require('express').Router();
const controllers = require('../controllers/music.js');

// router.get('/',controllers.music);
// router.get('/recommendation', controllers.getRecommendation)
router.get('/getArtists', controllers.getTopArtist)
router.get('/getTracks', controllers.getTopTracks)
router.get('/getRecent', controllers.getRecent)
router.get('/kanye', controllers.getKanye)
router.get('/getTime', controllers.getTime)
router.get('/getGenre', controllers.getGenre)
router.get('/getProfile', controllers.getProfile)
router.get('/authorize', controllers.signIn)
router.get('/callback/', controllers.redirect)

module.exports = router;