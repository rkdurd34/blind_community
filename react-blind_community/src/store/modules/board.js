import { createAction, handleActions } from 'redux-actions';
import { Record, List } from "immutable";
import api from '../../utils/api';

import * as loadingActions from './loading';

const SET_POST_TYPE = "board/SET_POST_TYPE";
const SET_SECTOR = "board/SET_SECTOR";
const SET_REGION = "board/SET_REGION";
const SET_POST_LIST = "board/SET_POST_LIST";
const SET_BOARD_ALL = 'board/SET_BOARD_ALL';

const SET_POST_DETAIL = "board/SET_POST_DETAIL";
const SET_COMMENT_LIST = "board/SET_COMMENT_LIST";
const SET_NEW_POST_TITLE = "board/SET_NEW_POST_TITLE";
const SET_NEW_POST_CONTENT = "board/SET_NEW_POST_CONTENT";
const SET_NEW_POST_TYPE = "board/SET_NEW_POST_TYPE";
const SET_COMMENT_COUNT = "board/SET_COMMENT_COUNT";
const SET_NEW_COMMENT = "board/SET_NEW_COMMENT";
const SET_SEARCH_POST = `board/SET_SEARCH_POST`;
const SET_EDIT_POST = `board/SET_EDIT_POST`;
const SET_MAIN_POST = `board/SET_MAIN_POST`;

export const setPostType = createAction(SET_POST_TYPE);
export const setSector = createAction(SET_SECTOR);
export const setRegion = createAction(SET_REGION);
export const setMain = createAction(SET_MAIN_POST);

export const setBoardAll = createAction(SET_BOARD_ALL);

export const setPostList = createAction(SET_POST_LIST);
export const setPostDetail = createAction(SET_POST_DETAIL);
export const setCommentList = createAction(SET_COMMENT_LIST);
export const setCommentCount = createAction(SET_COMMENT_COUNT);

export const setNewPostTitle = createAction(SET_NEW_POST_TITLE);
export const setNewPostContent = createAction(SET_NEW_POST_CONTENT);
export const setNewPostType = createAction(SET_NEW_POST_TYPE);

export const setNewComment = createAction(SET_NEW_COMMENT);
export const setSearchPost = createAction(SET_SEARCH_POST);
export const setEditPost = createAction(SET_EDIT_POST);


export const boardAllPostListAll = () => async dispatch => {

};
export const searchPageData = (curPage, searchInput, setTotalPage) => async (dispatch, getState) => {
  try {
    dispatch(loadingActions.setLoading(true));
    await api.customAPI(
      `get`,
      `/board/post/search`,
      (data) => {
        dispatch(setSearchPost({
          postList: {
            totalCount: data.total_count,
            postList: data.post_list,
            isSearched: true
          }
        }));
      },
      {
        params: {
          page: curPage,
          user_input: searchInput
        }
      }
    );
    await setTotalPage(getState().board.searchPost.totalCount);
    dispatch(loadingActions.setLoading(false));
  } catch (e) {
    throw (e);
  }

};
export const mainPageData = (post_type) => async (dispatch, getState) => {
  try {
    dispatch(loadingActions.setLoading(true));
    dispatch(setPostType({ post_type: post_type }));
    await api.customAPI(
      `get`,
      `/board/main`,
      (data) => {
        dispatch(setSector({
          sector: {
            no: data.user_data.sector_no,
            name: data.user_data.name
          }
        }));
        dispatch(setRegion({
          region: {
            no: data.user_data.region_no,
            bname: data.user_data.bname
          }
        }));
        dispatch(setMain({ main: data.post_data }));
      },
      { params: { post_type: getState().board.post_type } }
    );
    dispatch(loadingActions.setLoading(false));
  } catch (e) {
    throw (e);
  }
};
export const boardAllPageData = (post_type, page) => async (dispatch, getState) => {
  try {
    dispatch(loadingActions.setLoading(true));
    dispatch(setPostType({ post_type: post_type }));
    await api.customAPI(
      `get`,
      `/board/all`,
      (data) => {
        dispatch(setSector({
          sector: {
            no: data.user_data.sector_no,
            name: data.user_data.name
          }
        }));
        dispatch(setRegion({
          region: {
            no: data.user_data.region_no,
            bname: data.user_data.bname
          }
        }));
        dispatch(setBoardAll({
          board_all: {
            posts: data.post_data,
            cur_page: page,
            total_count: data.total_count
          }
        }));
      },
      {
        params: {
          post_type: getState().board.post_type,
          page: page,
        }
      }
    );
    dispatch(loadingActions.setLoading(false));
  } catch (e) {
    throw (e);
  }
};


const initialState = Record({
  post_type: "sector",
  sector: {
    no: ``,
    name: ``
  },
  region: {
    no: ``,
    bname: ``,
  },
  main: {
    best: List(),
    all: List()
  },
  board_all: {
    posts: List(),
    cur_page: 0,
    total_count: 0
  },
  post_detail:{},
  postList: List(),
  postDetail: {},
  commentList: List(),
  commentCount: 0,
  newPost: {
    title: ``,
    content: ``,
    type: ``
  },
  editPost: {
    post_detail: {
      title: ``,
      content_text: ``
    }
  },
  newComment: {
    comment: ``
  },
  searchPost: {
    totalCount: 30,
    postList: [],
    isSearched: false
  }

});

export default handleActions({
  [SET_POST_TYPE]: (state, { payload }) => state.set('post_type', payload.post_type),
  [SET_SECTOR]: (state, { payload }) => state.set('sector', payload.sector),
  [SET_REGION]: (state, { payload }) => state.set('region', payload.region),
  [SET_MAIN_POST]: (state, { payload }) => state.set('main', payload.main),
  [SET_BOARD_ALL]: (state, { payload }) => state.set('board_all', payload.board_all),

  [SET_POST_LIST]: (state, { payload }) => state.set('postList', payload.postList),
  [SET_POST_DETAIL]: (state, { payload }) => state.set('postDetail', payload.postDetail),
  [SET_COMMENT_LIST]: (state, { payload }) => { return state.set('commentList', payload.commentList); },

  [SET_NEW_POST_TITLE]: (state, { payload }) => state.setIn(['newPost', "title"], payload.title),
  [SET_NEW_POST_CONTENT]: (state, { payload }) => state.setIn(['newPost', "content"], payload.content),
  [SET_NEW_POST_TYPE]: (state, { payload }) => state.setIn(['newPost', "type"], payload.type),
  [SET_COMMENT_COUNT]: (state, { payload }) => state.set('commentCount', payload.commentCount),
  [SET_NEW_COMMENT]: (state, { payload }) => state.setIn(['newComment', 'comment'], payload.comment),

  [SET_SEARCH_POST]: (state, { payload }) => state.set(`searchPost`, payload.postList),

  [SET_EDIT_POST]: (state, { payload }) => { return state.set(`editPost`, payload.editPost); }

}, initialState());
//리덕스는 항상 변경되기전 값과 변경 되고나서 값이 항상 둘 다 있음
// 두개를 항상 갖고 있어야 상태 변화 감지하고 랜더링을 다시 해주기 떄문에f