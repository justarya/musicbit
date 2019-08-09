const axios = require('axios');
const Model = require('../models');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const jwt = require('../helpers/jwt');

class User {
  static login(req,res,next){
    let googlePayload;
    client
      .verifyIdToken({
        idToken: req.body.id_token,
        audience: process.env.CLIENT_ID
      })
      .then(ticket => {
        googlePayload = ticket.getPayload();
        // res.json(payload);
        return Model.User
        .findOne({
          email: googlePayload.email
        })
      })
      .then(user => {
        if(!user){
          return Model.User
            .create({
              email: googlePayload.email,
              username: googlePayload.name.replace(/\s/g, '').toLowerCase(),
              password: process.env.PASSWORD
            })
        }
        return user
      })
      .then(data => {
        let payload = {
          id: data._id,
          username: data.username,
          email: data.email
        }
        let encryptedPayload = jwt.generateToken(payload)
        console.log(encryptedPayload);
        res.json(encryptedPayload);
      })
      .catch(next);
  }
}

module.exports = User;