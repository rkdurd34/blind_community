import React,{useEffect, useState,useCallback} from 'react'
import { useCookies } from 'react-cookie';
import { useHistory,Link } from "react-router-dom";
import api from '../utils/api'
// import DaumPostcode from "react-daum-postcode";

import Layout from '../components/Layout'
import Banner from '../components/Banner';
import TypeButton from '../components/TypeButton';

import pack from '../css/containers/main';
import Post from '../components/Post';

import {shallowEqual, useSelector, useDispatch} from 'react-redux'
import board, * as boardActions from '../store/modules/board'



export default function Main() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [cookies,setCookies,removeCookies] = useCookies();
    
    const {curType, sector,region,postList,email,main} = useSelector(({board,auth})=> ({
        curType: board.curType,
        sector: board.sector,
        region: board.region,
        postList: board.postList,
        main:board.main,
        email: auth.login.email
    }),shallowEqual)
    const setCurType = useCallback((curType)=>{
        dispatch(boardActions.setCurType({curType}))
    },[dispatch])

    const setSector = useCallback((sector)=>{
        dispatch(boardActions.setSector({sector}))
    },[dispatch])

    const setRegion = useCallback((region)=>{
        dispatch(boardActions.setRegion({region}))
    },[dispatch])

    const setPostList = useCallback((postList)=>{
        dispatch(boardActions.setPostList({postList}))
    },[dispatch])
    const setMain = useCallback((main)=>{
        dispatch(boardActions.setMain({main}))
    },[dispatch])

    useEffect(() => {
     api.mainPage(curType, (data)=>{
         console.log(data)
         setSector({
            no:data.user_data.sector_no,
            name: data.user_data.name
         })
         setRegion({
             no:data.user_data.region_no,
             bname:data.user_data.bname
         })
         setMain(data.post_data)
     })
    }, [])
    const handleButtonClick = (curType) => {
        setCurType(curType)
        api.mainPage(curType, (data)=>{
            console.log(data)
            setMain(data.post_data)
        })
    }
    
    return (
        <Layout BackButton={false}>
            <Banner/>
        
            <pack.ButtonSection>
                <TypeButton subTitle="내 지역" title ={region.bname} picked ={curType === "region" ? true : false} onClick={()=> handleButtonClick("region")}/>
                <TypeButton subTitle="내 업종" title= {sector.name} picked = {curType=== "sector" ? true : false} onClick={()=>  handleButtonClick("sector")}/>
            </pack.ButtonSection>
            <pack.ListSection>
                <pack.PostTitle>
                    <span>베스트 게시글</span>
                    <span><Link to ="/board/all">{"<"}더 보기</Link></span>
                    </pack.PostTitle>
                <pack.PostList>
                    {main.best.map((post,index)=>
                    <Post
                    title={post.title}
                    author={post.nickname}
                    createDate={post.create_datetime}
                    like={post.likes}
                    comment={post.comment_counts}
                    rank={index+1}
                    postNo = {post.post_no}
                    />
                    )}
         
                </pack.PostList>
            </pack.ListSection>
            <pack.ListSection>
                <pack.PostTitle>
                    <span>전체 게시글</span>
                    <span><Link to ="/board/all">{"<"}더 보기</Link></span>
                </pack.PostTitle>
                <pack.PostList>
                {main.all.map((post,index)=>
                    <Post
                    title={post.title}
                    author={post.nickname}
                    createDate={post.create_datetime}
                    like={post.likes}
                    comment={post.comment_counts}
                    postNo = {post.post_no}
                    />
                    )}
         
                </pack.PostList>
            </pack.ListSection>
            
        </Layout>
    )
}
