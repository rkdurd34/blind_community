import styled from 'styled-components';

const Container = styled.div`
  width:100%;
  height: 12rem;
  display:flex;
  justify-content:center;
  align-items:center;
  background-color:white;
  /* border: 1px solid lightgray; */
  img{
    width:100%;
    height:100%;
    /* object-fit:contain; */
    object-fit:cover;
  }
`;

const pack = {
  Container
};
export default pack;