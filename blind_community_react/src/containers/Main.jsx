import React,{useEffect} from 'react'
import { useCookies } from 'react-cookie';
import { useHistory,Link } from "react-router-dom";
import api from '../utils/api'
export default function Main() {
    const history = useHistory()
    const [cookies,setCookies,removeCookies] = useCookies();
    console.log(cookies)
    const handleSignOut = async()=>{
        if (cookies.accessToken) { 
            try{
                await api.signout()
                removeCookies('accessToken')    
                history.push('/signin')


            }catch(e){
                alert('에러발생')
            }
            
        }else{
            alert('이미 로그아웃되었습니다')
        }
                                                                             
    }
    const handleSignIn = ()=>{
        (cookies.accessToken) ? alert('이미 로그인 되어있습니다') : history.push('/signin')
    }
    useEffect(() => {
        return
    }, [])
    
    return (
        <div>
            <p>메인 화면</p>
            <Link to="/test">테스트 화면</Link><br/>
            <button id={"enterButton"} className={''}   onClick={handleSignIn}>로그인</button>
            <button id={"enterButton"} className={''}  onClick={handleSignOut} >로그아웃</button>

        </div>
    )
}
