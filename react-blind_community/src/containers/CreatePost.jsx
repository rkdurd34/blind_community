import React, { useEffect,useCallback } from "react";
import { useHistory } from "react-router-dom";

import Layout from "../components/Layout";


import TypeButton from '../components/TypeButton'
import pack from '../css/containers/createpost'
import api from '../utils/api';
import {shallowEqual, useSelector, useDispatch} from 'react-redux'
import * as boardActions from '../store/modules/board'

const CreatePage = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { title, content, region, sector, post_type} = useSelector(({board})=> ({
        type: board.newPost.type,
        title: board.newPost.title,
        content: board.newPost.content,
        region: board.region,
        sector: board.sector,
        post_type: board.post_type
    }),shallowEqual)
    
    if (region.no === "" || sector.no === "" ) history.push('/board/all')

    const setPostType = useCallback((post_type)=>{
        dispatch(boardActions.setPostType({post_type}))
    },[dispatch])

    // const setSector = useCallback((sector)=>{
    //     dispatch(boardActions.setSector({sector}))
    // },[dispatch])

    // const setRegion = useCallback((region)=>{
    //     dispatch(boardActions.setRegion({region}))
    // },[dispatch])

    const setNewPostTitle = useCallback((title)=>{
        dispatch(boardActions.setNewPostTitle({title}))
    },[dispatch])

    const setNewPostContent = useCallback((content)=>{
        dispatch(boardActions.setNewPostContent({content}))
    },[dispatch])

    const handleSaveBtn = () => {
        api.createPost({
            title,
            content,
            post_type
        },
        (data)=>{
            history.push(`/board/all`)
        })
    }

  useEffect(()=>{
      return    
  },[])

  return (
    <Layout>
      <pack.Container>
        <pack.ButtonSection>
            <TypeButton subTitle="내 지역" title ={region.bname} picked ={post_type === "region" ? true : false} onClick={()=> setPostType("region")}/>
            <TypeButton subTitle="내 업종" title= {sector.name} picked = {post_type=== "sector" ? true : false} onClick={()=>  setPostType("sector")}/>
        </pack.ButtonSection>
        <pack.Title placeholder={`제목을 입력해주세요`} onChange={(e)=>setNewPostTitle(e.target.value)} />
        <pack.Content placeholder={`내용을 입력해주세요`} onChange={(e)=>setNewPostContent(e.target.value)}/>
        <pack.BtnWrap>
          <pack.SaveBtn onClick={handleSaveBtn}>등록</pack.SaveBtn>
        </pack.BtnWrap>
      </pack.Container>
    </Layout>
  );
};

export default CreatePage;
