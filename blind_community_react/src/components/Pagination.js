import React from "react";
import PropTypes from "prop-types";
import Pagination from "rc-pagination";

import "../css/components/pagination.css";

const PaginationComponent = ({ total, pageSize, onChange, current }) => {
  return (

    <Pagination
      style={{
        display: `inline-flex`,
        listStyle: `none`,
      }}
      defaultCurrent={1}
      current={current}
      total={total}
      pageSize={pageSize}
      prevIcon={`<`}
      nextIcon={`>`}
      onChange={onChange}
    />
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
