if(!process.env.NODE_ENV || process.env.NODE_ENV === 'development'){
  require('dotenv').config();
}

var SpotifyWebApi = require('spotify-web-api-node');
const axios = require('axios')
const express = require('express');
const app = express();
const port = process.env.PORT || 3000
const routes = require('./routes');
const cors = require('cors');
const mongoose = require('mongoose');
const musicRouter = require('./routes/music')

app.use(cors());

app.use(express.urlencoded({extended: false}))
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/musicbit', {useNewUrlParser: true});

app.use('/', routes);

app.use(function(err,req,res,next){
  res.status(500).json({
    error: err
  })
});

app.listen(port, () =>  console.log(`Server is runing in PORT: ${port}`));

var redirectUri = 'http://localhost:3000/callback/';
var spotifyApi = new SpotifyWebApi({
  clientId : 'b93f9dfa22ea42c497b30e547849305c',
  clientSecret : '9cac2da6d7a1445694500ae88ddb2134',
  redirectUri : redirectUri,
});



app.get("/authorize", function (request, response) {
  var authorizeURL = spotifyApi.createAuthorizeURL(['user-top-read playlist-read-collaborative user-read-recently-played user-read-currently-playing user-read-recently-played']);
  response.send(authorizeURL);
});

app.get("/callback/", function (request, response) {
  var authorizationCode = request.query.code;  
  spotifyApi.authorizationCodeGrant(authorizationCode)
  .then(function(data) {

    spotifyApi.setAccessToken(data.body['access_token']);
    spotifyApi.setRefreshToken(data.body['refresh_token']);
    response.send(data.body)
  }, function(err) {
    res.status(500).json({
      message: err.message
    })
  });
});

app.use('/music',musicRouter)