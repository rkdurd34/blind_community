const jwt = require('jsonwebtoken');
const { verifyToken } = require('../utils/auth.util');
const qs = require('query-string');

require('dotenv').config();
module.exports = {
  checkUser: async (req, { err, pool }, next) => {
    try {

      if (req.cookies.accessToken === undefined || req.cookies.accessToken === null) throw err.Unauthorized();
      const accessToken = req.cookies.accessToken;
      const result = verifyToken(accessToken);
      if (result === null) throw err.Unauthorized();
      const user_no = parseInt(result.userNo, 10);
      const [results] = await pool.query(`
        SELECT
        *
        FROM tokens AS a
        INNER JOIN  users AS b
        ON a.user_no = b.no
        WHERE a.enabled = 1
        AND a.user_no = ?
        AND token = ?;
    `, [user_no, accessToken]);
      if (results.length < 1) throw err.Unauthorized('로그아웃 된 삳ㅇ태');
      // if (results.count < 1) throw err.Unauthorized("로그아웃");
      req.userData = {
        region_no: results[0].region_no,
        sector_no: results[0].sector_no,
        user_no: results[0].user_no,
      };

      next();
    } catch (e) {
      next(e);
    }
  },
  checkAdmin: async (req, { err, pool }, next) => {
    try {
      if (req.cookies.adminToken === undefined || req.cookies.adminToken === null) throw err.Unauthorized();
      const adminToken = req.cookies.adminToken;
      const result = verifyToken(adminToken);
      if (result === null) throw err.Unauthorized();
      const admin_no = parseInt(result.userNo, 10);
      const [results] = await pool.query(`
        SELECT
        *
        FROM tokens AS a
        INNER JOIN  admins AS b
        ON a.user_no = b.no
        WHERE a.enabled = 1
        AND a.user_no = ?
        AND token = ?;
    `, [admin_no, adminToken]);
      if (results.length < 1) throw err.Unauthorized('로그아웃 된 삳ㅇ태');
      // if (results.count < 1) throw err.Unauthorized("로그아웃");
      req.userData = {
        admin_no: results[0].user_no
      };

      next();
    } catch (e) {
      next(e);
    }
  },
};