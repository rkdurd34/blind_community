import styled from 'styled-components';

const Container = styled.div`
  display: ${props => props.isLoading ? "flex" : "none"};
  position:absolute;
  top:0;
  left:0;
  width: 100%;
  height: 100vh;
  z-index: 15;
  background-color:black;
  opacity:0.6;
  justify-content:center;
  align-items:center;
`;
const SpinWrap = styled.div`
.ant-spin-nested-loading{
  
  height:100%;
}
.ant-spin{
  width:100px;
  height:100%;
  
}
.ant-spin-dot{
  font-size:60px !important;
  i{
    width:30px;
    height:30px;
  }
}


  `;


const pack = {
  Container, SpinWrap
};
export default pack;;