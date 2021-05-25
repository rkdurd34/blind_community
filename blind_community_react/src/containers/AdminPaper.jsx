import React,{useState,useEffect,useCallback} from 'react'
import { Table,Button } from 'antd';
import Layout from '../components/AdminLayout'
import pack from '../css/containers/adminpaper'
import Modal from '../components/Modal';
import {List,Avatar,Col,Card,Row,Radio} from 'antd'
import api from '../utils/api';
import * as adminActions from '../store/modules/admin'
import {shallowEqual, useSelector, useDispatch} from 'react-redux'
const AdminPaper = ({ history, auth, title }) => {
    const dispatch = useDispatch()
    const [openModal,setOpenModal] = useState(false)
    const [userDetail, setUserDetail] = useState({
        email:"등록X",
        nickname:"등록X",
        sector:"등록X",
        region:"등록X",
        is_valid:"등록X"
    })

    const setUserData = useCallback((users)=>{
        dispatch(adminActions.setUserData({users}))
    },[dispatch])
    const {users} = useSelector(({admin})=>({
        users: admin.users,
    }),shallowEqual)
    const handleSetOpenModal = useCallback((data) =>{
        setUserDetail(users.filter(user => user.user_no === data.user_no )[0])
        setOpenModal(true)

    },[userDetail,users])
    const handleEditButton = useCallback(()=>{
        api.customAPI(
            `post`,
            `/admin/paper/check`,
            (data)=>{
                console.log(data); 
                history.push('/admin/paper')
                setOpenModal(false)
            },
            {data:{user_no:userDetail.user_no, is_valid:userDetail.is_valid === "O" ? 1 :0}}
        )
    },[userDetail])
    useEffect(() => {
        api.customAPI(
            `get`,
            `/admin/paper/user`,
            (data)=> {
                setUserData(data.map(user => ({...user, is_valid:user.is_valid === 0 ? "X" : "O"})))
                console.log(data)
            },
            {}
        )
        return 
    }, [openModal])
    console.log(userDetail)
    return (
        <>
        <Layout history={history} auth={auth} title={title}>
            <pack.Container>
            <Table
            columns={[
                {
                    title: '',
                    dataIndex: '',
                    key: 'x',
                    render: (data) =>  <Button type="primary" onClick={() => handleSetOpenModal(data)}>자세히보기</Button>,
                  },
                { title: '이메일', dataIndex: 'email', key: 'email' },
                
                { title: '닉네임', dataIndex: 'nickname', key: 'nickname' },
                { title: '확인여부', dataIndex: 'is_valid', key: 'is_valid' },
                { title: '업종', dataIndex: 'sector', key: 'sector' },
                { title: '지역', dataIndex: 'region', key: 'region' },
                
                
              ]}
            dataSource={users}
            scroll={{  x: 1000,y: 600 }}
              />
              </pack.Container>
        
        </Layout>
     <Modal
     title={"사업자등록증 관리"}
     subtitle={"이미지"}
     open={openModal}
     onClose={()=> setOpenModal(false)}
     >
         <pack.ModalContainer>
              <div className="image-container">
                  <img src ={`http://localhost:5000/${userDetail.image_url}`} />
              </div>
              <div className="list-container">
                <div className="site-card-wrapper">
                <Row gutter={[32,16]}>
                    <Col span={8}>
                        <Card title="이메일" bordered={false}>
                        {userDetail.email}
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="닉네임" bordered={false}>
                        {userDetail.nickname}
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="업종" bordered={false}>
                        {userDetail.sector}
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="지역" bordered={false}>
                        {userDetail.region}
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="확인여부" bordered={false}>
                        {userDetail.is_valid}
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="설정" bordered={false}>
                        <Radio.Group onChange={(e)=>{
                            console.log(userDetail)
                            setUserDetail({...userDetail, is_valid:e.target.value})
                            }} value={userDetail.is_valid}>
                            <Radio value={"O"}>확인</Radio>
                            <Radio value={"X"}>취소</Radio>
                  
                        </Radio.Group>
                        </Card>
                    </Col>
                    </Row>
                </div>
              </div>
              <div className='button-section'>
                  <Button onClick={handleEditButton}>수정완료</Button>
              </div>
         </pack.ModalContainer>
     </Modal>
     </>   
    )
}

export default AdminPaper





// let data = [
//     {
//       key: 1,
//       email: 'rkdrud34@nate.com',
//       nickname: 32123123123123123,
//       sector: '요식업',
//       region: '서울특별시 중구 종로동',
//       check : "O"
//     },
//     {
//         key: 1,
//         email: 'rkdrud34@nate.com',
//         nickname: 32123123123123123,
//         sector: '요식업',
//         region: '서울특별시 중구 종로동',
//         check : "X"
//       },
//       {
//         key: 1,
//         email: 'rkdrud34@nate.com',
//         nickname: 32123123123123123,
//         sector: '요식업',
//         region: '서울특별시 중구 종로동',
//         check : "O"
//       },
//       {
//           key: 1,
//           email: 'rkdrud34@nate.com',
//           nickname: 32123123123123123,
//           sector: '요식업',
//           region: '서울특별시 중구 종로동',
//           check : "X"
//         },
//         {
//             key: 1,
//             email: 'rkdrud34@nate.com',
//             nickname: 32123123123123123,
//             sector: '요식업',
//             region: '서울특별시 중구 종로동',
//             check : "O"
//           },
//           {
//               key: 1,
//               email: 'rkdrud34@nate.com',
//               nickname: 32123123123123123,
//               sector: '요식업',
//               region: '서울특별시 중구 종로동',
//               check : "X"
//             },
//   ];