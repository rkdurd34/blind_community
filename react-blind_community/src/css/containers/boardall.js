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
.ant-divider{
  margin:1rem;
  margin-left:0;
}
`;
const PaginationWrap = styled.div`
  width:100%;
  height:5rem;
  display:flex;
  justify-content:center;
  align-items:center
`;

const pack = {
  ButtonSection, ListSection, PostTitle, PostList, PaginationWrap
};
export default pack;