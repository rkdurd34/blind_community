import styled from 'styled-components';
const Wrapper = styled.div`
width:100vw;
height:100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

`;
const Container = styled.div`
  display: flex;
  height: max-content;
  width: 100vw;
  max-width:600px;
  min-width: 320px;
  /* min-width:320px; */
  background-color:#F8F9FA;
  flex-direction:column;
  min-height:90vh;
  main{
    width:100%;
    height:max-content;
    
  }
`;
const Header = styled.div`
width:100vw;
height:6rem;

display:flex;
flex-wrap:wrap;

.left{
  width:60%;
  height:100%;
  
  display:flex;
  align-items:center;
  .anticon-left{
    /* display: ${props => props.display ? "flex" : "none"}; */
  width:15%;
  height:60%;
  font-size:1.3rem;
  
  justify-content:center;
  align-items:center;
  margin-right: ${props => props.show ? "-1rem" : 0};
  }
  
}
.right{
  width:40%;
  height:100%;
  display:flex;
  justify-content:center;
  align-items:center;
  button{
    margin-right:0.5rem;
    width:40%;
    text-align:center;
    display:flex;
    justify-content:space-around;
    align-items:center
  }
  padding-right:0.5rem;
}

`;

const BackButton = styled.div`
  display: ${props => props.show ? "flex" : "none"};
  width:15%;
  height:60%;
  font-size:1.5rem;
  
  justify-content:center;
  align-items:center;
  margin-right: ${props => props.show ? "-10%" : 0};
`;
const Logo = styled.div`
  display: ${props => props.show ? "flex" : "none"};
  margin-left:${props => props.show ? "10%" : 0};
  width:70%;
  height:60%;
  font-size:2rem;
  justify-content:flex-start;
  align-items:center;
  font-weight:900;
  cursor: pointer;
  
  

`;
const SearchButton = styled.div`
  display: ${props => props.show ? "flex" : "none"};
  width:33%;
  height:50%;
  justify-content:center;
  align-items:center;
  font-size:1.5rem;
  cursor: pointer;
`;
const MyPageButton = styled.div`
  display: ${props => props.show ? "flex" : "none"};
  justify-content:center;
  align-items:center;
  width:33%;
  font-size:1.5rem;
  font-weight:bold;
  height:50%;
  cursor: pointer;
`;
const PostButton = styled.div`
  display: ${props => props.show ? "flex" : "none"};
  justify-content:center;
  align-items:center;
  width:33%;
  height:50%;
  cursor: pointer;
  font-size:1.5rem;
`;
// const PostButton = styled.button`
//   display: ${props => props.display ? "flex" : "none"};
//   justify-content:center;
//   align-items:center;
//   width:40%;
//   height:45%;
//   background-color:#5C3EC2;
//   border-radius:5px;
//   color:white;
//   margin-right:1rem;
// `;
const Body = styled.div`
width:100%;
`;
const Footer = styled.div`
  width:100%;
  height:6rem;
  display:flex;
  justify-content:center;
  align-items:center;
  img{
    object-fit:cover;
    width:100%;
    height:100%;
    object-position: 0% 0%;
  }
`;
const pack = {
  Wrapper, Container, Header, BackButton, Logo, SearchButton, MyPageButton, PostButton, Footer, Body
};
export default pack;
