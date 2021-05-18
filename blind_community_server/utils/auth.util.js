
const jwt = require('jsonwebtoken');
// const db = require('../database');
require('dotenv').config();
module.exports = {
  signToken: (userId) => {
    const payload = {
      iss: 'kang',
      userNo: userId
    };
    const option = {
      expiresIn: "3h",
    };
    const secret = process.env.ACCESS_SECRET_KEY;
    const token = jwt.sign(payload, secret, option);
    return token;
  },
  verifyToken: (token) => {
    const result = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
    return result;
  },

  check: {
    password(password, level = 3) {
      let regExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
      switch (level) {
        case 1:
          regExp = /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
          break;
        case 2:
          regExp = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
          break;
      }
      return regExp.test(password);
    },
    email(email) {
      let regExp = /^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@][-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.][A-Za-z]{1,5}$/g;
      return regExp.test(email);
    },
    phone(phone) {
      let regExp = /(^02.{0}|^01.|[0-9]{3})([0-9]+)([0-9]{4})/g;
      return regExp.test(phone);
    }
  },



};