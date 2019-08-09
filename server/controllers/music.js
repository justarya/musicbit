const axios = require('axios');
const Model = require('../models');
const jwt = require('../helpers/jwt');
const checkWords = require('../helpers/checkWords')
const SpotifyWebApi = require('spotify-web-api-node');
const redirectUri = 'http://localhost:8080';
const spotifyApi = new SpotifyWebApi({
  clientId : 'b93f9dfa22ea42c497b30e547849305c',
  clientSecret : '9cac2da6d7a1445694500ae88ddb2134',
  redirectUri : redirectUri,
});

class Music {

    static getTopTracks(req,res){
        axios.get('https://api.spotify.com/v1/me/top/tracks', {
            headers: {
              Authorization: `Bearer ${req.body.spotify_token}`
            }
          })
          .then(function (response) {
            const tracksCollection = response.data
            res.status(200).json({
                tracksCollection
            });
          })
          .catch(function (error) {
            res.status(500).json({
                message: error.message
            })
          })
    }

    static getTopArtist(req,res){
        axios.get('https://api.spotify.com/v1/me/top/artists', {
            headers: {
              Authorization: `Bearer ${req.body.spotify_token}`
            }
          })
          .then(function (response) {
              const artistCollection = response.data
            res.status(200).json({
               artistCollection
            });
          })
          .catch(function (error) {
            res.status(500).json({
                message: error.message
            })
          })
    }

    static getRecommendation(req,res){
        axios.get('  https://api.spotify.com/v1/recommendations', {
            headers: {
              Authorization: `Bearer ${req.body.spotify_token}`
            }
          })
          .then(function (response) {
            console.log(response.data)
            res.status(200).json({
                response
            });
          })
          .catch(function (error) {
            console.log(error)
            res.status(500).json({
                message: error.message
            })
          })
    }
    static getRecent(req,res){
      axios.get('https://api.spotify.com/v1/me/player/recently-played', {
        headers: {
          Authorization: `Bearer ${req.body.spotify_token}`
        }
      })
      .then(function (response) {
        const recentCollection = response.data
        res.status(200).json({
            recentCollection
        });
      })
      .catch(function (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
      })
    }

    static getKanye(req,res){
      axios.get('https://api.kanye.rest'
      )
      .then(function (response) {
        const kanyeQuote = response.data.quote
        res.status(200).json({
            kanyeQuote
        });
      })
      .catch(function (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
      })
    }

    static getTime(req,res){
      console.log('test')
      axios.get('https://api.spotify.com/v1/me/player/recently-played', {
        headers: {
          Authorization: `Bearer ${req.body.spotify_token}`
        }
      })
      .then(function (response) {
        const recentCollection = response.data.items
        let time = []

        for(let i = 0; i < recentCollection.length;i++){
          let waktu = recentCollection[i].track.duration_ms / 60000
            time.push(waktu)
        }
        let realTime = time.reduce((a, b) => a + b, 0)
        res.status(200).json({
            realTime
        });
      })
      .catch(function (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
      })
    }

    static getGenre(req,res){
      axios.get('https://api.spotify.com/v1/me/player/recently-played', {
        headers: {
          Authorization: `Bearer ${req.body.spotify_token}`
        }
      })
      .then(function (response) {
        console.log(response.data.items[0].track.album.artists[0].id)
        const recentCollection = response.data.items;
        let artistPromises = [];
        for(let i in recentCollection){
          for(let j in recentCollection[i].track.album.artists){
            let promise = axios.get(`https://api.spotify.com/v1/artists/${recentCollection[i].track.album.artists[j].id}`,{
                headers: {
                  Authorization: `Bearer ${req.body.spotify_token}`
                }
              })
            artistPromises.push(promise);
          }
        }
        return Promise.all(artistPromises);
      })
      .then((data) => {
        data = data.map(el => el.data.genres);
        let groupGenres = []
        for(let i = 0; i < data.length;i++){
          for(let j = 0 ; j < data[i].length;j++){
            groupGenres.push(data[i][j])
          }
        }
        var map = new Object();
        for (var i = 0; i < groupGenres.length; i++) {
            if (map[groupGenres[i]] != null) {
                map[groupGenres[i]] += 1;
            } else {
                map[groupGenres[i]] = 1;
            }
        }
        
        res.status(200).json({
          map
        });
      })
      .catch(function (error) {
        res.status(500).json({
            message: error.message
        })
      })
    }


    static getProfile(req,res){
      axios.get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${req.body.spotify_token}`
        }
      })
      .then(function (response) {
        const recentCollection = response.data
        res.status(200).json({
            recentCollection
        });
      })
      .catch(function (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
      })
    }

    static signIn(req,res){
      const authorizeURL = spotifyApi.createAuthorizeURL(['user-top-read playlist-read-collaborative user-read-recently-played user-read-currently-playing user-read-recently-played']);
      // console.log(authorizeURL)
      res.send(authorizeURL);
    }

    static redirect(req,res){
      const authorizationCode = req.query.code;  
      spotifyApi.authorizationCodeGrant(authorizationCode)
      .then(function(data) {
        spotifyApi.setAccessToken(data.body['access_token']);
        spotifyApi.setRefreshToken(data.body['refresh_token']);
        res.send(data.body)
      }, function(err) {
          res.status(500).json({
          message: err.message
        })
      });
    }

    }
  

module.exports = Music;