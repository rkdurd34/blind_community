import styled from 'styled-components';
import { Link } from "react-router-dom";


const Container = styled.div`
  background: #f8f9fa;
  padding: 10px;
  margin-bottom: 60px;
`;

const Post = styled.div``;

const CurType = styled.div`
  width:100%;
  display:flex;
  flex-wrap:wrap;
  justify-content:space-between;
  font-size: 12px;
  font-weight: bold;
  color: #5c3ec2;
  .postEdit span{
    margin:0.5rem;
    color:black;
    span{
      color:black;
    }
  }
`;

const PostTitle = styled.div`
  padding: 12.5px 0;
  font-size: 15px;
  font-weight: bold;
  line-height: 18px;
`;

const ABDContainer = styled.div`
  padding-bottom: 10px;
`;

const Author = styled.span`
  font-size: 11px;
`;

const Bar = styled.span`
  font-size: 11px;
  padding: 0 10px;
`;

const Date = styled.span`
  font-size: 11px;
`;

const Content = styled.div`
  font-size: 14px;
  padding: 20px 0;
  line-height: 18px;
  border-top: 2px solid #fff;
`;

const CommuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items:center;
  height: 40px;
  font-size: 11px;
  padding: 15px 0;
  padding-right: 5px;
`;

const CommuRight = styled.span`
  align-self: center;
  color: #5c3ec2;
`;

const Views = styled.span``;

const Likes = styled.span`
  padding: 0 10px;
`;

const Comments = styled.span``;



const CommentContainer = styled.div``;

const CommentCnt = styled.div`
  font-size: 13px;
  font-weight: bold;
  border-top: 2px solid #fff;
  padding: 10px 0;
`;

const MoreWrap = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10px;
  margin-bottom: 60px;
  button{
    width: 90%;
  height: 45px;
  border: 2px solid #dededf;
  border-radius: 4px;
  font-size: 13px;
  font-weight: bold;
  color: #212529;
  background: #fff;
  margin: 0 auto;
  outline: none;
  cursor: pointer;
  }
`;

const More = styled.button`
  /* width: 290px; */
  width: 90%;
  height: 45px;
  border: 2px solid #dededf;
  border-radius: 4px;
  font-size: 13px;
  font-weight: bold;
  color: #212529;
  background: #fff;
  margin: 0 auto;
  outline: none;
  cursor: pointer;
`;

const InputContainer = styled.div`
  width: 100%;
  height:8%;
  margin-bottom: 2px;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
`;

const InputWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 960px;
  height:100%;
  margin: 0 auto;
  border: 2px solid #ebebeb;
  box-shadow: 1px 1px 1px 1px gray;
`;

const Input = styled.input`
  width: 85%;
  height: 45px;
  font-size: 12px;
  padding: 25px;
  border: none;
  outline: none;
  background: #f8f9fa;
`;

const InputBtn = styled.button`
padding:0;
  width: 15%;
  height: 100%;
  border: none;
  cursor: pointer;
  outline: none;
  background: #fff;
  font-weight: bold;
  z-index:100;
  img{
    width:30%;
  }
`;
const LikeBtn = styled.div`
  button{
  display:flex;
  justify-content:center;
  align-items:center;
  width: 65px;
  height: 26px;
  color: ${(props) => props.clicked ? `#fff` : `#5c3ec2`} !important;
  /* font-weight: bold; */
  background: ${(props) => props.clicked ? `#5c3ec2` : `#fff`} !important;
  border: 1px solid #5c3ec2;
  font-size:0.8rem;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  .anticon-heart{
    font-size:0.7rem;
  }
  }
  
`;
// const LikeBtn = styled.button`
//   align-self: center;
//   width: 65px;
//   height: 26px;
//   color: ${(props) => props.clicked ? `#fff` : `#5c3ec2`};
//   font-weight: bold;
//   background: ${(props) => props.clicked ? `#5c3ec2` : `#fff`};
//   border: 1px solid #5c3ec2;
//   border-radius: 4px;
//   outline: none;
//   cursor: pointer;
// `;
const SVG = styled.span`
  padding: 3px;
  svg{
    /* color: ${(props) => props.clicked ? `#fff` : `#5c3ec2`}; */
    color: red
  }
  
`;

const Edit = styled(Link)`
  color: #5c3ec2;
`;


const pack = {
  Container,
  Comments,
  LikeBtn,
  Post,
  CurType,
  PostTitle,
  ABDContainer,
  Author,
  Bar,
  Date,
  Content,
  CommuContainer,
  CommuRight,
  Views,
  Likes,
  CommentContainer,
  CommentCnt,
  MoreWrap,
  More,
  InputContainer,
  InputWrap,
  Input,
  InputBtn,
  SVG,
  Edit
};
export default pack;