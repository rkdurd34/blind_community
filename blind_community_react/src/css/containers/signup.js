import styled from 'styled-components';
const SignUpOuterContainer = styled.div`
  display: flex;
  flex-direction:column;
  justify-content: flex-start;
  text-align: center;
  align-items: center;
  height: 812px ;
  width: 375px;


`;
const SignUpGoBackIcon = styled.div`
  /* position:absolute;
  top:0;
  left:0; */
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
  height:80%;
  display:flex;
  flex-direction:column;
  flex-wrap:wrap;
  
`;
const Title = styled.div`
  width:100%;
  height:20%;  
  .title{
    font-size:3rem;
    margin:0;
    height:40%;
  }
  .subTitle_1 {
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: flex-end;
    font-size:1rem;
    height:30%;
    font-weight:600;
  }
  .subTitle_2{
    height:20%;
    font-size: 0.001em;
  }
`;
const Fields = styled.div`
  width:100%;
  height:60%;
  display:flex;
  flex-wrap:wrap;
  div{
    width:100%;
    height:25%;
  }
  label{
    width:100%;
    height:30%;
    display:flex;
    justify-content:flex-start;
    align-items:center;
    
  }
  input{
    width:100%;
    height:55%;
    border:1.5px solid #DEDEDF;
    border-radius: 10px;
    padding-left: 1rem;
  }
`;
const Button = styled.div`
  width:100%;
  height:20%;
  padding-top:1.5rem;
  button{
    width:100%;
    height:45%;
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



const pack = {
  SignUpGoBackIcon, SignUpInnerContainer, SignUpOuterContainer, Title, Button, Fields
};
export default pack;;