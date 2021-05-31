import styled from 'styled-components';

const Container = styled.div`
width:100%;
height:100%;
th:nth-child(8),td:nth-child(8) {
  text-align: center;
  /* display: flex ;
  justify-content: center ;
  align-items: center ; */
}
th:nth-child(2),td:nth-child(2) {
  text-align: center;
  /* display: flex ;
  justify-content: center ;
  align-items: center ; */
}
`;

const ButtonSection = styled.div`
width:100%;
height:70px;
display:flex;

justify-content: space-between;
align-items: center;
div:nth-child(2){
  
  display: flex;
  
}
.title{
  font-size: large;
  margin-left: 0.5rem;
  font-weight: bold;
}
button{
  text-align: center;
  width:70px;
  height:35px;
  margin:0.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  background-color: #001628;
  border:#001628;
  display: flex;
  justify-content: center;
  align-items: center;
}
button:hover{
  opacity: 60%;
  background-color: #001628;
  /* background-color: #253848; */
}
/* table > tbody > tr:nth-child(1) > td:nth-child(8) */
/* table > tbody > tr:nth-child(1) > td:nth-child(8) */

`;
const pack = { Container, ButtonSection };
export default pack;