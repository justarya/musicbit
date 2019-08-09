const router = require('express').Router();
const controllers = require('../controllers/music.js');

// router.get('/',controllers.music);
// router.get('/recommendation', controllers.getRecommendation)
router.post('/getArtists', controllers.getTopArtist)
router.post('/getTracks', controllers.getTopTracks)
router.post('/getRecent', controllers.getRecent)
router.get('/kanye', controllers.getKanye)
router.post('/getTime', controllers.getTime)
router.post('/getGenre', controllers.getGenre)
router.post('/getProfile', controllers.getProfile)
router.get('/authorize', controllers.signIn)
router.get('/callback/', controllers.redirect)

module.exports = router;