import styled from "styled-components";

const Container = styled.div`
  /* background: #f8f9fa; */
  /* padding-bottom: 100px; */
`;

//내 정보 수정
const User = styled.div`
  font-size: 16px;
  color: #5c3ec2;
  padding: 30px 0;
  text-align: center;
`;

const InfoContainer = styled.div`
  padding-top: 10px;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 2px solid #fff;
`;

const EmailContainer = styled.div`
  width: 315px;
`;

const EmailCaption = styled.span`
  font-weight: bold;
  text-align: left;
  padding: 10px 5px;
  padding-right: 20px;
`;

const Email = styled.span``;

const InputContainer = styled.div`
  margin-top: 20px;
`;

const OneInput = styled.div`
  margin-top: 10px;
  width: 315px;
`;

const Input = styled.input`
  width: 265px;
  height: 45px;
  font-size: 13px;
  padding: 0 14px;
  border: 2px solid #dededf;
  border-right: none;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`;

const InputCaption = styled.div`
  font-weight: bold;
  text-align: left;
  padding: 10px 5px;
`;

const EditBtn = styled.button`
  width: 50px;
  height: 45px;
  color: #fff;
  background: #5c3ec2;
  border: #5c3ec2;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  outline: none;
  cursor: pointer;
  opacity: ${props => (props.disabled ? 0.5 : null)};
`;

//내 활동 내역
const SubTitle = styled.div`
  padding: 12px;
  font-size: 15px;
  font-weight: bold;
  background: #f8f9fa;
  border-top: 2px solid #fff;
  border-bottom: 2px solid #fff;
`;

const PaginationWrap = styled.div`
  text-align: center;
  padding: 10px 0;
  padding: 0.625rem 0;
`;
const SignOutSection = styled.div`
    width:100%;
    height:10rem;
    display:flex;
    justify-content:center;
    align-items:center;
    .ant-btn:hover{
      color: #5C3EC2 ;
      border-color: #5C3EC2 ;
      
    }
    button{
      width:10rem;
      height:3rem;
      font-size:1rem;
      font-weight:bold
    }
`;

const pack = {
  Container,
  User,
  InfoContainer,
  EmailContainer,
  EmailCaption,
  Email,
  Input,
  InputCaption,
  InputContainer,
  OneInput,
  EditBtn,
  SubTitle,
  PaginationWrap,
  SignOutSection
};
export default pack;