import { createAction, handleActions } from 'redux-actions';
import { Record } from "immutable";

const SET_LOADING = 'loading/SET_LOADING';

export const setLoading = createAction(SET_LOADING);

const initialState = Record({
  isLoading: false
});

export default handleActions({
  [SET_LOADING]: (state, { payload }) => state.set('isLoading', payload.isLoading),
}, initialState());
//리덕스는 항상 변경되기전 값과 변경 되고나서 값이 항상 둘 다 있음
// 두개를 항상 갖고 있어야 상태 변화 감지하고 랜더링을 다시 해주기 떄문에f