const jwt = require('jsonwebtoken');
const key = process.env.JWT_KEY;
module.exports = {
  generateToken: (payload) => {
    return jwt.sign(payload,key);
  }
}