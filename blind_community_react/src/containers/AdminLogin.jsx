import React,{useState} from 'react'
import { Form, Input, Checkbox, Button } from 'antd'
import { MailOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons'
import api from '../utils/api';

const imagesPath = process.env.PUBLIC_URL + `/images`

const AdminLogin = ({ history }) => {


    const handleLogin = (value) =>{
        api.customAPI(
            `post`,
            `/admin/login`,
            (data)=> history.push('/admin'),
            {data:value}
        )
        // history.replace(`/`)
    }
    return (
        <div style={{
            width: `100vw`,
            height: `100vh`,

            background: `linear-gradient(-135deg,#c850c0,#4158d0)`,
        }}>
            <div style={{
                margin: `0 auto`,
                width: `100%`,
                maxWidth: `1280px`,
                height: `100%`,

                display: `flex`,
                flexDirection: `row`,
                alignItems: `center`,
                justifyContent: `center`,
                padding: `4.5rem`,
            }}>
                <div style={{
                    width: `100%`,
                    height: `100%`,
                    backgroundColor: `RGBA(255,255,255,0.65)`,
                    borderRadius: `0.8rem`,
                    display: `flex`,
                    flexDirection: `row`,
                    alignItems: `start`,
                    justifyContent: `start`,
                }}>
                    <div style={{
                        flex: 1,
                        display: `flex`,
                        flexDirection: `row`,
                        alignItems: `center`,
                        justifyContent: `center`,
                        width: `100%`,
                        height: `100%`,
                    }}>
                        <img style={{ width: `55%` }} src={imagesPath + `/login.png`} alt={`로그인 화면 이미지`} />
                    </div>
                    <div style={{
                        flex: 1,
                        display: `flex`,
                        flexDirection: `column`,
                        alignItems: `center`,
                        justifyContent: `center`,
                        width: `100%`,
                        height: `100%`,
                    }}>
                        <h2
                            style={{
                                fontSize: `1.8rem`,
                                fontWeight: `bold`,
                                color: `RGBA(0,0,0,0.7)`,
                                padding: `1.5rem 0`
                            }}
                        >
                            Sales Member Login
                        </h2>
                        <Form
                            size={`large`}
                            style={{ width: `80%` }}
                            wrapperCol={{ span: 24 }}
                            name="basic"
                            initialValues={{
                                email: ``,
                                password: ``,
                                isStayLogin: false,
                            }}
                            onFinish={(value) => {
                                handleLogin(value)
                                
                            }}
                            onFinishFailed={() => {}}
                        >
                            <Form.Item
                                style={{ padding: `0.2rem 0` }}
                                name="email"
                                rules={[ { required: true, message: '이메일을 정확하게 입력하세요.' } ]}
                            >
                                <Input
                                    style={{ borderRadius: `1.5rem`, padding: `0.5rem 1.25rem` }}
                                    prefix={<MailOutlined />}
                                    type={`email`}
                                    placeholder={`example@email.com`}
                                />
                            </Form.Item>
                            <Form.Item
                                style={{ padding: `0.2rem 0` }}
                                name="password"
                                rules={[ { required: true, message: '비밀번호를 정확하게 입력하세요.' } ]}
                            >
                                <Input.Password
                                    style={{ borderRadius: `1.5rem`, padding: `0.5rem 1.25rem` }}
                                    prefix={<LockOutlined />}
                                    placeholder={`Password`}
                                    
                                />
                            </Form.Item>
                            <Form.Item
                                wrapperCol={{ span: 24 }}
                                name="isStayLogin"
                                valuePropName="checked">
                                <Checkbox>로그인 상태 유지</Checkbox>
                            </Form.Item>
                            <Form.Item
                                style={{ padding: `0.6rem 0` }}
                                wrapperCol={{ span: 24 }}
                            >
                                <Button
                                    style={{ width: `100%`, padding: `0.5rem 1.25rem` }}
                                    type="primary"
                                    shape="round"
                                    icon={<LoginOutlined />}
                                    htmlType="submit"
                                    // onClick=
                                >
                                    Login
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin
