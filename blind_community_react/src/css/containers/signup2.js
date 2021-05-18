import styled from 'styled-components';
const SignUpOuterContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  height: 100%;
  width: 100%;


`;
const SignUpGoBackIcon = styled.div`
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:10%;
  font-size:1.5rem;
  display:flex;
  justify-content:flex-start;
  align-items:center;
  padding-left:1rem;
`;
const SignUpInnerContainer = styled.div`
  width: 80%;
  height:70%;
  display:flex;
  flex-wrap:wrap;
  
`;




const Title = styled.div`
  width:100%;
  height:30%;  
  .title{
    font-size:3rem;
    margin:0;
    height:40%;
  }
  .subTitle_1 {
    font-size:0.8rem;
    height:40%;
    font-weight:600;
  }
  .subTitle_2{
    height:20%;
    font-size: 0.001em;
  }
`;
const WorkKind = styled.div`
  width:100%;
  height:17.5%;
  display:flex;
  flex-wrap:wrap;
  .work_kind{
    width:100%;
    height:40%;
  }
  .work_kind .ant-select-selector{
    width:100%;
    /* padding:1rem; */
    height:100%;
  
  }
`;
const Region = styled.div`
  width:100%;
  height:17.5%;
  display:flex;
  flex-wrap:wrap;
  .regionText{
    width:60%;
    height:40%;
    font-size:0.5rem;
    display:flex;
    justify-content:flex-end;
    align-items:flex-end;
  }
  .bg-1, .bg-2{
    width:33.3%;
    height:40%;
  }
  .bg-3{
    width:33.3%;
    height:40%;
  }
  .bg-1 .ant-select-selector,.bg-2 .ant-select-selector,.bg-3 .ant-select-selector {
    height:100%;
    width:100%;

  }
`;
const Picture = styled.div`
  width:100%;
  height:17.5%;
  display:flex;
  justify-content:center;
  align-items:center;
  div{
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;
    height:100%;
    .input-file-button{
      width:100%;
      height:40%;
      display:flex;
      justify-content:center;
      align-items:center;
      /* padding:0.5rem 40%; */
      font-size:0.75rem;
      border-radius: 5px;
      border:1.5px solid #DEDEDF;
      cursor: pointer;
      font-weight: bold;
  }
}
`;
const Button = styled.div`
  width:100%;
  height:17.5%;
  button{
    width:100%;
    height:40%;
    display:flex;
    justify-content:center;
    align-items:center;
    /* padding:0.5rem 40%; */
    font-size:0.75rem;
    color:white;
    border-radius: 5px;
    background-color:#5C3EC2;
    
    
  }
`;
const Heading = styled.div`
  
  width:40%;
  height:40%;
  display:flex;
  justify-content:flex-start;
  align-items:flex-end;
`;

const pack = {
  SignUpGoBackIcon, SignUpInnerContainer, SignUpOuterContainer, WorkKind, Region, Heading, Title, Picture, Button
};
export default pack;