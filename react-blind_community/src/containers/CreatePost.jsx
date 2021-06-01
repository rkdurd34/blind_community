import React, { useEffect,useCallback } from "react";
import { useHistory } from "react-router-dom";

import Layout from "../components/Layout";


import TypeButton from '../components/TypeButton'
import pack from '../css/containers/createpost'
import api from '../utils/api';
import {shallowEqual, useSelector, useDispatch} from 'react-redux'
import * as boardActions from '../store/modules/board'

const CreatePage = ({  }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const {type, title, content, region, sector, curType} = useSelector(({board})=> ({
        type: board.newPost.type,
        title: board.newPost.title,
        content: board.newPost.content,
        region: board.region,
        sector: board.sector,
        curType: board.curType
    }),shallowEqual)
    
    if (region.no==="" || sector.no==="" ) history.push('/board/all')

    const setCurType = useCallback((curType)=>{
        dispatch(boardActions.setCurType({curType}))
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
            curType
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
            <TypeButton subTitle="내 지역" title ={region.bname} picked ={curType === "region" ? true : false} onClick={()=> setCurType("region")}/>
            <TypeButton subTitle="내 업종" title= {sector.name} picked = {curType=== "sector" ? true : false} onClick={()=>  setCurType("sector")}/>
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
