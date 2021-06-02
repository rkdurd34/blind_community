import React, { useState,useCallback, useEffect } from 'react';
// import api from '../../api'
import { useHistory } from "react-router-dom";

import pack from '../css/containers/signup2'
import api from '../utils/api'

// import DaumPostcode from "react-daum-postcode";
// import Modal from '../components/Modal'
import SelectDropDown from '../components/SelectDropDown'
import { ArrowLeftOutlined } from '@ant-design/icons';
// import back from "../assets/svgs/back.svg";

import {shallowEqual, useSelector, useDispatch} from 'react-redux'
import * as authActions from '../store/modules/auth'
// import * as loadingActions from '../store/modules/loading';
import FileUploader from '../components/FileUploader';



export default function SignUp2() {

    const dispatch = useDispatch()
    const history = useHistory()
    const [workKindList,setWorkKindList] = useState([])
    const [bg1List, setBg1List] = useState([])
    const [bg2List, setBg2List] = useState([])
    const [bg3List, setBg3List] = useState([])
    // console.log(image)

    const {email,password,passwordCheck,nickname,workKind, bg1, bg2, bg3, image} = useSelector(({auth,loading}) => ({
        email : auth.register.email,
        password: auth.register.password,
        passwordCheck: auth.register.passwordCheck,
        nickname: auth.register.nickname,
        workKind : auth.register.workKind,
        bg1: auth.register.bg1,
        bg2: auth.register.bg2,
        bg3: auth.register.bg3,
        image: auth.register.image,
        isLoading: loading.isLoading

    }),shallowEqual)
    const setRegWorkKind = useCallback((workKind)=> {
        dispatch(authActions.setRegWorkKind({workKind}))
    },[dispatch])

    const setRegBg1 = useCallback((bg1)=> {
        dispatch(authActions.setRegBg1({bg1}))
    },[dispatch])

    const setRegBg2 = useCallback((bg2)=> {
      dispatch(authActions.setRegBg2({bg2}))
    },[dispatch])

    const setRegBg3 = useCallback((bg3)=> {
      dispatch(authActions.setRegBg3({bg3}))
    },[dispatch])

    const setImage = useCallback((image)=> {
      dispatch(authActions.setRegImage({image}))
    },[dispatch])

    // const setLoading = useCallback((bool)=> {
    //   dispatch(loadingActions.setLoading({bool}))
    // },[dispatch])

  useEffect(() => {
      // setLoading(true)
      api.typeDataFirst(({data})=>{
        setWorkKindList(data[0])
        setBg1List(data[1])
      })
      // setLoading(false)
    }, [])
  const handleSignUp = async (e) => {
    if (image.length < 1 || bg1.length < 1 ||bg2.length <1 || bg3.length < 1 ) alert('모든칸을 채워주세요')
    else{const formData = new FormData();
    formData.append('email',email )
    formData.append('password',password )
    formData.append('nickname',nickname )
    formData.append('sector_no',workKind)
    formData.append('image',image )
    formData.append('bg1', bg1);
    formData.append('bg2', bg2);
    formData.append('bg3', bg3);
    api.signup(formData,()=>{
      alert("회원가입 완료")
      history.push('/signin')
    })}
  };
  const handleFirstTypeData = async(bg1) =>{
    api.typeDataSecond(bg1, ({data})=>{
      setBg2List(data) 
      setRegBg1(bg1)
    })
  }
  const handleSecondTypeData = async(bg2) =>{
    api.typeDataThird(bg2, ({data})=>{
      setBg3List(data)
      setRegBg2(bg2)
    })
  }

if(email.length < 1 || password.length < 1) history.push('/signin')

  // const handleComplete = (data) => {
  //   console.log(data)
  //   let fullAddress = data.address;
  //   let extraAddress = ''; 
    
  //   if (data.addressType === 'R') {
  //     if (data.bname !== '') {
  //       extraAddress += data.bname;
  //     }
  //     if (data.buildingName !== '') {
  //       extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
  //     }
  //     fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
  //   }
  //   setOpenModal(false)
  //   console.log(fullAddress);  // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  // }
  // console.log('ㅁㄴㅇㅁㄴㅇㅁㄴ',isLoading)
  // if (isLoading) {
  //   return "로딩중"
    
  // }else{
  if(email==="" || password ==="" ||passwordCheck===""|| nickname ==="") {
    alert('이전페이지로 돌아가서 다시 해주세요')
    history.push('/signup')
  }
  return (
      
    <pack.SignUpOuterContainer>
      <pack.SignUpGoBackIcon onClick={()=>history.push('/signin')}>
      <ArrowLeftOutlined />
      
      </pack.SignUpGoBackIcon>
      <pack.SignUpInnerContainer>        
          <pack.Title>
            <h1 className = "title">Montent</h1>
            <div className = "subTitle_1">
              추가정보 선택, 사업자 등록증 사진을 추가하신 후 회원강비 요청을 해주세요! <br/>
              사업자 인증이 완료된 후 이용가능합니다  
            </div>
          <div className = "subTitle_2">
            사업자 인증은 Montent 관리자에의해 이루어지는점 양해부탑드립니다
            </div>
          </pack.Title>
          <pack.WorkKind>
            <pack.Heading>업종 선택</pack.Heading>
              <SelectDropDown 
                className = "work_kind"
                data ={workKindList}
                onChange={setRegWorkKind}
                />
          </pack.WorkKind>
          <pack.Region>
            <pack.Heading>지역 선택</pack.Heading>
            <div className="regionText">영업장이 위치하는 지역을 선택해주세요</div>
            <SelectDropDown 
                className = "bg-1"
                data ={bg1List}
                onChange={(bg1)=>handleFirstTypeData(bg1)}
                />
            <SelectDropDown 
                className = "bg-2"
                data ={bg2List}
                onChange={(bg2)=>handleSecondTypeData(bg2)}
                />
            <SelectDropDown 
                className = "bg-3"
                data ={bg3List}
                onChange={setRegBg3}
                />
          </pack.Region>
          <pack.Picture>
            <FileUploader fileChangeHandler = { (e)=>  setImage(e.target.files[0])} fileName={image}/>
          </pack.Picture>
          <pack.Button>
            <button id={"enterButton"} className={'submitButton'} type="submit" onClick={handleSignUp} >회원가입</button>
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
      