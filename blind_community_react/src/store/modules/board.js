import { createAction, handleActions } from 'redux-actions';
import { Record, List } from "immutable";
import api from '../../utils/api';
import create from '@ant-design/icons/lib/components/IconFont';


const SET_CURTYPE = "board/SET_CURTYPE";
const SET_SECTOR = "board/SET_SECTOR";
const SET_REGION = "board/SET_REGION";
const SET_POST_LIST = "board/SET_POST_LIST";
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

export const setCurType = createAction(SET_CURTYPE);
export const setSector = createAction(SET_SECTOR);
export const setRegion = createAction(SET_REGION);
export const setMain = createAction(SET_MAIN_POST)

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
    console.log('안와?');
    const result = await api.customAPI(
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
    console.log(getState().board.searchPost.totalCount);
    await setTotalPage(getState().board.searchPost.totalCount);
  } catch (e) {
    throw (e);
  }

};
// export const getEvents = (page = 1, isOwner = false) => async (dispatch) => {
//   const pageQuery = parseInt(page, 10);
//   await dispatch(setPage({ page: pageQuery }));
//   try {
//     if (isOwner) {
//       const res = await req("get", `/events/owner?page=${pageQuery}`);
//       await dispatch(setEvents(res.data.results));
//       await dispatch(setCount({ count: res.data.count }));
//     } else {
//       const res = await req("get", "/events");
//       await dispatch(setEvents(res.data.results));
//       await dispatch(setCount({ count: res.data.count }));
//     }
//   } catch (e) {
//     throw (e);
//   }
// };


const initialState = Record({
  curType: "sector",
  sector: {
    no: ``,
    name: ``
  },
  region: {
    no: ``,
    bname: ``,

  },
  main:{
    best:[],
    all:[]
  },
  postList: [],
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
  [SET_CURTYPE]: (state, { payload }) => state.set('curType', payload.curType),
  [SET_SECTOR]: (state, { payload }) => state.set('sector', payload.sector),
  [SET_REGION]: (state, { payload }) => state.set('region', payload.region),
  [SET_MAIN_POST] : (state,{payload}) => state.set('main', payload.main),
  [SET_POST_LIST]: (state, { payload }) => state.set('postList', payload.postList),
  [SET_POST_DETAIL]: (state, { payload }) => state.set('postDetail', payload.postDetail),
  [SET_COMMENT_LIST]: (state, { payload }) => { console.log(payload.commentList); return state.set('commentList', payload.commentList); },

  [SET_NEW_POST_TITLE]: (state, { payload }) => state.setIn(['newPost', "title"], payload.title),
  [SET_NEW_POST_CONTENT]: (state, { payload }) => state.setIn(['newPost', "content"], payload.content),
  [SET_NEW_POST_TYPE]: (state, { payload }) => state.setIn(['newPost', "type"], payload.type),
  [SET_COMMENT_COUNT]: (state, { payload }) => state.set('commentCount', payload.commentCount),
  [SET_NEW_COMMENT]: (state, { payload }) => state.setIn(['newComment', 'comment'], payload.comment),

  [SET_SEARCH_POST]: (state, { payload }) => state.set(`searchPost`, payload.postList),

  [SET_EDIT_POST]: (state, { payload }) => { console.log(payload); return state.set(`editPost`, payload.editPost); }

}, initialState());
//리덕스는 항상 변경되기전 값과 변경 되고나서 값이 항상 둘 다 있음
// 두개를 항상 갖고 있어야 상태 변화 감지하고 랜더링을 다시 해주기 떄문에f