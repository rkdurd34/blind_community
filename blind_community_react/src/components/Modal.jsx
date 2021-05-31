 import React from "react";
import PropTypes from "prop-types";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const ResponsiveModal = ({ title, subtitle, open, onClose, children }) => {
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        center
        styles={{
          modal: {
            background: `rgba(255, 255, 255, 0.95)`,
            borderRadius: `0.4rem`,
            border: `1px solid #adb5bd`,
            width:`1000px`, 
            height:`800px`
          }
        }}
      >
        <div style={{
          fontSize:"1.5rem",
          fontWeight:600,
          }}>{title}</div>
          {children}
       
      </Modal>
    </>
  );
};

ResponsiveModal.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node.isRequired
};

ResponsiveModal.defaultProps = {
  title: ``,
  subtitle: ``,
  open: false,
  onClose: () => {},
  children: []
};

export default ResponsiveModal;
