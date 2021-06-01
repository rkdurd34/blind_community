import styled from 'styled-components';

const Container = styled.div`
  .ant-pagination-item-active,.ant-pagination-item:hover{
    color: #5C3EC2 !important;
    border-color: #5C3EC2 !important;
    a{
      color: #5C3EC2 !important;
    border-color: #5C3EC2 !important;
    }
  }
  .ant-pagination-next:hover,.ant-pagination-prev:hover{
    button{
      color: #5C3EC2 !important;
    border-color: #5C3EC2 !important;
    }
    
  }
`;
const pack = {
  Container
};
export default pack;