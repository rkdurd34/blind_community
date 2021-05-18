import React, { useState,useEffect,useCallback } from "react";
import { Link,useHistory } from "react-router-dom";

import Layout from "../components/Layout";

import styled from "styled-components";
import TypeButton from '../components/TypeButton'
import pack from '../css/containers/createpost'
import api from '../utils/api';
import {shallowEqual, useSelector, useDispatch} from 'react-redux'
import * as boardActions from '../store/modules/board'
import PostDetail from './PostDetail';

const PostEdit = ({ location,history,match }) => {
    const post_no = match.params.no
    const dispatch = useDispatch()
    // const history = useHistory()

    const [title,setTitle] = useState(`ㅂㅈㄷ`)
    const [contentText, setContentText] =useState(`ㅁㄴㅇ`)
    const {editPost} = useSelector(({board})=> ({
        editPost: board.postDetail
    }),shallowEqual)
    console.log(editPost)
    // if (region.no==="" || sector.no==="" ) history.push('/board/all')

    const setEditPost = useCallback((editPost)=>{
        dispatch(boardActions.setEditPost({editPost}))
    },[dispatch])
    
    // const setNewPostTitle = useCallback((title)=>{
    //     dispatch(boardActions.setNewPostTitle({title}))
    // },[dispatch])

    // const setNewPostContent = useCallback((content)=>{
    //     dispatch(boardActions.setNewPostContent({content}))
    // },[dispatch])

    const handleEditBtn = () => {
        api.customAPI(
            `patch`,
            `/board/post/edit`,
            (data)=>{
                history.push(`/board/all`)
            },
            {
            data:{
                title,
                content_text:contentText,
                post_no
            }                        
            })
    }

  useEffect(()=>{
    setTitle(editPost.title)
    setContentText(editPost.content_text)
      // api.customAPI(
      //     `get`,
      //     `/board/post/detail`,
      //     (data) =>{
      //       setEditPost(data)
      //       setTitle(data.post_detail.title)
      //       setContentText(data.post_detail.content_text)
      //     },
      //     {
      //         params:{
      //           post_no
      //         }
      //     }
      // )
      // return    
  },[])

  return (
    <Layout>
      <pack.Container>
        <pack.ButtonSection>
             <TypeButton subTitle="내 지역" title ={editPost.region_type} picked ={ editPost.region_no!== null ? true : false}  />
            <TypeButton subTitle="내 업종" title= {editPost.sector_type} picked = {editPost.sector_no!== null ? true : false} />
        </pack.ButtonSection>
        <pack.Title 
            placeholder={`제목을 입력해주세요`} 
            onChange={(e)=>setTitle(e.target.value)}
            value={title}
        />
        <pack.Content 
            placeholder={`내용을 입력해주세요`}
            onChange={(e)=>setContentText(e.target.value)}
            value={contentText}
         />
        <pack.BtnWrap>
          <pack.SaveBtn 
          onClick={handleEditBtn}
          >수정</pack.SaveBtn>
        </pack.BtnWrap>
      </pack.Container>
    </Layout>
  );
};

export default PostEdit;
