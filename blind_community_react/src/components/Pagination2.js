import { Pagination } from 'antd';
import React from "react";
import PropTypes from "prop-types";

// import "../css/components/pagination.css";
import pack from '../css/components/pagination2';

const PaginationComponent = ({ total, pageSize, onChange, current }) => {
  return (
    <pack.Container>
      <Pagination
        style={{
          display: `inline-flex`,
          listStyle: `none`,
        }}
        defaultCurrent={1}
        current={current}
        total={total}
        pageSize={pageSize}
        onChange={onChange}
      />
    </pack.Container>
  );
};

PaginationComponent.propTypes = {
  total: PropTypes.number,
  pageSize: PropTypes.number,
  onChange: PropTypes.func,
};
PaginationComponent.defaultProps = {
  total: 0,
  pageSize: 10,
  onChange: () => { },
};

export default PaginationComponent;
