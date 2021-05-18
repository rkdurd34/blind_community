const { signToken, verifyToken } = require('../utils/auth.util');
const qs = require('query-string');
const dayjs = require('dayjs');

const PAGINATION_COUNT = 10;
const controller = {
  mainPage: async ({ userData, query }, { pool }, next) => {
    try {
      const region_no = userData.region_no;
      const sector_no = userData.sector_no;
      const user_no = userData.user_no;
      const post_type = query.post_type;
      const page = query.page;
      const count = query.count === "undefined" ? PAGINATION_COUNT : query.count;

      const [result] = await pool.query(`
        SELECT * 
        FROM users AS a
        INNER JOIN sectors  AS b
        ON a.sector_no = b.no
        INNER JOIN region_4 AS c
        ON a.region_no = c.no
        WHERE
        a.no = ?;
        
        SELECT 
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
        ${post_type === "sector" ? `a.sector_no = ?` : `a.region_no = ? `}
        AND a.enabled =1
        AND b.enabled =1
        AND DATE(a.create_datetime) BETWEEN ? AND ?
        ORDER BY likes DESC, views DESC, c.comment_counts DESC
        LIMIT ? OFFSET ?;
        
        SELECT 
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
        ${post_type === "sector" ? `a.sector_no = ?` : `a.region_no = ? `}
        AND a.enabled =1
        AND b.enabled =1
        ORDER BY create_datetime DESC
        LIMIT ? OFFSET ?;
        
      `, [
        user_no,
        post_type === "sector" ? sector_no : region_no,
        dayjs().subtract(1, 'week').format('YYYY-MM-DD'),
        dayjs().format('YYYY-MM-DD'),
        5,
        0,
        post_type === "sector" ? sector_no : region_no,
        5,
        0
      ]);

      console.log(result[2][0]);
      console.log(dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
        dayjs().format('YYYY-MM-DD'));
      next({
        user_data: result[0][0],
        post_data: {
          best: result[1],
          all: result[2]
        }
      });
    } catch (e) {
      next(e);
    }
  },
  postListAll: async ({ userData, query }, { pool }, next) => {
    try {
      const page = query.page;
      const count = query.count === "undefined" ? PAGINATION_COUNT : query.count;
      const post_type = query.post_type;
      const user_no = userData.user_no;
      const region_no = userData.region_no;
      const sector_no = userData.sector_no;

      const [result] = await pool.query(`
        SELECT * 
        FROM users AS a
        INNER JOIN sectors  AS b
        ON a.sector_no = b.no
        INNER JOIN region_4 AS c
        ON a.region_no = c.no
        WHERE
        a.no = ?;
        
        SELECT 
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
        ${post_type === "sector" ? `a.sector_no = ?` : `a.region_no = ? `}
        AND a.enabled =1
        AND b.enabled =1
        ORDER BY a.create_datetime DESC
        LIMIT ? OFFSET ?;

        SELECT
        COUNT(*) AS 'total_count'
        FROM boards
        WHERE
        enabled = 1
        AND ${post_type === "sector" ? `sector_no = ?` : `region_no = ? `};

        
        
      `, [user_no, post_type === "sector" ? sector_no : region_no, Number(count), Number(page * count), post_type === "sector" ? sector_no : region_no]);

      next({
        total_count: result[2][0].total_count,
        user_data: result[0][0],
        post_data: result[1]
      });
    } catch (e) {
      next(e);
    }
  },
  postDetail: async ({ userData, query }, { pool }, next) => {
    try {
      const post_no = query.post_no;
      const user_no = userData.user_no;
      const [result] = await pool.query(`
        SELECT 
        a.title,
        a.content_text,
        a.create_datetime,
        a.likes,
        a.sector_no,
        a.region_no,
        a.views,
        a.user_no,
        b.bname,
        a.no,
        c.name
        FROM boards AS a
        LEFT JOIN region_4 AS b
        ON a.region_no = b.no
        LEFT JOIN sectors AS c
        ON a.sector_no = c.no 
        WHERE
        a.no = ?;

        SELECT *
        FROM comments AS a
        WHERE post_no = ?
        AND enabled =1 
        LIMIT ? OFFSET ?;
        
        SELECT COUNT(*) AS 'count'
        FROM comments 
        WHERE post_no = ?
        AND enabled = 1;        

        SELECT COUNT(*) AS 'can_edit'
        FROM boards AS a
        INNER JOIN users AS b
        ON b.no = a.user_no
        WHERE
        a.no = ?
        AND b.no = ?;

        SELECT 
        b.bname AS bname,
        c.name AS name
        FROM users AS a
        INNER JOIN region_4 AS b
        ON a.region_no = b.no
        INNER JOIN sectors AS c
        ON a.sector_no = c.no
        WHERE a.no = ?;

        SELECT 
        COUNT(*) AS 'liked'
        FROM likes
        WHERE post_no = ?
        AND user_no = ?
      `, [post_no, post_no, 5, 0, post_no, post_no, user_no, user_no, post_no, user_no]);

      console.log(result[5][0].liked);
      next({
        post_detail: {
          ...result[0][0],
          region_type: result[4][0].bname,
          sector_type: result[4][0].name,
          can_edit: result[3][0].can_edit,
          liked: result[5][0].liked,
          create_datetime: dayjs(result[0].create_datetime).format("MM/DD/YYYY")
        },
        comments: result[1].map(item => ({ ...item, create_datetime: dayjs(item.create_datetime).format('YYYY-MM-DD') })),
        comments_count: result[2][0].count

      });
    } catch (e) {
      next(e);
    }
  },
  typeData: async ({ userData }, { pool }, next) => {
    try {
      const user_no = userData.user_no;

      const [result] = await pool.query(`
        SELECT *
        FROM users AS a
        INNER JOIN region_4 AS b
        ON b.no = a.region_no
        INNER JOIN sectors AS c
        ON c.no = a.sector_no
        WHERE a.no = ?
      `, [user_no]);

      next(result);
    } catch (e) {
      next(e);
    }
  },
  postCreate: async ({ userData, body }, { pool }, next) => {
    try {
      const user_no = userData.user_no;
      const sector_no = userData.sector_no;
      const region_no = userData.region_no;
      const post_type = body.curType;
      const title = body.title;
      const content = body.content;

      const [result] = await pool.query(`
        INSERT INTO boards (
          user_no, 
          title, 
          content_text,
          ${post_type === "sector" ? "sector_no" : "region_no"} )
        VALUES(?,?,?,?)
      `, [user_no, title, content, post_type === "sector" ? sector_no : region_no]);
      next(result);
    } catch (e) {
      next(e);
    }
  },
  postLike: async ({ userData, body }, { pool, err }, next) => {
    try {
      const post_no = body.post_no;
      const user_no = userData.user_no;

      const [result] = await pool.query(`
        SELECT COUNT(*) AS 'count'
        FROM likes
        WHERE
        post_no = ?
        AND user_no = ?
        AND enabled = 1
      `, [post_no, user_no]);
      let result2;
      if (result[0].count < 1) {
        [result2] = await pool.query(`
          UPDATE boards
          SET likes = likes + 1
          WHERE no = ?;

          INSERT INTO likes(post_no, user_no)
          VALUES(?, ? )
      `, [post_no, post_no, user_no]);
      } else if (result[0].count > 0) {
        [result2] = await pool.query(`
          UPDATE boards
          SET likes = likes - 1
          WHERE no = ?;

          DELETE FROM likes
          WHERE user_no = ?
          AND post_no = ?;
          `, [post_no, user_no, post_no]);
      }

      next('good');
    } catch (e) {
      next(e);
    }
  },
  commentCreate: async ({ body, userData }, { pool }, next) => {
    try {
      const post_no = body.post_no;
      const comment = body.comment;
      const user_no = userData.user_no;

      const [result] = await pool.query(`
        INSERT INTO comments (user_no, post_no, text)
        VALUES (?,?,?);
      `, [user_no, post_no, comment]);

      next('good');
    } catch (e) {
      next(e);
    }
  },
  commentMore: async ({ query }, { pool }, next) => {
    try {
      const post_no = query.post_no;
      const page = query.page;
      const count = query.count === undefined ? 5 : query.count;
      const [result] = await pool.query(`
        SELECT 
        a.no AS no,
        a.user_no,
        a.post_no,
        a.text,
        a.create_datetime
        FROM comments AS a
        INNER JOIN boards AS b 
        ON a.post_no = b.no
        WHERE
        a.enabled = 1
        AND b.enabled = 1
        AND a.post_no = ?
        ORDER BY a.create_datetime ASC
        LIMIT ? OFFSET ? 
      `, [post_no, Number(count), Number(page * count)]);
      next(result);
    } catch (e) {
      next(e);
    }
  },
  searchData: async ({ userData, query }, { pool }, next) => {
    try {
      const region_no = userData.region_no;
      const sector_no = userData.sector_no;
      const user_input = query.user_input;
      const page = query.page;
      const count = query.count === undefined ? 10 : query.count;

      const [result] = await pool.query(`
      SELECT 
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
      (a.region_no = ? OR a.sector_no =? )
      AND a.enabled =1
      AND b.enabled =1
      AND a.title LIKE ?
      ORDER BY a.create_datetime DESC
      LIMIT ? OFFSET ?;

      SELECT
      COUNT(*) AS 'total_count'
      FROM boards
      WHERE
      (region_no = ? OR sector_no =? )
      AND enabled = 1
      AND title LIKE ?;
      
      `, [region_no, sector_no, `%${user_input}%`, Number(count), Number(page * count), region_no, sector_no, `%${user_input}%`]);
      next({
        total_count: result[1][0].total_count,
        post_list: result[0]
      });
    } catch (e) {
      next(e);
    }
  },
  postEdit: async ({ userData, body }, { pool }, next) => {
    try {
      const user_no = userData.user_no;
      const region_no = userData.region_no;
      const sector_no = userData.sector_no;

      const post_type = body.curType;
      const post_no = body.post_no;
      const title = body.title;
      const content_text = body.content_text;

      const [result] = await pool.query(`
        UPDATE boards 
        SET title = ?, content_text =?
        WHERE no = ?
      `, [title, content_text, post_no]);

      next("변함");
    } catch (e) {
      next(e);
    }
  },
  postDelete: async ({ query, }, { pool }, next) => {
    try {
      const post_no = query.post_no;
      const [result] = await pool.query(`
        UPDATE boards
        SET enabled = 0
        WHERE no = ?
      `, [post_no]);
      next('deleted');
    } catch (e) {
      next(e);
    }
  },
  updateViews: async ({ query }, { pool }, next) => {
    try {
      const post_no = query.post_no;
      const [result] = await pool.query(`
        UPDATE boards
        SET views = views + 1
        WHERE
        no = ?;
      `, [post_no]);
      next("good");
    } catch (e) {
      next(e);
    }
  },
  bestPost: async ({ userData, query }, { pool }, next) => {
    try {
      const region_no = userData.region_no;
      const sector_no = userData.sector_no;

      const [result] = await pool.query(`

      `);
    } catch (e) {
      next(e);
    }
  }
};
module.exports = controller;