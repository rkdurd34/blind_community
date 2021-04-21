import { createAction, handleActions } from 'redux-actions';
import { Record } from "immutable";

// const INCREMENT = 'test/INCREMENT';
// const DECREMENT = 'test/DECREMENT'; //명시용이라서 어떻게 써도 상관은없음
// 
const SET_REG_EMAIL = "auth/SET_REG_EMAIL";
const SET_REG_PASSWORD = "auth/SET_REG_PASSWORD";
const SET_REG_PASSWORD_CHECK = "auth/SET_REG_PASSWORDCHECK";

const SET_EMAIL = "auth/SET_EMAIL";
const SET_PASSWORD = "auth/SET_PASSWORD";


// export const increment = createAction(INCREMENT);
// export const decrement = createAction(DECREMENT);

export const setRegEmail = createAction(SET_REG_EMAIL);
export const setRegPassword = createAction(SET_REG_PASSWORD);
export const setRegPasswordCheck = createAction(SET_REG_PASSWORD_CHECK);

export const setEmail = createAction(SET_EMAIL);
export const setPassword = createAction(SET_PASSWORD);




const initialState = Record({
  register: {
    email: "",
    password: "",
    passwordCheck: ""
  },
  login: {
    email: "",
    password: "",
  }

});

export default handleActions({
  [SET_REG_EMAIL]: (state, { payload }) => state.setIn(['register', 'email'], payload.email),
  [SET_REG_PASSWORD]: (state, { payload }) => state.setIn(['register', 'password'], payload.password),
  [SET_REG_PASSWORD_CHECK]: (state, { payload }) => state.setIn(['register', 'passwordCheck'], payload.passwordCheck),
  [SET_EMAIL]: (state, { payload }) => state.setIn(['login', 'email'], payload.email),
  [SET_PASSWORD]: (state, { payload }) => state.setIn(['login', 'password'], payload.password),
}, initialState());
//리덕스는 항상 변경되기전 값과 변경 되고나서 값이 항상 둘 다 있음
// 두개를 항상 갖고 있어야 상태 변화 감지하고 랜더링을 다시 해주기 떄문에f