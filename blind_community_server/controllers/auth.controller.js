const { signToken, verifyToken } = require('../utils/auth.util');
const controller = {
  signUp: async ({ body }, { err, pool }, next) => {
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
  login: async ({ body, headers }, { pool, err }, next) => {
    try {
      const email = body.email;
      const password = body.password;

      const [result1] = await pool.query(`
        SELECT *
        FROM users
        WHERE 
        email = ?
        AND PASSWORD = PASSWORD(?)
      `, [email, password]);

      if (result1.length < 1) throw err.BadRequest("잘못된 이메일이나 비밀번호입니다");

      const token = signToken(result1[0].no);

      const [result2] = await pool.query(`
          INSERT INTO 
          tokens(user_no, token)
          VALUES(?,?);
        `, [result1[0].no, token]);

      next({ token: token });
    } catch (e) {
      next(e);
    }
  }
};

module.exports = controller;