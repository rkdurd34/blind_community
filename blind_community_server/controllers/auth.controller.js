const { signToken, verifyToken } = require('../utils/auth.util');
const qs = require('query-string');
const controller = {
  signup: async ({ body }, { err, pool }, next) => {
    try {
      const email = body.email;
      const password = body.password;

      const [result1] = await pool.query(`
        SELECT 
        COUNT(*) as 'count'
        FROM users
        WHERE 
        email =?
      `, [email]);

      if (result1[0].count > 0) throw err.BadRequest("이미 있는 유저입니다");

      const [result2] = await pool.query(`
          INSERT INTO
          users(email,password)
          VALUES(?,PASSWORD(?));                                     
        `, [email, password]);
      next({
        message: '회원가입 완료'
      });
    } catch (e) {
      next(e);
    }
  },
  signin: async ({ body, headers }, res, next) => {
    try {
      console.log(body);
      const email = body.email;
      const password = body.password;

      const [result1] = await res.pool.query(`
        SELECT *
        FROM users
        WHERE 
        email = ?
        AND PASSWORD = PASSWORD(?)
      `, [email, password]);

      if (result1.length < 1) throw res.err.BadRequest("잘못된 이메일이나 비밀번호입니다");

      const token = signToken(result1[0].no);

      const [result2] = await res.pool.query(`
        SELECT COUNT(*) AS 'count'
        FROM tokens
        WHERE 
        user_no = ?
      `, [result1[0].no]);
      console.log(result2);
      if (result2[0].count > 0) {
        await res.pool.query(`
          UPDATE tokens
          SET token = ?
          WHERE 
          user_no = ?
        `, [token, result1[0].no]);
      } else {
        await res.pool.query(`
          INSERT INTO 
          tokens(user_no, token)
          VALUES(?,?);
        `, [result1[0].no, token]);
      }

      res.cookie("accessToken", token, { httpOnly: false, maxAge: 1000 * 60 * 60 });
      next({ token: token });
    } catch (e) {
      next(e);
    }
  },
  signout: async ({ body, headers }, { pool, err }, next) => {
    try {
      const accessToken = qs.parse(headers.cookie).accessToken;
      // console.log(accessToken);
      // const [result] = await pool.query(`
      //   SELECT 
      //   *
      //   FROM tokens
      //   WHERE
      //   token = ?
      //   AND enabled = 1
      // `, [accessToken]);

      // console.log(result);

      // if (result.length < 1) throw err.BadRequest('없는 유저이거나 로그아웃 되어 있습니다');

      await pool.query(`
      DELETE FROM tokens
      WHERE token = ?
      `, [accessToken]);
      next({ message: "로그아웃 완료" });
    } catch (e) {
      next(e);
    }

  }
};

module.exports = controller;