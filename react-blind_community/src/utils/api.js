import axios from "axios";
import Cookies from 'js-cookie';


axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

const isError = err => {
  // console.log(err.response);
  if (err.response) {
    if (err.response.data instanceof Blob === true) {
      alert(" Download - 해당 API가 존재하지 않습니다.");
    } else if (err.response.status === 401) {
      alert("로그인 만료");
      Cookies.remove('accessToken');
      window.location.reload();
    } else {
      console.log(
        "요청이 이루어졌으나 서버가 2xx 범위를 벗어나는 상태 코드로 응답함."
      );
      console.log(
        "Error: ",
        err.response.status,
        err.response.data,
        err.response.headers,
        err.response.config,
        err.response.message
      );
      alert(`${err.response.data.message}`);
    }
  } else if (err.request) {
    console.log("요청이 이루어졌으나 응답이 없음.");
    console.log("Error: ", err.request);
  } else {
    console.log("오류를 발생시킨 요청을 설정하는 중에 문제 발생.");
    console.log("Error: ", err.message);
  }
};




const pack = {
  customAPI: (
    method,
    url,
    cb = () => { },
    { params = {}, data = {}, headers = {}, responseType = "json" }
  ) => {
    return axios({
      method,
      url,
      params,
      data,
      headers,
      responseType
    })
      .then((result) => cb(result.data))
      .catch((err) => isError(err));
  },

  signin: async (data, cb) => {
    await axios.post('/auth/signin', data)
      .then(result => cb())
      .catch(err => {
        isError(err);
      });
  },
  signup: async (data, cb) => {
    await axios.post('/auth/signup', data)
      .then(result => cb())
      .catch(err => {
        isError(err);
      });
  },
  // 43800

  // 46600
  // 2800 
  // 1120 - 45000
  // 1400 - 45200
  // 1680 -  45400

  signout: async (data, cb) => {
    await axios.delete('/auth/signout')
      .then(result => cb())
      .catch(err => isError(err));
  },
  typeDataFirst: async (cb) => {
    await axios.get('/auth/signup/type/first')
      .then(result => cb(result))
      .catch(err => {
        isError(err);
      });
  },
  typeDataSecond: async (region_1_no, cb) => {
    await axios.get(`/auth/signup/type/second?region_1_no=${region_1_no}`)
      .then(result => cb(result))
      .catch(err => {
        isError(err);
      });
  },
  typeDataThird: async (region_2_no, cb) => {
    await axios.get(`/auth/signup/type/third?region_2_no=${region_2_no}`)
      .then(result => cb(result))
      .catch(err => {
        isError(err);
      });
  },
  mainPage: async (post_type, cb) => {
    await axios.get(`/board/main?post_type=${post_type}`)
      .then(result => cb(result.data))
      .catch(err => {
        isError(err);
      });
  },
  postListAll: async (data, cb) => {
    await axios.get(`/board/all?post_type=${data.post_type}&page=${data.page}&count=${data.count}`)
      .then(result => cb(result.data))
      .catch(err => {
        isError(err);
      });
  },
  postDetail: async (data, cb) => {
    await axios.get(`/board/post/detail?post_no=${data.post_no}`)
      .then(result => { return cb(result.data); })
      .catch(err => {
        isError(err);
      });
  },
  typeData: async (data, cb) => {
    await axios.get(`/board/type/data`)
      .then(result => cb(result.data))
      .catch(err => {
        isError(err);
      });
  },
  createPost: async (data, cb) => {
    await axios.post(`/board/post/create`, data)
      .then(result => cb(result.data))
      .catch(err => {
        isError(err);
      });
  },
  postLike: async (data, cb) => {
    await axios.post(`/board/post/like`, { post_no: data })
      .then(result => cb(result.data))
      .catch(err => isError(err));
  },
  createComment: async (data, cb) => {
    await axios.post(`/board/post/comment`, { post_no: data.post_no, comment: data.comment })
      .then(result => cb(result.data))
      .catch(err => isError(err));
  },

};
export default pack;