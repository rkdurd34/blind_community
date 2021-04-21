import axios from "axios";


axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;
const isError = err => {
  if (err.response) {
    if (err.response.data instanceof Blob === true) {
      alert(" Excel Download - 해당 API가 존재하지 않습니다.");
    } else if (err.response.status === 401) {
      alert("로그인 만료");

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
export default {
  signin: async (data, cb) => {
    let status = await axios.post('/auth/signin', data)
      .then(result => cb())
      .catch(err => {
        isError(err);
      });
  },
  signup: async (data, cb) => {
    let status = await axios.post('/auth/signup', data)
      .then(result => cb())
      .catch(err => {
        isError(err);
      });
  },
  signout: async (data, cb) => {
    const status = await axios.delete('/auth/signout', data)
      .then(result => cb())
      .catch(err => isError(err));
  }
};