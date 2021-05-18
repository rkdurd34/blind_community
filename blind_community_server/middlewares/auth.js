const jwt = require('jsonwebtoken');
const { verifyToken } = require('../utils/auth.util');
const qs = require('query-string');

require('dotenv').config();
module.exports = {
  checkUser: async (req, { err, pool }, next) => {
    try {
      if (req.headers.cookie === undefined || req.headers.cookie === null) throw err.Unauthorized();
      const accessToken = qs.parse(req.headers.cookie).accessToken;
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

      if (results.count < 1) throw err.Unauthorized("로그아웃");
      req.userData = {
        region_no: results[0].region_no,
        sector_no: results[0].sector_no,
        user_no: results[0].user_no
      };

      next();
    } catch (e) {
      next(e);
    }
  }
};