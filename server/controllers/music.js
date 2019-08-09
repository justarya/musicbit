const axios = require('axios');
const Model = require('../models');
const jwt = require('../helpers/jwt');
const checkWords = require('../helpers/checkWords')

class Music {

    static getTopTracks(req,res){
        axios.get('https://api.spotify.com/v1/me/top/tracks', {
            headers: {
              Authorization: 'Bearer BQD1vLZzSK6gCtAu5atwQUjyd9u1GxcUDBnfOPARTr8FkCg3kZ2qhTrJm4NbRuvvZ0FGIfXz_UquN2ZE_ZPVPq-twW7djQqZVn3u49n7FqipX2wNjj17lmuPtrv68rIACgSvS8S2qJHJc0dwv5U_MY-mBfAEi9U'
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
              Authorization: 'Bearer BQD1vLZzSK6gCtAu5atwQUjyd9u1GxcUDBnfOPARTr8FkCg3kZ2qhTrJm4NbRuvvZ0FGIfXz_UquN2ZE_ZPVPq-twW7djQqZVn3u49n7FqipX2wNjj17lmuPtrv68rIACgSvS8S2qJHJc0dwv5U_MY-mBfAEi9U'
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
              Authorization: 'Bearer BQD1vLZzSK6gCtAu5atwQUjyd9u1GxcUDBnfOPARTr8FkCg3kZ2qhTrJm4NbRuvvZ0FGIfXz_UquN2ZE_ZPVPq-twW7djQqZVn3u49n7FqipX2wNjj17lmuPtrv68rIACgSvS8S2qJHJc0dwv5U_MY-mBfAEi9U'
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
          Authorization: 'Bearer BQCvK3KZrYDI3SHivUSFm8gtQ9c2fdAFDcv3svPlhRxdmZFI5V4cyR-J4OVxOQuz10P_kFie3I5SJdkRdKV7EQOmm-3RGjN9U3ETKynijDM6xNQ5Av2i1soJBZC91Zt7CxbQxBLGZNbGBT0jnzES4__2ArRuqLv7Tg'
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
      axios.get('https://api.spotify.com/v1/me/player/recently-played', {
        headers: {
          Authorization: 'Bearer BQA9wjVTRL4CehbMonvIiXya9rI9Ba1xehGx_JOj8RdpNza3HlbwYVIsdpYxi-l22GR3QONMLGwLd_YNacGUpLhb_3s2DrzY7bzyRtY9VoBL2cxEC3nUAYRZMrXf4Gx4i4C9_hBOfD1Yg3QWQn0wx1a6D6JqO8S04A'
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
          Authorization: 'Bearer BQC9wow3Bc4tIsOjsN1We5Ye79cIMPuUeIWemqi2VTuXU1QETgb-NL2o7xUUwaM9ol_GcABBBkrau7nVlm-7yEBAFh3LKIEniMCaAgB21eyoV4LvlCbSb_QQ7MW-piBjowqy_ikfG2fBpVLzs874MF2jiZGAZzvucg'
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
                  Authorization: 'Bearer BQC9wow3Bc4tIsOjsN1We5Ye79cIMPuUeIWemqi2VTuXU1QETgb-NL2o7xUUwaM9ol_GcABBBkrau7nVlm-7yEBAFh3LKIEniMCaAgB21eyoV4LvlCbSb_QQ7MW-piBjowqy_ikfG2fBpVLzs874MF2jiZGAZzvucg'
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


    }
  

module.exports = Music;