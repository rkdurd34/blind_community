import React, { useState,useEffect } from "react";
import { useCookies } from 'react-cookie';
import { Link, useHistory } from "react-router-dom";
import {shallowEqual, useSelector, useDispatch} from 'react-redux'
import board, * as authActions from '../store/modules/auth'

import Nav from '../components/Nav'
import Layout from '../components/Layout'
import Post from "../components/Post";
import Pagination from "../components/Pagination2";
import TypeButton from '../components/TypeButton'

import styled from "styled-components";
import pack from '../css/containers/mypage'
import api from '../utils/api';
import { Button } from 'antd';
import { remove } from 'js-cookie';


const MyPage = ({ location }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [cookies,setCookies,removeCookies] = useCookies();
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')

  //첫 번째 비밀번호 입력
  const [isSetFirst, setIsSetFirst] = useState(false);
  const setFirstPassword = () => {
    setIsSetFirst(true);
  };

  //pagination
  const PER_PAGE = 5;
  const [curPage, setCurPage] = useState(1);
  const [totalPage,setTotalPage] = useState(0);
  const paginationHandler = current => {
    console.log(current)
    setCurPage(current);
    dispatch(authActions.myPageSecondData(current-1,setTotalPage))
  };

  const {first,second,curType} = useSelector(({auth})=>({
    first:auth.myPage.first,
    second:auth.myPage.second,
    curType:auth.myPage.curType
  }),shallowEqual)
  useEffect(() => {
    dispatch(authActions.myPageFirstData())
  }, [])

  const handlePasswordEdit = () =>{
    api.customAPI(
      "post",
      '/auth/mypage',
      (data) => {setPassword('');alert('비밀번호가 성공적으로 변경 되었습니다.');},
      {data:{edit_type : "password",password }}
    )
  }
  const handleNicknameEdit = () => {
    api.customAPI(
      'post',
      '/auth/mypage',
      (data)=>{setNickname('');alert('닉네임이 성공적으로 변경 되었습니다');},
      {data:{edit_type : 'nickname', nickname}}
    )
  }
  const handleSignOut = () =>{
    api.customAPI(
      'delete',
      '/auth/signout',
      (data)=>{
        removeCookies('accessToken')
        history.push('/signin')
      },
      {}
    )
  }


  return (
    <Layout>
      
      <pack.Container>
        <Nav
          firstSubCategory={`내 정보 수정`}
          secondSubCategory={`내 활동 내역`}
          firstHandler={()=>dispatch(authActions.myPageFirstData())}
          secondHandler={()=>dispatch(authActions.myPageSecondData(curPage-1,setTotalPage))}
          curType={curType}
        />
        {curType === "first" ? (
          <pack.InfoContainer>
            <pack.User>{first.nickname}</pack.User>
            <pack.EmailContainer>
              <pack.EmailCaption>이메일</pack.EmailCaption>
              <pack.Email>{first.email}</pack.Email>
            </pack.EmailContainer>
            <pack.InputContainer>
              <pack.OneInput>
                <pack.InputCaption>닉네임</pack.InputCaption>
                <pack.Input 
                  placeholder={first.nickname}
                  value={nickname}
                  onChange={(e)=>setNickname(e.target.value)}
                 />                                                    
                <pack.EditBtn
                onClick={handleNicknameEdit}
                >변경</pack.EditBtn>
              </pack.OneInput>
              <pack.OneInput>
                <pack.InputCaption>비밀번호</pack.InputCaption>
                <pack.Input
                  placeholder={`변경하실 비밀번호를 입력해주세요`}
                  type={`password`}
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
                <pack.EditBtn
                  onClick={setFirstPassword}
                  disabled={isSetFirst ? true : false}
                >
                  변경
                </pack.EditBtn>
              </pack.OneInput>
              {isSetFirst ? (
                <pack.OneInput>
                  <pack.InputCaption>비밀번호 확인</pack.InputCaption>
                  <pack.Input
                    placeholder={`비밀번호를 한번 더 입력해주세요`}
                    type={`password`}
                    value={passwordCheck}
                    onChange ={(e)=>setPasswordCheck(e.target.value)}
                  />
                  <pack.EditBtn onClick={handlePasswordEdit}>변경</pack.EditBtn>
                </pack.OneInput>
              ) : null}
            </pack.InputContainer>
            <pack.SignOutSection>
              <Button onClick = {handleSignOut}>
                로그아웃
                </Button>
            </pack.SignOutSection>
          </pack.InfoContainer>
        ) : (
          <>
            <pack.SubTitle>내가 쓴 게시글</pack.SubTitle>
            {second.map(post=> 
            <Post
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
                total={totalPage}
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

export default MyPage;
