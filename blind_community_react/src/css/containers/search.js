import styled from "styled-components";

const Container = styled.div`
  margin-top: 10px;
  padding: 0 5px;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: baseline;
  margin: 0 auto;
`;

const Back = styled.div`
  width: 30px;
  padding: 5px;
  display: flex;
  align-items: center;
  /* @media screen and (min-width: 960px) {
    display: none;
  } */
`;

const Img = styled.div`
  display: inline-block;
  width: 10%;
  height: 45px;
  border: none;
  padding-top: 2vh;
  text-align: center;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  background: #f8f9fa;
`;

const Input = styled.input`
  width: 90%;
  height: 45px;
  font-size: 12px;
  background: #f8f9fa;
  border: none;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  padding: 10px;
  outline: none;
`;

const Search = styled.button`
  width: 80px;
  font-size: 14px;
  color: #fff;
  background: #5c3ec2;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 5px;
  /* @media screen and (max-width: 960px) {
    display: none;
  } */
`;

const Content = styled.div`
  font-size: 14px;
  margin-top: 82px;
  text-align: center;
`;

const SVG = styled.div`
  margin-top: 18px;
  text-align: center;
`;

const PaginationWrap = styled.div`
  text-align: center;
  padding: 10px 0;
  padding: 0.625rem 0;
`;

const pack = {
  Container, PaginationWrap, InputContainer, Back, Input, Img, Search, SVG, Content
};
export default pack;