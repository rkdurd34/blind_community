import { createAction, handleActions } from 'redux-actions';
import { Record, List } from "immutable";

const MENU_COLLAPSED = 'common/view/MENU_COLLAPSED';
const MENU_SELECTED = 'common/view/MENU_SELECTED';
const MENU_OPENED = 'common/view/MENU_OPENED';
const SET_LOADING = 'common/view/SET_LOADING';

export const menuCollapsed = createAction(MENU_COLLAPSED);
export const menuSelected = createAction(MENU_SELECTED);
export const menuOpened = createAction(MENU_OPENED);
export const setIsLoading = createAction(SET_LOADING);

export const asyncPushHistoryPage = ({ menu, history }) => async dispatch => {
    console.log(menu);
    await dispatch(menuSelected({ selected_key: menu.key }));
    history.push(menu.path);
};

export const asyncPopHistoryPage = ({ menu, history = null }) => async dispatch => {
    await dispatch(menuSelected({ selected_key: menu.key }));
    if (menu.main_menu_key !== null) await dispatch(menuOpened({ open_keys: [menu.main_menu_key] }));
    if (history !== null) history.goBack();
};

const initialState = Record({
    sales_user: {
        type: `employee`,
        company_no: -1,
        company_name: `주식회사 테스트`,
        email: `test@naver.com`,
        auth: 0,
        position: `개발팀`,
        name: `테스터`,
        phone: `01900010001`,
        address: `서울시 서초구 남부순환로356길70 302호`,
        latitude: 0,
        longitude: 0,
    },
    view: {
        collapsed: false,
        selected_keys: List(["1"]),
        open_keys: List(),
        is_loading: false,
    },
});

export default handleActions({
    [MENU_COLLAPSED]: (state, { payload }) => state.setIn(['view', 'collapsed'], !payload.collapsed),
    [MENU_SELECTED]: (state, { payload }) => state.setIn(['view', 'selected_keys', 0], payload.selected_key),
    [MENU_OPENED]: (state, { payload }) => state.setIn(['view', 'open_keys'], List(payload.open_keys)),
    [SET_LOADING]: (state, { payload }) => state.setIn(['view', 'is_loading'], payload.is_loading)
}, initialState());
