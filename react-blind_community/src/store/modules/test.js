import { createAction, handleActions } from 'redux-actions';
import { Record } from "immutable";

const INCREMENT = 'test/INCREMENT';
const DECREMENT = 'test/DECREMENT'; //명시용이라서 어떻게 써도 상관은없음

export const increment = createAction(INCREMENT);
export const decrement = createAction(DECREMENT);


const initialState = Record({
  count: 0,
});

export default handleActions({
  [INCREMENT]: (state, { payload }) => state.set('count', payload.count + 1),
  [DECREMENT]: (state, { payload }) => state.set('count', payload.count - 1),
}, initialState());
//리덕스는 항상 변경되기전 값과 변경 되고나서 값이 항상 둘 다 있음
// 두개를 항상 갖고 있어야 상태 변화 감지하고 랜더링을 다시 해주기 떄문에f