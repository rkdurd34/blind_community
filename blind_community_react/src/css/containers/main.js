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
  background: #f8f9fa;
  padding: 10px;
  padding-left: 15px;
  padding-top: 15px;
  font-size: 15px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;
const PostList = styled.div`
/* a:link {
  background-color: transparent;
  -webkit-text-decoration-skip: objects;
  text-decoration: none;
  color: black !important;
} */


`;

const pack = {
  ButtonSection, ListSection, PostTitle, PostList
};
export default pack;