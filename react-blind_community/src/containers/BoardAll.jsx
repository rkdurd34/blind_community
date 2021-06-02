import React,{useEffect, useState,useCallback} from 'react'
import {  } from 'react-cookie';
import {  } from "react-router-dom";
import api from '../utils/api'
// import DaumPostcode from "react-daum-postcode";

import Layout from '../components/Layout'
import Banner from '../components/Banner';
import TypeButton from '../components/TypeButton';

import pack from '../css/containers/boardall';
import Post from '../components/Post';

import {shallowEqual, useSelector, useDispatch} from 'react-redux'
import  * as boardActions from '../store/modules/board'
import PaginationComponent from '../components/Pagination2';



export default function BoardAll() {
    // const history = useHistory()
    const dispatch = useDispatch()
    // const [cookies,setCookies,removeCookies] = useCookies();
    
    const [postTotalCount, setPostTotalCount] = useState();
    const [curPage, setCurPage] = useState(0);

    
    const {curType, sector,region,postList} = useSelector(({board,auth})=> ({
        curType: board.curType,
        sector: board.sector,
        region: board.region,
        postList: board.postList,
    }),shallowEqual)
    
    const setPostType = useCallback((curType)=>{
        dispatch(boardActions.setPostType({curType}))
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

    useEffect(() => {
     api.postListAll({post_type:curType,page:curPage}, (data)=>{
         setSector({
            no:data.user_data.sector_no,
            name: data.user_data.name
         })
         setRegion({
             no:data.user_data.region_no,
             bname:data.user_data.bname
         })
         setPostList(data.post_data)
         setPostTotalCount(data.total_count)
     })
    }, [curPage, curType, setPostList, setRegion,setSector])
    const handleButtonClick = (curType) => {
        setPostType(curType)
        api.postListAll({post_type:curType,page:0}, (data)=>{
            setCurPage(0)
            setPostTotalCount(data.total_count)
            setPostList(data.post_data)
            
        })
    }
    const handelPaginationClick = (current) =>{
        setCurPage(current);
        api.postListAll({post_type:curType,page:current-1}, (data)=>{
            setPostTotalCount(data.total_count)
            setPostList(data.post_data)
            
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
                <pack.PostTitle>전체 게시글</pack.PostTitle>
                <pack.PostList>
                    {postList.map((post,index)=>
                    
                    <Post
                    title={post.title}
                    author={post.nickname}
                    createDate={post.create_datetime}
                    like={post.likes}
                    comment={post.comment_counts}
                    postNo = {post.post_no}
                    key = {post.post_no}
                    />
                    
                    
                    )}
         
                </pack.PostList>
                <pack.PaginationWrap>
                    <PaginationComponent
                    total={postTotalCount}
                    pageSize={10}
                    onChange={handelPaginationClick}
                    current ={curPage}
                    
                    />
                </pack.PaginationWrap>
                
            </pack.ListSection>
            
            
        </Layout>
    )
}
