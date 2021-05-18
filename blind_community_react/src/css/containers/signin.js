import styled from 'styled-components';
const SignUpOuterContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  height: 100%;
  width: 100%;


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
  height:30%;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  
  div{
    width:100%;
    height:50%;
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
  height:10%;
  margin-top:1.4rem;
  button{
    width:100%;
    height:80%;
    display:flex;
    justify-content:center;
    align-items:center;
    /* padding:0.5rem 40%; */
    font-size:0.86rem;
    color:white;
    border-radius: 10px;
    background-color:#5C3EC2;
    
    
  }
`;



const pack = {
  SignUpInnerContainer, SignUpOuterContainer, Title, Button, Fields
};
export default pack;;