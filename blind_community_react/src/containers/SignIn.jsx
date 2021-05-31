import React, { useState,useCallback } from 'react';
// import api from '../../api'
import '../css/containers/signin.css';
import { useHistory } from "react-router-dom";
import api from '../utils/api'
import AuthInput from '../components/AuthInput.js'
import pack from '../css/containers/signin'
import {shallowEqual, useSelector, useDispatch} from 'react-redux'
import * as authActions from '../store/modules/auth'


export default function SignIn() {
   const dispatch = useDispatch()
   const history = useHistory()
   
  
   const {email, password,test} = useSelector(({auth}) => ({
    email : auth.login.email,
    password: auth.login.password,
  }))

  
  const setEmail = useCallback((email)=> {
    dispatch(authActions.setEmail({email}))
  },[dispatch])

  const setPassword = useCallback((password)=> {
    dispatch(authActions.setPassword({password}))
  },[dispatch])
  

  const handleLogin = async (e) => {
      api.signin({email,password},()=>{
        history.push('/')
  })};
  return (
    <pack.SignUpOuterContainer>
      <pack.SignUpInnerContainer>        
          <pack.Title>
            <h1 className = "title">Montent</h1>
            
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
              placeholder="비밀번호를 입력하세요"
              eventHandler={handleLogin}/>
            
          </pack.Fields>
          <pack.Button>
            <button  onClick={handleLogin} >로그인</button>
          </pack.Button>
          <pack.Button>
            <button  onClick={()=> history.push('/signup')} >회원가입</button>
          </pack.Button>
        
      </pack.SignUpInnerContainer>
    </pack.SignUpOuterContainer>
  )   
}