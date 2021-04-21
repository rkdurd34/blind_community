import React, { useState,useCallback } from 'react';
// import api from '../../api'
import '../css/container/signin.css';
import { useHistory } from "react-router-dom";
import api from '../utils/api'

import {shallowEqual, useSelector, useDispatch} from 'react-redux'
import * as authActions from '../store/modules/auth'

export default function SignUp() {

    const dispatch = useDispatch()
    const history = useHistory()

    const {email, password, passwordCheck} = useSelector(({auth}) => ({
        email : auth.register.email,
        password: auth.register.password,
        passwordCheck: auth.register.passwordCheck
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

  

  const handleSignUp = async (e) => {
      const result = api.signup({email,password},()=>{
        alert('회원가입 완료')
        history.push('/')
  })};
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">회원가입</h1>
        <div>
          <input placeholder="Email" className="joinInput" type="text" onChange={(event) => setEmail(event.target.value)} />
        </div>
        <div>
          <input placeholder="Password" className="joinInput" type="password" onChange={(event) => setPassword(event.target.value)}/>
        <div/>
        <div>
          <input placeholder="Password" className="joinInput" type="password" onChange={(event) => setPasswordCheck(event.target.value)}/>
        </div>
        
        <button id={"enterButton"} className={'button mt-20'} type="submit" onClick={handleSignUp} >회원가입</button>
        
      </div>
    </div>
    </div>
  )}
