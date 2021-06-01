import React from "react";
import PropTypes from "prop-types";

const SearchIcon = ({ width, height, viewBox, d, fill, opacity }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={viewBox}
    >
      <path id="search" d={d} fill={fill} opacity={opacity} />
    </svg>
  );
};

SearchIcon.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  viewBox: PropTypes.string.isRequired,
  d: PropTypes.string.isRequired,
  fill: PropTypes.string.isRequired,
  opacity: PropTypes.string
};
SearchIcon.defaultProps = {
  width: ``,
  height: ``,
  viewBox: ``,
  d: ``,
  fill: ``,
  opacity: ``
};

export default SearchIcon;
