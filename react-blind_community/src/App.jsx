import React, {Suspense,lazy} from 'react'
import './App.css';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// import "antd/dist/antd.css";


// import Main from './containers/Main'
// import Test from './containers/Test'
// import SignIn from './containers/SignIn';
// import SignUp from './containers/SignUp';
// import SignUp2 from './containers/SignUp2';
// import NotFound from './containers/NotFound.jsx';
// import BoardAll from './containers/BoardAll'
// import PostDetail from './containers/PostDetail'
// import CreatePost from './containers/CreatePost'
// import MyPage from './containers/MyPage'
// import Search from './containers/Search'

import Loading from './components/Loading'
import AuthRoute from './routes/authRoute';
import PublicRoute from './routes/publicRoute';
import AdminPublic from './routes/adminPuiblic';
import AdminPrivate from './routes/adminPrivate';



const BestPost = lazy(()=>import('./containers/BestPost'))
const Main = lazy(()=> import('./containers/Main'))
// const Test=  lazy(()=>import('./containers/Test'))
const SignIn = lazy(()=>import('./containers/SignIn'))
const SignUp = lazy(()=>import('./containers/SignUp'))
const SignUp2 = lazy(()=>import('./containers/SignUp2'))
const BoardAll = lazy(()=>import('./containers/BoardAll'))
const NotFound = lazy(()=>import('./containers/NotFound'))
const PostDetail = lazy(()=>import('./containers/PostDetail'))
const CreatePost = lazy(()=>import('./containers/CreatePost'))
const MyPage = lazy(()=>import('./containers/MyPage'))
const Search =  lazy(()=>import('./containers/Search'))
const PostEdit = lazy(()=> import('./containers/PostEdit'))
const Comments = lazy(()=>import('./components/Comments'))

const AdminLogin = lazy(()=>import('./containers/AdminLogin'))
const AdminMain  = lazy(()=>import('./containers/AdminMain'))
const AdminPaper = lazy(()=>import('./containers/AdminPaper'))
// const AdminCategory = lazy(()=> import ('./containers/AdminCategory'))




function App() {
  
  return (
    <>
    <Router>
      <Suspense fallback = {<div>       <Loading /></div>}>
      <Switch>
        <PublicRoute path='/signin' exact component={SignIn} />
        <PublicRoute path='/signup' exact component={SignUp} />
        <PublicRoute path='/signup/address' exact component={SignUp2} />
        
        <AuthRoute exact path='/' component = {Main}/>
        <AuthRoute exact path='/board/all' component = {BoardAll}/>
        <AuthRoute exact path='/board/detail/:no' component = {PostDetail}/>
        <AuthRoute exact path='/board/best' component = {BestPost}/>
        <AuthRoute exact path='/board/create' component = {CreatePost}/>
        <AuthRoute exact path='/mypage' component = {MyPage}/>
        <AuthRoute exact path='/search' component = {Search}/>
        <AuthRoute exact path='/board/edit/:no' component = {PostEdit}/>

        <AuthRoute exact path='/test' component ={Comments}/> 
        
        <AdminPublic exact path = '/admin/signin' component={AdminLogin} />
        <AdminPrivate exact path = '/admin' render={(props)=><AdminMain title = {'MONTENT 관리자 페이지'}{...props}/>}/>
        <AdminPrivate exact path = '/admin/paper' render={(props)=><AdminPaper title = {'사업자등록증 관리'}{...props}/>}/>
        {/* <AdminPrivate exact path = '/admin/category' render={(props)=><AdminCategory title = {'카테고리 추가'}{...props}/>}/> */}
        {/* <Route exact path='/test' render={(props) => <TestPage auth={0} title={`테스트화면`} {...props} />} /> */}
        <Route component = {NotFound}/>
      </Switch>
      </Suspense>
    </Router>
    {/* <Footer/> */}
    </>
  );
}

export default App;
