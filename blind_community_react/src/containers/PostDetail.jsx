import React, {useEffect,useCallback,useState} from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import Layout from "../components/Layout";
import Comment from "../components/Comment";
import Comments from '../components/Comments'
import styled from "styled-components";
import { Button } from 'antd';
import {HeartOutlined}from '@ant-design/icons';
import viewIcon from "../assets/svgs/view.svg";
import heartIcon from "../assets/svgs/heart.svg";
import commentIcon from "../assets/svgs/comment.svg";
import emptyHeartIcon from "../assets/svgs/emptyHeart.svg";
import flyIcon from "../assets/svgs/fly.svg";
import api from '../utils/api';
import pack from '../css/containers/postdetail'

import {shallowEqual, useSelector, useDispatch} from 'react-redux'
import * as boardActions from '../store/modules/board'
import loading, * as loadingActions from '../store/modules/loading'

const PostDetail = ({match}) => {
    const post_no = match.params.no
    const dispatch = useDispatch()
    const history = useHistory()
    const [like, setLike] = useState(false)
    const [currentComment, setCurrentComment] = useState(1)
    const {postDetail,region,commentList,commentCount,comment} = useSelector(({board})=>({
        postDetail: board.postDetail,
        region_name: board.region.bname,
        commentList:board.commentList,
        commentCount:board.commentCount,
        comment: board.newComment.comment
    }),shallowEqual)
    
    const setPostDetail = useCallback((postDetail)=>{
        dispatch(boardActions.setPostDetail({postDetail}))
    },[dispatch])

    const setCommentList = useCallback((commentList)=>{
        dispatch(boardActions.setCommentList({commentList}))
    },[dispatch])

    const setCommentCount = useCallback((commentCount)=>{
        dispatch(boardActions.setCommentCount({commentCount}))
    },[dispatch])

    const setNewComment = useCallback((comment)=>{
        dispatch(boardActions.setNewComment({comment}))
    },[dispatch])
    const setLoading = useCallback((isLoading)=>{
      dispatch(loadingActions.setLoading({isLoading}))
  },[dispatch])

  const handleLikeBtn = () =>{
    api.postLike(post_no, ()=>{
      if (like){
        setLike(false)
      }else if(like === false){
        setLike(true)
      }
    
  })
  }
  const handleNewCommentBtn = useCallback( () =>{
    api.createComment({post_no, comment},(data)=>{
        setNewComment(``)
        // setCommentList([...commentList])
        window.location.reload()
    })
  })
  const handleMoreButton =  () =>{
     setCurrentComment(currentComment+1)
      api.customAPI(
        `get`,
        `/board/post/comment`,
        (data)=>{
          // console.log(data,"asdjaskldmaskldmklasmdklamskldmalksmdlkamslkdmlaksmdklasmd여기양",currentComment)
          // if (data.length < 1) setCurrentComment(currentComment-1)
          setCommentList([...commentList,...data])
          // setCommentList([...commentList,...data.filter(comment => commentList.filter())])

        },
        {params:{post_no, page:currentComment}}

      )
  }
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
  },[])

  useEffect( ()=>{
    api.postDetail({post_no},  (data)=>{
        setLoading(true)
        if (data.post_detail.liked === 1)  {setLike(true)} else{ setLike(false)}
        setPostDetail(data.post_detail)
        setCommentList(data.comments)
        setCommentCount(data.comments_count)
        setLoading(false)
    })
  },[like])
  return (
    <Layout>
      <pack.Container>
        <pack.Post>
          <pack.CurType>
            <div className = "type">{(postDetail.bname != null 
            ? `내 지역 | ${postDetail.bname}` 
            : `내 업종 | ${postDetail.name}`
            )}
            </div>
            {postDetail.can_edit === 1 
            ? <div className="postEdit">
              <span><Link to ={`/board/edit/${post_no}`}>수정</Link></span>
              <span onClick={handleDeleteBtn}>삭제</span>
            </div> : <></>}
            
            </pack.CurType>
          <pack.PostTitle>
            {postDetail.title}
          </pack.PostTitle>
          <pack.ABDContainer>
          <pack.Author>작성자: {postDetail.nickname}</pack.Author>
            {/* <pack.Bar>|</pack.Bar> */}
            
            <pack.Date>{postDetail.create_datetime}</pack.Date>
          </pack.ABDContainer>
          <pack.Content> 
            {postDetail.content_text}
          </pack.Content>
          <pack.CommuContainer>
            <pack.CommuRight>
              <pack.Views>
                <pack.SVG>
                  <object type="image/svg+xml" data={viewIcon} />
                </pack.SVG>
                {postDetail.views}
              </pack.Views>
              <pack.Likes>
                <pack.SVG>
                  <object type="image/svg+xml" data={heartIcon} />
                </pack.SVG>
                {postDetail.likes}
              </pack.Likes>
              <pack.Comments>
                <pack.SVG>
                  <object type="image/svg+xml" data={commentIcon} />
                </pack.SVG>
                {commentCount}
              </pack.Comments>
            </pack.CommuRight>
            <pack.LikeBtn onClick={handleLikeBtn} clicked= {like}>
            <Button type="primary">
              <HeartOutlined />
              <span>공감</span>
              </Button>
              {/* <pack.SVG>
              <HeartOutlined />
              </pack.SVG> */}
              
            </pack.LikeBtn>
          </pack.CommuContainer>
        </pack.Post>
        <pack.CommentContainer>
        <pack.CommentCnt>댓글 {commentCount}</pack.CommentCnt>
        {/* {commentList.map((comment)=>
        <Comment
            author = {comment.user_no}
            createDate = {comment.create_datetime}
            content = {comment.text}
            />)} */}
            <Comments list ={commentList} handleMoreButton={handleMoreButton} setCommentList={setCommentList}/>
            
          
          
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
          onKeyPress={(e) => { if (e.key == "Enter") handleNewCommentBtn() }}
          value = {comment}
        
           />
          <pack.InputBtn onClick = {handleNewCommentBtn}>
            <img src={flyIcon}  />
          </pack.InputBtn>
        </pack.InputWrap>
      </pack.InputContainer>
      
    </Layout>
  );
};

export default PostDetail;
