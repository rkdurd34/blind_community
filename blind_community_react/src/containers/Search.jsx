import React, { useState,useEffect,useCallback } from "react";
import { Link,useHistory } from "react-router-dom";

import Layout from "../components/Layout";
import Post from "../components/Post";
import Pagination from "../components/Pagination2";
import SearchIcon from "../components/searchIcon";
import back from "../assets/svgs/back.svg";

import pack from '../css/containers/search'

import {shallowEqual, useSelector, useDispatch} from 'react-redux'
import board, * as boardActions from '../store/modules/board'

const PER_PAGE = 10;

const Search = ({ location }) => {
  //검색 버튼을 오른쪽에 하나 둬야 할거 같은데????
  const history = useHistory()
  const dispatch = useDispatch()
  // const [isSearched, setIsSearched] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [curPage, setCurPage] = useState(0);
  const [totalPage,setTotalPage] = useState(0);

  const {searchPost} = useSelector(({board})=> ({
    searchPost: board.searchPost,
  }),shallowEqual)

  const setSearchPost = useCallback((postList)=>{
        dispatch(boardActions.setSearchPost({postList}))
    },[dispatch])

  const paginationHandler = current => {
    setCurPage(current);
    dispatch(boardActions.searchPageData(curPage,searchInput,setTotalPage))
  };
  const handleSearchButton =  ()=>{
    // setIsSearched(true)
    dispatch(boardActions.searchPageData(curPage,searchInput,setTotalPage))
  }
  useEffect(()=>{
    return ()=>{
      return 
      setSearchPost({
        totalCount: 30,
        postList: [],
        isSearched: false}
      )
      }
  },[])
  return (
    <Layout Headers={false}>
      <pack.Container>
        <pack.InputContainer>
          <pack.Back onClick ={()=> history.goBack()}>
            <img src={back} type="image/svg+xml" data={back} />
          </pack.Back>
          {/* <pack.Img>
            <SearchIcon
              width={`14.344`}
              height={`14.346`}
              viewBox={`0 0 14.344 14.346`}
              d={`M14.148,12.4,11.355,9.61a.672.672,0,0,0-.476-.2h-.457a5.825,5.825,0,1,0-1.009,1.009v.457a.672.672,0,0,0,.2.476L12.4,14.148a.67.67,0,0,0,.95,0l.793-.793A.676.676,0,0,0,14.148,12.4ZM5.827,9.414A3.586,3.586,0,1,1,9.414,5.827,3.584,3.584,0,0,1,5.827,9.414Z`}
              fill={`#212529`}
            />
          </pack.Img> */}
          <pack.Input 
          placeholder={`제목을 입력하세요`} 
          onChange={(e)=>setSearchInput(e.target.value)}
          onKeyPress={(e)=> {if(e.key=="Enter") handleSearchButton()}}
          />
          <pack.Search
            onClick={handleSearchButton}
          >검색</pack.Search>
        </pack.InputContainer>
        {!searchPost.isSearched ? (
          <>
            <pack.Content>게시판의 글을 검색하세요 </pack.Content>
            <pack.SVG>
              <SearchIcon
                width={`40.005`}
                height={`40.012`}
                viewBox={`0 0 40.005 40.012`}
                d={`M39.461,34.593,31.671,26.8a1.874,1.874,0,0,0-1.328-.547H29.069a16.246,16.246,0,1,0-2.813,2.813v1.274a1.874,1.874,0,0,0,.547,1.328l7.791,7.791a1.868,1.868,0,0,0,2.649,0l2.211-2.211A1.884,1.884,0,0,0,39.461,34.593ZM16.253,26.255a10,10,0,1,1,10-10A10,10,0,0,1,16.253,26.255Z`}
                fill={`#212529`}
                opacity={`0.358`}
              />
            </pack.SVG>{" "}
          </>
        ) : (
          <>
          {searchPost.postList.map((post)=><Post
            title={post.title}
            author={post.nickname}
            createDate={post.create_datetime}
            like={post.likes}
            comment={post.comment_counts}
            postNo= {post.post_no}
            />)}
            
            <pack.PaginationWrap>
              <Pagination
                current={curPage}
                total={searchPost.totalCount}
                pageSize={PER_PAGE}
                onChange={paginationHandler}
              />
            </pack.PaginationWrap>
          </>
        )}
      </pack.Container>
    </Layout>
  );
};

export default Search;
