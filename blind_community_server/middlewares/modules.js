require('dotenv').config();
const mysql = require('mysql2/promise');
const createError = require('http-errors');
module.exports = {
  database: () => {
    let pool = null;
    return (req, res, next) => {
      if (pool != null) {
        res.pool = pool;
        next();
      } else {
        pool = mysql.createPool(
          {
            host: process.env.NODE_EV === "development" ? process.env.LOCAL_HOST : process.env.DB_HOST,
            user: process.env.NODE_EV === "development" ? process.env.LOCAL_USER : process.env.DB_USER,
            password: process.env.NODE_EV === "development" ? process.env.LOCAL_PASSWORD : process.env.DB_PASSWORD,
            database: process.env.NODE_EV === "development" ? process.env.MYSQL_LOCAL_DB : process.env.MYSQL_DB,
            connectionLimit: 10,
            multipleStatements: true
          }

        );
        res.pool = pool;
        next();
      }
    };

  },
  errorHandler: () => {
    return (req, res, next) => {
      res.err = createError;
      next();
    };


  }
};