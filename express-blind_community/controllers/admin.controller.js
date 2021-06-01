const { signToken, verifyToken } = require('../utils/auth.util');
const qs = require('query-string');

const controller = {
  login: async ({ body }, res, next) => {
    try {
      const email = body.email;
      const password = body.password;

      const [result1] = await res.pool.query(`
      SELECT *
      FROM admins
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

      res.cookie("adminToken", token, { httpOnly: false, maxAge: 1000 * 60 * 60 });
      next({ accessToken: token });
      next('good');
    } catch (e) {
      next(e);
    }
  },
  getUserData: async ({ }, { pool }, next) => {
    try {
      const [result] = await pool.query(`
        SELECT 
        a.no AS user_no,
        a.is_valid,
        a.email,
        a.nickname,
        a.is_valid,
        c.name AS sector,
        d.bname AS region,
        b.business_number,
        b.image_url
        FROM users AS a
        INNER JOIN shops AS b
        ON b.user_no = a.no
        INNER JOIN sectors AS c
        ON a.sector_no = c.no
        INNER JOIN region_4 AS d
        ON d.no = a. region_no
        ORDER BY a.create_datetime DESC;
      `);
      console.log('result');
      next(result);
    } catch (e) {
      next(e);
    }
  },
  editUserData: async ({ body }, { pool }, next) => {
    try {
      const user_no = body.user_no;
      const is_valid = body.is_valid;
      console.log(is_valid);
      const [result] = await pool.query(`
        UPDATE users
        SET is_valid = ?
        WHERE no =?
      `, [is_valid, user_no]);
      next('g');
    } catch (e) {
      next(e);
    }
  },



  signup: async ({ file, body }, { err, pool }, next) => {
    try {
      const email = body.email;
      const password = body.password;
      const nickname = body.nickname;
      const sector_no = body.sector_no;
      const bg1 = body.bg1;
      const bg2 = body.bg2;
      const bg3 = body.bg3;

      const [result1] = await pool.query(`
        SELECT 
        COUNT(*) as 'count'
        FROM users
        WHERE 
        email =?
      `, [email]);

      const [region_no] = await pool.query(`
        SELECT *
        FROM region_4
        WHERE region_3_no = ?
      `, [bg3]);

      if (result1[0].count > 0) throw err.BadRequest("이미 있는 유저입니다");

      const connection = await pool.getConnection(async conn => await conn);

      try {
        await connection.beginTransaction();

        const [result2] = await connection.query(`
          INSERT INTO
          users(email, password, nickname, region_no, sector_no)
          VALUES(?, PASSWORD(?), ?, ?, ?);                                     
        `, [email, password, nickname, region_no[0].no, sector_no]);

        const [result3] = await connection.query(`
          INSERT INTO
          shops(user_no, image_name, image_url)
          VALUES(?,?,?);                                     
        `, [result2.insertId, file.originalname, `media/img/${file.originalname}`]);
        await connection.commit();
      } catch (e) {
        await connection.rollback();
        next(e);
      } finally {
        connection.release();
      }

      next({
        message: '회원가입 완료'
      });
    } catch (e) {
      next(e);
    }
  },
  signin: async ({ body, headers }, res, next) => {
    try {

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
      next({ accessToken: token });
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

  },
  typeDataFirst: async ({ query }, { pool }, next) => {
    try {
      const [result] = await pool.query(`
        SELECT *
        FROM sectors;
        
        SELECT 
        no,
        bname AS 'name',
        bcode
        FROM region_1;

      `);
      next(result);
    } catch (e) {
      next(e);
    }
  },
  typeDataSecond: async ({ query }, { pool }, next) => {
    try {

      const region_1_no = query.region_1_no;

      const [result] = await pool.query(`
        SELECT 
        no,
        bname AS 'name',
        bcode,
        region_1_no
        FROM region_2
        WHERE region_1_no = ?;
      `, [region_1_no]);
      next(result);
    } catch (e) {
      next(e);
    }
  },
  typeDataThird: async ({ query }, { pool }, next) => {
    try {
      const region_2_no = query.region_2_no;
      const [result] = await pool.query(`
        SELECT 
        no,
        bname AS 'name',
        bcode,
        region_2_no
        FROM region_3
        WHERE region_2_no = ?
      `, [region_2_no]);
      next(result);
    } catch (e) {
      next(e);
    }
  },
  myPageData: async ({ userData, query }, { pool }, next) => {
    try {
      const user_no = userData.user_no;
      const region_no = userData.region_no;
      const sector_no = userData.sector_no;
      const data_type = query.data_type;
      const page = query.page;
      console.log(page);

      let result;
      if (data_type == "first") {
        [result] = await pool.query(`
        SELECT *
        FROM users
        WHERE
        no = ?
      `, [user_no]);
      } else if (data_type == "second") {
        [result] = await pool.query(`
        SELECT 
        a.user_no,
        a.no as post_no,
        a.title,
        a.content_text,
        a.region_no,
        a.sector_no,
        a.views,
        a.likes,
        a.create_datetime,
        b.email,
        b.nickname,
        CASE WHEN c.comment_counts IS NULL THEN 0 ELSE c.comment_counts END AS comment_counts
        FROM boards AS a
        INNER JOIN users AS b
        ON a.user_no = b.no
        LEFT JOIN  (SELECT post_no, COUNT(post_no) AS comment_counts FROM comments
        GROUP BY post_no) AS C
        ON c.post_no = a.no
        WHERE
        a.enabled = 1
        AND b.enabled = 1
        AND a.user_no = ?
        LIMIT ? OFFSET ?;

        SELECT COUNT(*) AS total_count
        FROM boards
        WHERE user_no = ?
        AND enabled = 1
        `, [user_no, 5, Number(page * 5), user_no]);
        console.log(result);
        console.log(result[1]);
        result = {
          post_list: [...result[0]],
          total_count: result[1][0].total_count
        };
      }

      next(result);
    } catch (e) {
      next(e);
    }
  },
  myPageEdit: async ({ body, userData }, { pool }, next) => {
    try {
      const user_no = userData.user_no;
      const nickname = body.nickname;
      const password = body.password;
      const edit_type = body.edit_type;
      if (edit_type === "nickname") {
        await pool.query(`
          UPDATE users
          SET nickname = ?
          WHERE
          no = ?
        `, [nickname, user_no]);
      } else if (edit_type === 'password') {
        await pool.query(`
          UPDATE users
          SET password = PASSWORD(?)
          WHERE
          no = ?
        `, [password, user_no]);
      }
      next('good');
    } catch (e) {
      next(e);
    }
  },

  authAPI: async (req, res, next) => {
    try {
      next({ message: '잘돰' });
    } catch (e) {
      next(e);
    }
  },


  insertRawData: async ({ body }, { pool }, next) => {
    try {

      const workbook = await xlsx.readFile("./controllers/file_2.xlsx");
      // console.log(workbook);
      console.log(Object.keys(workbook.Sheets));
      const ws = await workbook.Sheets.KIKcd_B;

      // console.log(ws);
      const records = await xlsx.utils.sheet_to_json(ws);
      let region_1_no;
      let region_2_no;
      let region_3_no;
      for (let i = 1; i < records.length; i++) {
        temp = records[i];
        // console.log(temp);
        bg_1 = await temp["법정동코드"].slice(0, 2);
        bg_2 = await bg_1 + temp["법정동코드"].slice(2, 5);
        bg_3 = await bg_2 + temp["법정동코드"].slice(5, 8);
        bg_4 = await temp["법정동코드"].slice(0, 8);
        bname_1 = await temp["시도명"];
        bname_2 = await temp["시군구명"] === undefined ? undefined : temp["시군구명"];
        if (bname_2 === undefined) continue;
        bname_3 = await temp["읍면동명"] === undefined ? undefined : temp["읍면동명"];
        if (bname_3 === undefined) continue;
        bname_4 = await temp["시도명"] + " " + temp["시군구명"] + " " + temp["읍면동명"];
        console.log(bname_4);
        const [result1] = await pool.query(`
          INSERT IGNORE INTO region_1 (bcode, bname)
          VALUES(?,?);`, [bg_1, bname_1]);
        (result1.insertId === 0) ? region_1_no : region_1_no = result1.insertId;
        const [result2] = await pool.query(`
          INSERT IGNORE INTO region_2(bcode,bname,region_1_no)
          VALUES (?,?,?)`, [bg_2, bname_2, region_1_no]);
        (result2.insertId === 0) ? region_2_no : region_2_no = result2.insertId;
        const [result3] = await pool.query(`
        INSERT IGNORE INTO region_3(bcode,bname,region_2_no)
        VALUES (?,?,?)`, [bg_3, bname_3, region_2_no]);
        (result3.insertId === 0) ? region_3_no : region_3_no = result3.insertId;
        const [result4] = await pool.query(`
        INSERT IGNORE INTO region_4(bcode,bname,region_3_no)
        VALUES (?,?,?)`, [bg_4, bname_4, region_3_no]);
      }


      // await xlsxFile('./controllers/file_2.xlsx')
      //   .then(async (data) => {
      //     let region_1_no;
      //     let region_2_no;
      //     let region_3_no;
      //     for (let i = 1; i < data.length; i++) {
      //       const temp = data[i];
      //       if (temp[2] == '폐지\r') { continue; };
      //       console.log(temp);
      //       bg_1 = temp[0].slice(0, 2);
      //       bg_2 = temp[0].slice(2, 5);
      //       bg_3 = temp[0].slice(5, 8);
      //       bg_4 = temp[0].slice(0, 8);
      //       bname_1 = temp[1];
      //       bname_2 = temp[2];
      //       bname_3 = temp[3];
      //       bname_4 = temp[1] + " " + temp[2] + " " + temp[3];
      //       console.log('몇번?', i);

      //       const [result1] = await pool.query(`
      //     INSERT IGNORE INTO region_1 (bcode, bname)
      //     VALUES(?,?);
      //   `, [bg_1, bname_1,]);
      //       (result1.insertId === 0) ? region_1_no : region_1_no = result1.insertId;
      //       const [result2] = await pool.query(`
      //     INSERT IGNORE INTO region_2(bcode,bname,region_1_no)
      //     VALUES (?,?,?)
      //   `, [bg_2, bname_2, region_1_no]);
      //       (result2.insertId === 0) ? region_2_no : region_2_no = result2.insertId;
      //       const [result3] = await pool.query(`
      //   INSERT IGNORE INTO region_3(bcode,bname,region_2_no)
      //   VALUES (?,?,?)`, [bg_3, bname_3, region_2_no]);
      //       (result3.insertId === 0) ? region_3_no : region_3_no = result3.insertId;
      //       const [result4] = await pool.query(`
      //   INSERT IGNORE INTO region_4(bcode,bname,region_3_no)
      //   VALUES (?,?,?)`, [bg_4, bname_4, region_3_no]);
      //     }
      //     console.log('왔어?');
      //     return;
      //   })
      //   .catch((err) => console.log(err));

      // const raw = fs.readFileSync('./controllers/file.txt');
      // var encode = new Iconv('euc-kr', 'utf-8');
      // const data_changed = encode.convert(raw).toString();
      // const data = data_changed.split('\n');
      // let region_1_no;
      // let region_2_no;
      // let region_3_no;
      // for (let i = 1; i < data.length; i++) {
      //   const temp = data[i].split('\t');
      //   if (temp[2] == '폐지\r') { continue; };
      //   console.log(temp);
      //   bg_1 = temp[0].slice(0, 2);
      //   bg_2 = temp[0].slice(2, 5);
      //   bg_3 = temp[0].slice(5, 8);
      //   bg_4 = temp[0].slice(0, 8);
      //   bname_1 = temp[1].split(" ")[0];
      //   bname_2 = temp[1].split(" ")[1];
      //   bname_3 = temp[1].split(" ")[2];
      //   bname_4 = temp[1];
      //   console.log('몇번?', i);

      //   const [result1] = await pool.query(`
      //     INSERT IGNORE INTO region_1 (bcode, bname)
      //     VALUES(?,?);
      //   `, [bg_1, bname_1,]);
      //   (result1.insertId === 0) ? region_1_no : region_1_no = result1.insertId;
      //   const [result2] = await pool.query(`
      //     INSERT IGNORE INTO region_2(bcode,bname,region_1_no)
      //     VALUES (?,?,?)
      //   `, [bg_2, bname_2, region_1_no]);
      //   (result2.insertId === 0) ? region_2_no : region_2_no = result2.insertId;
      //   const [result3] = await pool.query(`
      //   INSERT IGNORE INTO region_3(bcode,bname,region_2_no)
      //   VALUES (?,?,?)`, [bg_3, bname_3, region_2_no]);
      //   (result3.insertId === 0) ? region_3_no : region_3_no = result3.insertId;
      //   const [result4] = await pool.query(`
      //   INSERT IGNORE INTO region_4(bcode,bname,region_3_no)
      //   VALUES (?,?,?)`, [bg_4, bname_4, region_3_no]);
      // }



      // console.log(data[1]);
      next('good');
    } catch (e) {
      next(e);
    }
  }
};

module.exports = controller;;;;