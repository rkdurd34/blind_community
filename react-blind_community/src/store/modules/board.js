import { createAction, handleActions } from 'redux-actions';
import { Record, List } from "immutable";
import api from '../../utils/api';

import * as loadingActions from './loading';

const SET_POST_TYPE = "board/SET_POST_TYPE";
const SET_SECTOR = "board/SET_SECTOR";
const SET_REGION = "board/SET_REGION";
const SET_POST_LIST = "board/SET_POST_LIST";
const SET_BOARD_ALL = 'board/SET_BOARD_ALL';
const SET_POST_DETAIL_2 = 'board/SET_POST_DETAIL_2';

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
export const setPostDetail2 = createAction(SET_POST_DETAIL_2);
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
export const postDetailPageData = (type, { post_no, newComment, setNewComment }) => async (dispatch, getState) => {
  try {
    dispatch(loadingActions.setLoading(true));
    switch (type) {
      case 'first': {
        await api.customAPI(
          `get`,
          `/board/post/detail`,
          (data) => {
            dispatch(setPostDetail2({
              post_detail: {
                title: data.post_detail.title,
                nickname: data.post_detail.nickname,
                content_text: data.post_detail.content_text,
                comment_count: data.comments_count,
                bname: data.post_detail.bname,
                name: data.post_detail.name,
                views: data.post_detail.views,
                likes: data.post_detail.likes,
                liked: data.post_detail.liked,
                can_edit: data.post_detail.can_edit,
                current_user: data.post_detail.current_user,
                comment_list: data.comments,
                current_comment: 1,
                create_datetime: data.post_detail.create_datetime
              }
            }));
            // if (data.post_detail.liked === 1) { setLike(true); } else { setLike(false); }
          },
          { params: { post_no } }
        );
        break;
      }
      case "more_comment": {
        await api.customAPI(
          `get`,
          `/board/post/comment`,
          (data) => {
            dispatch(setPostDetail2({
              post_detail: {
                ...getState().board.post_detail,
                comment_list: [...getState().board.post_detail.comment_list, ...data]
              }
            }));
            dispatch(setPostDetail2({
              post_detail: {
                ...getState().board.post_detail,
                current_comment: getState().board.post_detail.current_comment + 1
              }
            }));
          },
          { params: { post_no: post_no, page: getState().board.post_detail.current_comment } }
        );
        break;
      }
      case "new_comment": {
        await api.customAPI(
          `post`,
          `/board/post/comment`,
          (data) => { setNewComment(''); },
          { data: { post_no, comment: newComment } }
        );
      }
      case "click_like": {
        await api.customAPI(
          `post`,
          `/board/post/like`,
          () => {
            dispatch(setPostDetail2({
              post_detail: {
                ...getState().board.post_detail,
                liked: !getState().board.post_detail.liked
              }
            }));
          },
          { data: { post_no } }
        );
      }
    }

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
  post_detail: {
    title: ``,
    nickname: ``,
    content_text: ``,
    comment_count: 0,
    bname: ``,
    name: ``,
    views: 0,
    likes: 0,
    liked: 0,
    can_edit: 0,
    current_user: ``,
    comment_list: List(),
    current_comment: 1,
    create_datetime: ``
  },
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
  [SET_POST_DETAIL_2]: (state, { payload }) => state.set('post_detail', payload.post_detail),
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
//???????????? ?????? ??????????????? ?????? ?????? ???????????? ?????? ?????? ??? ??? ??????
// ????????? ?????? ?????? ????????? ?????? ?????? ???????????? ???????????? ?????? ????????? ?????????f