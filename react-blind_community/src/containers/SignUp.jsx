import React, { useCallback } from 'react';
import '../css/containers/signin.css';
import { useHistory } from "react-router-dom";

import AuthInput from '../components/AuthInput.js'
import pack from '../css/containers/signup'
import check from '../utils/RegCheck'
import { ArrowLeftOutlined } from '@ant-design/icons';
import {shallowEqual, useSelector, useDispatch} from 'react-redux'
import * as authActions from '../store/modules/auth'


export default function SignUp() {

    const dispatch = useDispatch()
    const history = useHistory()

    const {email, password, passwordCheck,nickname} = useSelector(({auth}) => ({
        email : auth.register.email,
        password: auth.register.password,
        passwordCheck: auth.register.passwordCheck,
        nickname: auth.register.nickname
    }),shallowEqual)
    
    const setEmail = useCallback((email)=> {
        dispatch(authActions.setRegEmail({email}))
    },[dispatch])

    const setPassword = useCallback((password)=> {
        dispatch(authActions.setRegPassword({password}))
    },[dispatch])

    const setPasswordCheck = useCallback((passwordCheck)=> {
        dispatch(authActions.setRegPasswordCheck({passwordCheck}))
    },[dispatch])
    const setNickname = useCallback((nickname)=> {
      dispatch(authActions.setRegNickname({nickname}))
  },[dispatch])

  // const fetchData = useCallback(() => {
  //   dispatch(eventActions.getEventForm(event_no));
  // }, [dispatch, event_no])

  // useEffect(()=>{
  //     fetchData();
  // },[fetchData])
  
  const handleSignUp = async (e) => {
      if (passwordCheck !== password){
        alert('비밀번호를 다시 확인해주십시오')
      }else if(!check.password(password,1)){
        alert('비밀번호 조건 맞추셈')
      }else if(!check.email(email)){
        alert('이메일 조건 맞추셈')
      }else if (email === '' || password ==='' || nickname === ""){
            alert('모든칸을 넣으셈')
      }else{
      history.push('/signup/address')
    }   
  };
  return (
    <pack.SignUpOuterContainer>
      <pack.SignUpGoBackIcon onClick={()=>history.push('/signin')}>
      
      <ArrowLeftOutlined />
      </pack.SignUpGoBackIcon>
      <pack.SignUpInnerContainer>        
          <pack.Title>
            <h1 className = "title">Montent</h1>
            <div className = "subTitle_1">
              방문해주셔서 감사합니다
            </div>
          <div className = "subTitle_2">
          간단한 정보를 입력하신 후 저희 Montent에서 소통해보세요
            </div>
          </pack.Title>
          <pack.Fields>
            <AuthInput 
              type= "이메일" 
              changeHandler={setEmail} 
              placeholder="이메일을 계정을 입력하세요"/>
            <AuthInput 
              type= "비밀번호" 
              inputType = "password"
              changeHandler={setPassword} 
              placeholder="비밀번호를 입력하세요"/>
            <AuthInput 
              type= "비밀번호 확인" 
              inputType = "password"
              changeHandler={setPasswordCheck} 
              placeholder="비밀번호를 다시 한번 입력하세요"/>
            <AuthInput 
              type= "닉네임" 
              changeHandler={setNickname} 
              eventHandler={handleSignUp} 
              placeholder="닉네임을 입력하세요"/>
          </pack.Fields>
          <pack.Button>
            <button  onClick={handleSignUp } >다음</button>
          </pack.Button>
          
        
        {/* <Modal
          title={"테스트"}
          subtitle={"서브타이틀 테스트"}
          open={openModal}
          onClose={() => setOpenModal(!openModal)}
        ><DaumPostcode 
        style={{marginTop:"40px",height:"500px"}}  
        onComplete={handleComplete}
        />
        </Modal> */}
        
        

        
      </pack.SignUpInnerContainer>
    </pack.SignUpOuterContainer>
    
    
  )}
