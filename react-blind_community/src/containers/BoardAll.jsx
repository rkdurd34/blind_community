import React,{useEffect} from 'react'
import {  } from 'react-cookie';
import {  } from "react-router-dom";

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

    const {post_type,posts, sector,region,cur_page,total_count} = useSelector(({board,auth})=> ({
        post_type: board.post_type,
        sector: board.sector,
        region: board.region,
        postList: board.postList,
        posts: board.board_all.posts,
        cur_page: board.board_all.cur_page,
        total_count: board.board_all.total_count
    }),shallowEqual)
    
    useEffect(() => {
     dispatch(boardActions.boardAllPageData('region',cur_page))
    }, [dispatch,cur_page])
  
    return (
        <Layout BackButton={false}>
            <Banner/>
        
            <pack.ButtonSection>
                <TypeButton 
                subTitle="내 지역" 
                title ={region.bname} 
                picked ={post_type === "region" ? true : false} 
                onClick={()=>dispatch(boardActions.boardAllPageData('region',cur_page))}
                />
                <TypeButton 
                subTitle="내 업종" 
                title= {sector.name} 
                picked = {post_type=== "sector" ? true : false} 
                onClick={()=>dispatch(boardActions.boardAllPageData('sector',cur_page))}
                />
            </pack.ButtonSection>
            <pack.ListSection>
                <pack.PostTitle>전체 게시글</pack.PostTitle>
                <pack.PostList>
                    {posts.map((post,index)=>
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
                    total={total_count}
                    pageSize={10}
                    onChange={(current)=>dispatch(boardActions.boardAllPageData(post_type,current-1))}
                    current ={cur_page+1}
                    />
                </pack.PaginationWrap>
                
            </pack.ListSection>
            
            
        </Layout>
    )
}
