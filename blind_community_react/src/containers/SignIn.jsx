import React, { useState,useCallback } from 'react';
// import api from '../../api'
import '../css/container/signin.css';
import { useHistory } from "react-router-dom";
import api from '../utils/api'

import {shallowEqual, useSelector, useDispatch} from 'react-redux'
import auth, * as authActions from '../store/modules/auth'


export default function SignIn() {
   const dispatch = useDispatch()
   const history = useHistory()
  
   const {email, password} = useSelector(({auth}) => ({
    email : auth.login.email,
    password: auth.login.password,
  }))
  
  const setEmail = useCallback((email)=> {
    dispatch(authActions.setEmail({email}))
  },dispatch)

  const setPassword = useCallback((password)=> {
    dispatch(authActions.setPassword({password}))
  },dispatch)


  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [room, setRoom] = useState('');
  
  
  
  

  const handleLogin = async (e) => {
      const result = api.signin({email,password},()=>{
        history.push('/')
  })};
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">로그인</h1>
        <div>
          <input placeholder="Email" className="joinInput" type="text" onChange={(event) => setEmail(event.target.value)} />
        </div>
        <div>
          <input placeholder="Password" className="joinInput" type="password" onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        
        <button id={"enterButton"} className={'button mt-20'} type="submit" onClick={e => (!email|| !password) ? e.preventDefault() : handleLogin()} >로그인</button>
        <button id={"enterButton"} className={'button mt-20'} type="submit" onClick={()=>history.push(`/signup`)} >회원가입</button>
      </div>
    </div>
  );
}