import { createAction, handleActions } from 'redux-actions';
import { get, Record } from "immutable";
import api from '../../utils/api';
// const INCREMENT = 'test/INCREMENT';
// const DECREMENT = 'test/DECREMENT'; //명시용이라서 어떻게 써도 상관은없음
// 
const SET_REG_EMAIL = "auth/SET_REG_EMAIL";
const SET_REG_PASSWORD = "auth/SET_REG_PASSWORD";
const SET_REG_PASSWORD_CHECK = "auth/SET_REG_PASSWORDCHECK";
const SET_REG_NICKNAME = "auth/SET_REG_NICKNAME";

const SET_REG_BG_1 = "auth/SET_BG_1";
const SET_REG_BG_2 = "auth/SET_BG_2";
const SET_REG_BG_3 = "auth/SET_BG_3";
const SET_REG_WORK_KIND = "auth/SET_REG_WORK_KIND";
const SET_REG_IMAGE = "auth/SET_REG_IMAGE";

const SET_EMAIL = "auth/SET_EMAIL";
const SET_PASSWORD = "auth/SET_PASSWORD";

const SET_MY_CUR_TYPE = "auth/SET_MY_CUR_TYPE";
const SET_MY_FIRST = 'auth/SET_MY_FIRST';
const SET_MY_SECOND = 'auth/SET_MY_SECOND';
// export const increment = createAction(INCREMENT);
// export const decrement = createAction(DECREMENT);

export const setRegEmail = createAction(SET_REG_EMAIL);
export const setRegPassword = createAction(SET_REG_PASSWORD);
export const setRegPasswordCheck = createAction(SET_REG_PASSWORD_CHECK);
export const setRegNickname = createAction(SET_REG_NICKNAME);

export const setRegBg1 = createAction(SET_REG_BG_1);
export const setRegBg2 = createAction(SET_REG_BG_2);
export const setRegBg3 = createAction(SET_REG_BG_3);
export const setRegWorkKind = createAction(SET_REG_WORK_KIND);

export const setRegImage = createAction(SET_REG_IMAGE);


export const setEmail = createAction(SET_EMAIL);
export const setPassword = createAction(SET_PASSWORD);

export const setMyCurType = createAction(SET_MY_CUR_TYPE);
export const setMyFirst = createAction(SET_MY_FIRST);
export const setMySecond = createAction(SET_MY_SECOND);

export const myPageFirstData = () => async (dispatch, getState) => {
  await dispatch(setMyCurType({ curType: "first" }));
  const dataType = getState().auth.myPage.curType;
  await api.customAPI(
    "get",
    '/auth/mypage',
    (data) => dispatch(setMyFirst({ first: data[0] })),
    { params: { data_type: dataType } }
  );

  return;
};
export const myPageSecondData = (curPage, setTotalPage) => async (dispatch, getState) => {
  await dispatch(setMyCurType({ curType: "second" }));
  const dataType = getState().auth.myPage.curType;
  await api.customAPI(
    "get",
    '/auth/mypage',
    (data) => {
      console.log(data,'ㅁㄴㅇㅁㄴㅇㅁㄴㅇ');
      dispatch(setMySecond({ second: data.post_list }));
      setTotalPage(data.total_count);
    },
    { params: { data_type: dataType, page: curPage } }
  );

  return;
};


const initialState = Record({
  register: {

    email: "",
    password: "",
    passwordCheck: "",
    nickname: "",
    bg1: "",
    bg2: "",
    bg3: "",
    workKind: "",
    image: ""
  },
  login: {
    email: "",
    password: "",
  },
  myPage: {
    curType: "first",
    first: {
      nickname: "",
      email: "",
      password: ""
    },
    second: []


  }

});

export default handleActions({
  [SET_REG_EMAIL]: (state, { payload }) => state.setIn(['register', 'email'], payload.email),
  [SET_REG_PASSWORD]: (state, { payload }) => state.setIn(['register', 'password'], payload.password),
  [SET_REG_PASSWORD_CHECK]: (state, { payload }) => state.setIn(['register', 'passwordCheck'], payload.passwordCheck),
  [SET_REG_NICKNAME]: (state, { payload }) => state.setIn(['register', 'nickname'], payload.nickname),

  [SET_REG_BG_1]: (state, { payload }) => state.setIn(['register', 'bg1'], payload.bg1),
  [SET_REG_BG_2]: (state, { payload }) => state.setIn(['register', 'bg2'], payload.bg2),
  [SET_REG_BG_3]: (state, { payload }) => state.setIn(['register', 'bg3'], payload.bg3),
  [SET_REG_WORK_KIND]: (state, { payload }) => state.setIn(['register', 'workKind'], payload.workKind),
  [SET_REG_IMAGE]: (state, { payload }) => state.setIn(['register', 'image'], payload.image),


  [SET_EMAIL]: (state, { payload }) => state.setIn(['login', 'email'], payload.email),
  [SET_PASSWORD]: (state, { payload }) => state.setIn(['login', 'password'], payload.password),

  [SET_MY_CUR_TYPE]: (state, { payload }) => state.setIn(['myPage', "curType"], payload.curType),
  [SET_MY_FIRST]: (state, { payload }) => state.setIn(['myPage', "first"], payload.first),
  [SET_MY_SECOND]: (state, { payload }) => state.setIn(['myPage', "second"], payload.second)


}, initialState());
//리덕스는 항상 변경되기전 값과 변경 되고나서 값이 항상 둘 다 있음
// 두개를 항상 갖고 있어야 상태 변화 감지하고 랜더링을 다시 해주기 떄문에f