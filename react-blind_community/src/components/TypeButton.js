import React from 'react';
import pack from '../css/components/typebutton';
import { Button } from 'antd';
export default function TypeButton({ subTitle, title, picked, onClick }) {
  return (
    <pack.TypeButton picked={picked} onClick={onClick}>
      <Button type="primary">
        <div className="subTitle">{subTitle}</div>
        <div className="Title">{title}</div>
      </Button>
    </pack.TypeButton>



    // <pack.TypeButton picked={picked} onClick={onClick}>
    //   <div className="subTitle">{subTitle}</div>
    //   <div className="Title">{title}</div>
    // </pack.TypeButton>
  );
};

Button.defaultProps = {
  title: ``,
  subTitle: ``
};;
// TypeButton.defaultProps = {
//   title: ``,
//   subTitle: ``
// };