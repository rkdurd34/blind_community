import styled from 'styled-components';


const Container = styled.div`
  width:100%;
  height:max-content;
  tbody.ant-table-tbody tr.ant-table-row td:nth-child(1) {
    
    text-align: center ;
    
  }
  tbody.ant-table-tbody tr.ant-table-row td:nth-child(5){
    
  }


`;
const ModalContainer = styled.div`
  width:100%;
  height:max-content;
  .image-container{
    width:100%;
    height:600px;
  
    display:flex;
    justify-content: center;
    align-items: center;
    img{
      width:100%;
    }
  }
  .list-container{
    height:300px;
    margin-top:20px;
    height: max-content;
    margin-bottom:20px;
  }
  .button-section{
    width:100%;
    display:flex;
    justify-content: center;
    align-items: center;
  }
`;
const pack = { Container, ModalContainer };

export default pack;

// div.ant-table-wrapper tbody > tr:nth-child(1) > td:nth-child(5)