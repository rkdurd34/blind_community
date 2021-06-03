import React, {useEffect,useCallback,useState} from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import Layout from "../components/Layout";

import Comments from '../components/Comments'

import { Button } from 'antd';
import {HeartOutlined}from '@ant-design/icons';
import viewIcon from "../assets/svgs/view.svg";
import heartIcon from "../assets/svgs/heart.svg";
import commentIcon from "../assets/svgs/comment.svg";

import flyIcon from "../assets/svgs/fly.svg";
import api from '../utils/api';
import pack from '../css/containers/postdetail'

import {shallowEqual, useSelector, useDispatch} from 'react-redux'
import board, * as boardActions from '../store/modules/board'
import  * as loadingActions from '../store/modules/loading'

const PostDetail = ({match}) => {
    const post_no = match.params.no
    const dispatch = useDispatch()
    const history = useHistory()
    const [newComment, setNewComment]= useState(``)
    const {post_detail} = useSelector(({board})=>({
        post_detail:board.post_detail
    }),shallowEqual)
    const setCommentList = useCallback((commentList)=>{
        dispatch(boardActions.setCommentList({commentList}))
    },[dispatch])

  const handleDeleteBtn = () =>{
    if (window.confirm('삭제하실거임 ?')){
      api.customAPI(
        `delete`,
        `/board/post/delete`,
        (data)=>{ history.push('/board/all')},
        {params:{post_no}}
      )
    }
  }
  useEffect(()=>{
    api.customAPI(
      `get`,
      `/board/post/views`,
      (data)=> {},
      {params:{ post_no}}
    )
  },[post_no])

  useEffect( ()=>{
    dispatch(boardActions.postDetailPageData("first",{post_no}))
  },[dispatch, post_no,post_detail.liked])
  console.log(post_detail)
  return (
    <Layout>
      <pack.Container>
        <pack.Post>
          <pack.CurType>
            <div className = "type">{(post_detail.bname != null 
            ? `내 지역 | ${post_detail.bname}` 
            : `내 업종 | ${post_detail.name}`
            )}
            </div>
            {post_detail.can_edit === 1 
            ? <div className="postEdit">
              <span><Link to ={`/board/edit/${post_no}`}>수정</Link></span>
              <span onClick={handleDeleteBtn}>삭제</span>
            </div> : <></>}
            
            </pack.CurType>
          <pack.PostTitle>
            {post_detail.title}
          </pack.PostTitle>
          <pack.ABDContainer>
          <pack.Author>작성자: {post_detail.nickname}</pack.Author>
            {/* <pack.Bar>|</pack.Bar> */}
            
            <pack.Date>{post_detail.create_datetime}</pack.Date>
          </pack.ABDContainer>
          <pack.Content> 
            {post_detail.content_text}
          </pack.Content>
          <pack.CommuContainer>
            <pack.CommuRight>
              <pack.Views>
                <pack.SVG>
                  <img  src ={viewIcon}type="image/svg+xml" alt={"아이콘"} data={viewIcon} />
                </pack.SVG>
                {post_detail.views}
              </pack.Views>
              <pack.Likes>
                <pack.SVG>
                  <img src = {heartIcon} alt={"아이콘"} type="image/svg+xml" data={heartIcon} />
                </pack.SVG>
                {post_detail.likes}
              </pack.Likes>
              <pack.Comments>
                <pack.SVG>
                  <img src ={commentIcon} alt={"아이콘"}type="image/svg+xml" data={commentIcon} />
                </pack.SVG>
                {post_detail.comment_count}
              </pack.Comments>
            </pack.CommuRight>
            <pack.LikeBtn 
            onClick={()=>dispatch(boardActions.postDetailPageData('click_like',{post_no}))} 
            clicked= {post_detail.liked}>
            <Button type="primary">
              <HeartOutlined />
              <span>공감</span>
              </Button>
            </pack.LikeBtn>
          </pack.CommuContainer>
        </pack.Post>
        <pack.CommentContainer>
        <pack.CommentCnt>댓글 {post_detail.comment_count}</pack.CommentCnt>
            <Comments 
            list ={post_detail.comment_list} 
            handleMoreButton={()=>dispatch(boardActions.postDetailPageData("more_comment",{post_no}))} 
            setCommentList={setCommentList}
            canDelete = {post_detail.current_user}
            commentCount = {post_detail.comment_count}
            currentComment = {post_detail.current_comment}
            />
            
          
          
        </pack.CommentContainer>
        {/* <pack.MoreWrap>
          <pack.More onClick={handleMoreButton}>더보기</pack.More>
        </pack.MoreWrap> */}
    
      </pack.Container>
      <pack.InputContainer>
        <pack.InputWrap>
          <pack.Input  
          onChange ={(e)=>setNewComment(e.target.value)}
          placeholder={`댓글을 입력하세요.`}
          onKeyPress={(e) => { if (e.key === "Enter") dispatch(boardActions.postDetailPageData("new_comment",{post_no,newComment,setNewComment})) }}
          value = {newComment}
        
           />
          <pack.InputBtn onClick = {()=>dispatch(boardActions.postDetailPageData("new_comment",{post_no,newComment,setNewComment}))}>
            <img alt={"아이콘"} src={flyIcon}  />
          </pack.InputBtn>
        </pack.InputWrap>
      </pack.InputContainer>
      
    </Layout> 
  );
};

export default PostDetail;
