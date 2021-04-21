
const jwt = require('jsonwebtoken');
// const db = require('../database');
require('dotenv').config();
module.exports = {
  signToken: (userId) => {
    const payload = {
      iss: 'kang',
      aud: userId
    };
    const option = {
      expiresIn: "30m",
    };
    const secret = process.env.ACCESS_SECRET_KEY;
    const token = jwt.sign(payload, secret, option);
    return token;
  },
  verifyToken: (token) => {
    const result = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
    return result;
  },

};