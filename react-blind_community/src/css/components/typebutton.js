import styled from 'styled-components';

const TypeButton = styled.div`
  width: 50%;
  height:100%;
  .ant-btn-primary:hover{
    color:${props => props.picked ? "white" : "#5C3EC2"};
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  button{
    width:100%;
    height:100%;
    border:none;
    background-color:${props => props.picked ? "#5C3EC2" : "white"} !important;
  color:${props => props.picked ? "white" : "#5C3EC2"};
  
  }  

  .subTitle{
    /* background-color:${props => props.picked ? "#5C3EC2" : "white"};
    color:${props => props.picked ? "white" : "#5C3EC2"}; */
    width:100%;
    height:40%;
    display:flex;
    align-items:center;
    padding-left: 0.6rem;
    font-size:0.8rem;
    font-weight:900;

  }
  .Title{
    /* background-color:${props => props.picked ? "#5C3EC2" : "white"};
    color: ${props => props.picked ? "white" : "#5C3EC2"}; */
    width: 100%;
    height: 60%;
    display: flex;
    justify-content: center;
    font-size: 1rem;
    cursor:pointer;
  }
`;

// const TypeButton = styled.div`
//   width: 50%;
//   height:100%;
//   background-color:${props => props.picked ? "#5C3EC2" : "white"};
//   color:${props => props.picked ? "white" : "#5C3EC2"};


//   .subTitle{
//     /* background-color:${props => props.picked ? "#5C3EC2" : "white"};
//     color:${props => props.picked ? "white" : "#5C3EC2"}; */
//     width:100%;
//     height:40%;
//     display:flex;
//     align-items:center;
//     padding-left: 0.6rem;
//     font-size:0.8rem;

//   }
//   .Title{
//     /* background-color:${props => props.picked ? "#5C3EC2" : "white"};
//     color: ${props => props.picked ? "white" : "#5C3EC2"}; */
//     width: 100%;
//     height: 60%;
//     display: flex;
//     justify-content: center;
//     font-size: 1.3rem;
//     cursor:pointer;
//   }
// `;

const pack = {
  TypeButton
};
export default pack;;