import styled from 'styled-components';

const ButtonSection = styled.div`
  width:100%;
  height:4.5rem;
  display:flex;
  flex-wrap:wrap;
`;
const ListSection = styled.div`

`;
const PostTitle = styled.div`
  height: 45px;
  /* background: #f8f9fa; */
  background-color: white;
  padding: 10px;
  padding-left: 0px;
  padding-top: 15px;
  /* font-size: 1.2rem; */
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span:nth-child(1){
    font-size:20px !important;
      }
  span:nth-child(2){
    font-size:0.8rem;
  }
`;
const PostList = styled.div`
/* a:link {
  background-color: transparent;
  -webkit-text-decoration-skip: objects;
  text-decoration: none;
  color: black !important;
} */


`;

const SVG = styled.div`
  padding: 3px;
  padding-left:0px;
  svg {
    /* color: ${(props) => props.clicked ? `#fff` : `#5c3ec2`}; */
    color: red;
    font-size: 20px !important ;
    width:10px !important ;
  }
  span{
    font-size:20px !important;
  }
  
`;
const pack = {
  ButtonSection, ListSection, PostTitle, PostList, SVG
};
export default pack;