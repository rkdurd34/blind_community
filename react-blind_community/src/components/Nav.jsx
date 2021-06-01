import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
`;

const List = styled.ul`
  height: 68px;
  display: flex;
  align-items: center;
  margin: 0;
  padding:0;
`;

const Item = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 98%;
  list-style: none;
  margin: 0;
  padding: 10px;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  touch-action: manipulation;
  color: ${props => (props.current ? "#F8F9FA" : "#000")};
  background: ${props => (props.current ? "#5c3ec2" : "#F8F9FA")};
  cursor: pointer;
  position: relative;
  border-top: 5px solid #fff;
  border-bottom: 5px solid #fff;
`;

const Category = styled.div`
  font-size: 10px;
  font-weight: bold;
  position: absolute;
  top: 10px;
  left: 10px;
`;

const CategoryDetail = styled.div`
  font-size: 13px;
  font-weight: bold;
`;

const Nav = ({
  firstCategory,
  firstSubCategory,
  secondCategory,
  secondSubCategory,
  firstHandler,
  secondHandler,
  curType
}) => {
  return (
    <Container>
      <List>
        <Item current={curType === "first"} onClick={firstHandler}>
          <Category>{firstCategory}</Category>
          <CategoryDetail>{firstSubCategory}</CategoryDetail>
        </Item>
        <Item current={curType === "second"} onClick={secondHandler}>
          <Category>{secondCategory}</Category>
          <CategoryDetail>{secondSubCategory}</CategoryDetail>
        </Item>
      </List>
    </Container>
  );
};

Nav.prototype = {
  firstCategory: PropTypes.string,
  firstSubCategory: PropTypes.string.isRequired,
  secondCategory: PropTypes.string,
  secondSubCategory: PropTypes.string.isRequired,
  firstHandler: PropTypes.func,
  secondHandler: PropTypes.func
};

Nav.defaultProps = {
  firstCategory: ``,
  firstSubCategory: ``,
  secondCategory: ``,
  secondSubCategory: ``,
  firstHandler: () => {},
  secondHandler: () => {}
};

export default Nav;
