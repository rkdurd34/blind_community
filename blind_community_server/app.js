// require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');

const cookieParser = require('cookie-parser');
const { database, errorHandler } = require("./middlewares/modules");

const app = express();


app.use(cors({ credentials: true, origin: true }));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// require('dayjs/locale/ko');
app.use(database(), errorHandler());
dayjs = require('dayjs');
dayjs.locale('ko');

morgan.token('date', () => dayjs().format("YYYY-MM-DD HH:mm:ss"));
app.use(morgan(`:date[iso][:status][:method] :url :response-time ms :res[content-length] bytes`));
// const upload = multer({ dest: 'media/img' });
// app.post("/board/upload", upload.array('docs'));

// app.get('/test', require('./routes/test.routes'));
app.use('/media', express.static("media"));


app.use('/auth', require('./routes/auth.routes'));
app.use('/board', require('./routes/board.routes'));
app.use('/mypage', require('./routes/mypage.routes'));
app.use('/admin', require('./routes/admin.routes'));

app.use((req, { err }, next) => {
  next(err.NotFound('요청하신 페이지를 찾을 수 없습니다.'));
});

app.use((data, req, res, next) => {
  if (data instanceof Error) {
    console.log(data);
    res.status(data.status || 500);
    return res.json(data);
  }
  res.status(200).json(data);
});

const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));